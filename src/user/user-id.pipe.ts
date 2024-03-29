import { ChainId } from '@johnkcr/temple-lib/dist/types/core';
import { firestoreConstants, trimLowerCase } from '@johnkcr/temple-lib/dist/utils';
import { PipeTransform, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CollectionHistoricalStatsQueryDto } from 'collections/dto/collection-historical-stats-query.dto';
import { ethers } from 'ethers';
import { FirebaseService } from 'firebase/firebase.service';
import { UserProfileDto } from './dto/user-profile.dto';

export type ParsedUserId = {
  userId: string;
  ref: FirebaseFirestore.DocumentReference<UserProfileDto>;
};


@Injectable()
export class ParseUserIdPipe implements PipeTransform<string, Promise<ParsedUserId>> {
  constructor(private firebaseService: FirebaseService) { }

  async transform(value: string): Promise<ParsedUserId> {

    const ref = this.firebaseService.firestore
      .collection(firestoreConstants.USERS_COLL).doc(value) as FirebaseFirestore.DocumentReference<UserProfileDto>;

    return {
      userId: value,
      ref
    };
  }


}


// export type ParsedUserId = {
//   userAddress: string;
//   userChainId: ChainId;
//   ref: FirebaseFirestore.DocumentReference<UserProfileDto>;
// };


// @Injectable()
// export class ParseUserIdPipe implements PipeTransform<string, Promise<ParsedUserId>> {
//   constructor(private firebaseService: FirebaseService) {}

//   async transform(value: string): Promise<ParsedUserId> {
//     const usernameOrAddress = trimLowerCase(value);

//     if (!usernameOrAddress.includes(':') && !ethers.utils.isAddress(usernameOrAddress)) {
//       const { user, ref } = await this.getUserByUsername(usernameOrAddress);
//       const userChainId = ChainId.Mainnet;
//       const userAddress = user.address;
//       return {
//         userAddress,
//         userChainId,
//         ref
//       };
//     }

//     if (ethers.utils.isAddress(usernameOrAddress)) {
//       const ref = this.firebaseService.firestore
//         .collection(firestoreConstants.USERS_COLL)
//         .doc(usernameOrAddress) as FirebaseFirestore.DocumentReference<UserProfileDto>;
//       return {
//         userAddress: usernameOrAddress,
//         userChainId: ChainId.Mainnet,
//         ref
//       };
//     }

//     const [chainId, address] = value.split(':').map((item) => trimLowerCase(item));

//     if (!Object.values(ChainId).includes(chainId as any)) {
//       throw new BadRequestException('Invalid chain id');
//     }

//     if (!ethers.utils.isAddress(address)) {
//       throw new BadRequestException('Invalid address');
//     }

//     const ref = this.firebaseService.firestore
//       .collection(firestoreConstants.USERS_COLL)
//       .doc(address) as FirebaseFirestore.DocumentReference<UserProfileDto>;

//     return {
//       userAddress: address,
//       userChainId: chainId as ChainId,
//       ref
//     };
//   }

//   private async getUserByUsername(username: string) {
//     const snapshot = await this.firebaseService.firestore
//       .collection(firestoreConstants.USERS_COLL)
//       .where('username', '==', username)
//       .limit(1)
//       .get();

//     const doc = snapshot.docs[0];

//     const user = doc?.data() as UserProfileDto;

//     if (!user) {
//       throw new NotFoundException('Failed to find user via username');
//     }

//     return { user, ref: doc.ref as FirebaseFirestore.DocumentReference<UserProfileDto> };
//   }
// }

