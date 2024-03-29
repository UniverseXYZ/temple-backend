import { trimLowerCase, jsonString, firestoreConstants } from '@johnkcr/temple-lib/dist/utils';
import { Request, Response } from 'express';
import { validateInputs } from 'utils';
import { BaseFeedEvent } from '@johnkcr/temple-lib/dist/types/core/feed';
import { fetchFollowingCollectionsByUser } from './collectionFollows';
import { firestore } from 'container';

const QUERY_ARRAY_IN_LIMIT = 10; // Limit of Firestore where-in-array items.

const flattenArray = (array: any[]) => array.reduce((x: any, y: any) => x.concat(y.docs), []);

export const getUserFeed = async (
  req: Request<
    { user: string },
    unknown,
    unknown,
    {
      offset: string;
      limit: string;
    }
  >,
  res: Response
) => {
  const user = trimLowerCase(req.params.user);
  const offset = +req.query.offset ?? 0;
  const limit = +req.query.limit ?? 50;
  const errorCode = validateInputs({ user }, ['user']);
  if (errorCode) {
    res.sendStatus(errorCode);
    return;
  }

  const follows = await fetchFollowingCollectionsByUser(user);
  const followAddresses = follows.map((item) => item.address);
  const eventsRef = firestore.db.collection(firestoreConstants.FEED_COLL);

  // Since firestore has a limit of 10 array items for the query 'in'
  // => split the followAddresses into chunks of 10 addresses, then query them in parallel.
  const promises: Array<Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>> = [];
  for (let i = 0; i < followAddresses.length; i += QUERY_ARRAY_IN_LIMIT) {
    const addressesChunk = followAddresses.slice(i, i + QUERY_ARRAY_IN_LIMIT);
    promises.push(eventsRef.where('collectionAddress', 'in', addressesChunk).offset(offset).limit(limit).get());
  }
  const combinedResults = await Promise.all(promises);
  const pageResults = flattenArray(combinedResults);

  const data: FirebaseFirestore.DocumentData[] = [];
  for (const doc of pageResults) {
    data.push(doc.data() as BaseFeedEvent);
  }
  const resp = jsonString({
    data
  });

  // To enable cdn cache
  res.set({
    'Cache-Control': 'must-revalidate, max-age=60',
    'Content-Length': Buffer.byteLength(resp ?? '', 'utf8')
  });
  res.send(resp);
};
