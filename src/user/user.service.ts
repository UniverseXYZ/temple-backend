import { CreationFlow, OrderDirection } from '@johnkcr/temple-lib/dist/types/core';
import { firestoreConstants } from '@johnkcr/temple-lib/dist/utils';
import { Injectable } from '@nestjs/common';
import RankingsRequestDto from 'collections/dto/rankings-query.dto';
import { InvalidCollectionError } from 'common/errors/invalid-collection.error';
import { FirebaseService } from 'firebase/firebase.service';
import { StatsService } from 'stats/stats.service';
import { CounterService } from 'counters/counter.service';
import { UserFollowingCollection } from 'user/dto/user-following-collection.dto';
import { UserFollowingCollectionDeletePayload } from './dto/user-following-collection-delete-payload.dto';
import { UserFollowingCollectionPostPayload } from './dto/user-following-collection-post-payload.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private firebaseService: FirebaseService, private statsService: StatsService, private counterSerivce: CounterService) { }

  async getUserWatchlist(user: UserDto, query: RankingsRequestDto) {
    const collectionFollows = this.firebaseService.firestore
      .collection(firestoreConstants.USERS_COLL)
      .doc(`${user.userChainId}:${user.userAddress}`)
      .collection(firestoreConstants.COLLECTION_FOLLOWS_COLL)
      .select('address', 'chainId');
    const snap = await collectionFollows.get();
    const collections = snap.docs.map((doc) => {
      const { chainId, address } = doc.data();
      return { chainId, address };
    });

    const statsPromises = collections.map((collection) =>
      this.statsService.getCollectionStats(collection, { period: query.period, date: query.date })
    );

    const stats = await Promise.all(statsPromises);

    const orderedStats = stats.sort((itemA, itemB) => {
      const statA = itemA[query.orderBy];
      const statB = itemB[query.orderBy];
      const isAsc = query.orderDirection === OrderDirection.Ascending;
      return isAsc ? statA - statB : statB - statA;
    });

    return orderedStats;
  }

  async generateAuth() {
    const token = uuidv4();
    const userId = await this.counterSerivce.getIncrement(firestoreConstants.USERS_COLL);
    const docRef = this.firebaseService.firestore.collection(firestoreConstants.USERS_COLL).doc(userId.toString());

    await docRef.set({
      userId,
      token,
    });
    return {
      userId: docRef.id,
      token
    };
  }

  async getUserFollowingCollections(user: UserDto) {
    const collectionFollows = this.firebaseService.firestore
      .collection(firestoreConstants.USERS_COLL)
      .doc(user.userChainId + ':' + user.userAddress)
      .collection(firestoreConstants.COLLECTION_FOLLOWS_COLL);

    const snap = await collectionFollows.get();
    const followingCollections: UserFollowingCollection[] = snap.docs.map((doc) => {
      const docData = doc.data() as UserFollowingCollection;
      return docData;
    });
    return followingCollections;
  }

  async addUserFollowingCollection(user: UserDto, payload: UserFollowingCollectionPostPayload) {
    const collectionRef = await this.firebaseService.getCollectionRef({
      chainId: payload.collectionChainId,
      address: payload.collectionAddress
    });

    const collection = (await collectionRef.get()).data();
    if (!collection) {
      throw new InvalidCollectionError(payload.collectionAddress, payload.collectionChainId, 'Collection not found');
    }
    if (collection?.state?.create?.step !== CreationFlow.Complete) {
      throw new InvalidCollectionError(
        payload.collectionAddress,
        payload.collectionChainId,
        'Collection is not fully indexed'
      );
    }

    await this.firebaseService.firestore
      .collection(firestoreConstants.USERS_COLL)
      .doc(user.userChainId + ':' + user.userAddress)
      .collection(firestoreConstants.COLLECTION_FOLLOWS_COLL)
      .doc(payload.collectionChainId + ':' + payload.collectionAddress)
      .set({
        address: payload.collectionAddress,
        chainId: payload.collectionChainId,
        name: collection?.metadata?.name,
        slug: collection.slug,
        userAddress: user.userAddress
      });
    return {};
  }

  async removeUserFollowingCollection(user: UserDto, payload: UserFollowingCollectionDeletePayload) {
    const collectionRef = await this.firebaseService.getCollectionRef({
      chainId: payload.collectionChainId,
      address: payload.collectionAddress
    });

    const collection = (await collectionRef.get()).data();
    if (!collection) {
      throw new InvalidCollectionError(payload.collectionAddress, payload.collectionChainId, 'Collection not found');
    }
    if (collection?.state?.create?.step !== CreationFlow.Complete) {
      throw new InvalidCollectionError(
        payload.collectionAddress,
        payload.collectionChainId,
        'Collection is not fully indexed'
      );
    }

    await this.firebaseService.firestore
      .collection(firestoreConstants.USERS_COLL)
      .doc(user.userChainId + ':' + user.userAddress)
      .collection(firestoreConstants.COLLECTION_FOLLOWS_COLL)
      .doc(payload.collectionChainId + ':' + payload.collectionAddress)
      .delete();
    return {};
  }
}
