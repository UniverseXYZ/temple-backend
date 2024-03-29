import { singleton } from 'tsyringe';
import firebaseAdmin, { ServiceAccount } from 'firebase-admin';
import { Bucket, File } from '@google-cloud/storage';
import { FB_STORAGE_BUCKET } from '../constants';
import { Readable } from 'stream';
import { error, log, warn } from '@johnkcr/temple-lib/dist/utils';
import { createHash } from 'crypto';
import * as serviceAccount from '../creds/firebase-dev.json';

@singleton()
export default class Firestore {
  db: FirebaseFirestore.Firestore;

  bucket: Bucket;

  constructor() {
    const app = firebaseAdmin.initializeApp(
      {
        credential: firebaseAdmin.credential.cert(serviceAccount as ServiceAccount),
        storageBucket: FB_STORAGE_BUCKET
      },
      'secondary'
    );
    this.db = app.firestore();
    this.db.settings({ ignoreUndefinedProperties: true });
    this.bucket = app.storage().bucket();
  }

  collection(collectionPath: string): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> {
    return this.db.collection(collectionPath);
  }

  // NOTE: don't use this for new code; use getDocIdHash instead
  // eslint-disable-next-line no-unused-vars
  getDocId({ tokenAddress, tokenId, basePrice }: { tokenAddress: string; tokenId: string; basePrice: string }) {
    warn('Do not use this docId');
    const data = tokenAddress.trim() + tokenId.trim() + basePrice;
    return createHash('sha256').update(data).digest('hex').trim().toLowerCase();
  }

  getStaleListingDocId({
    tokenAddress,
    tokenId,
    basePrice,
    listingTime
  }: {
    tokenAddress: string;
    tokenId: string;
    basePrice: string;
    listingTime: number;
  }) {
    const data = `${tokenAddress.trim().toLowerCase()}${tokenId.trim()}${basePrice}${listingTime}`;
    return createHash('sha256').update(data).digest('hex').trim().toLowerCase();
  }

  // // NOTE: don't use this for new code; use getDocIdHash instead
  // GetAssetDocId({ chainId, tokenId, tokenAddress }: { chainId: string; tokenId: string; tokenAddress: string }) {
  //   Warn('Do not use this assetDocId');
  //   Const data = tokenAddress.trim() + tokenId.trim() + chainId;
  //   Return crypto.createHash('sha256').update(data).digest('hex').trim().toLowerCase();
  // }

  getHistoricalDocId(year: number, week: number) {
    return `${year}-${week}`;
  }

  async uploadBuffer(buffer: Buffer, path: string, contentType: string): Promise<File> {
    const remoteFile = this.bucket.file(path);

    // No idea why exists() returns an array [boolean]
    const existsArray = await remoteFile.exists();
    if (existsArray && existsArray.length > 0 && !existsArray[0]) {
      return await new Promise<File>((resolve, reject) => {
        Readable.from(buffer).pipe(
          remoteFile
            .createWriteStream({
              metadata: {
                contentType
              }
            })
            .on('error', (err) => {
              error(err);

              reject(err);
            })
            .on('finish', () => {
              log(`uploaded: ${remoteFile.name}`);

              resolve(remoteFile);
            })
        );
      });
    }

    return remoteFile;
  }
}
