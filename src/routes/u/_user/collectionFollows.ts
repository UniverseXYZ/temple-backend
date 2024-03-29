import { getUserInfoRef } from 'services/temple/users/getUser';
import { error, trimLowerCase, jsonString, firestoreConstants } from '@johnkcr/temple-lib/dist/utils';
import { Request, Response } from 'express';

import { StatusCode } from '@johnkcr/temple-lib/dist/types/core';
import { CollectionFollow } from '@johnkcr/temple-lib/dist/types/core/Follows';

// Fetch collections that a user follows.
export const fetchFollowingCollectionsByUser = async (userAddress: string, limit = 0) => {
  const follows = getUserInfoRef(userAddress).collection(firestoreConstants.COLLECTION_FOLLOWS_COLL);

  let followDocs;
  if (limit) {
    followDocs = await follows.limit(limit).get();
  } else {
    followDocs = await follows.get();
  }
  const result: FirebaseFirestore.DocumentData[] = [];
  for (const doc of followDocs.docs) {
    result.push(doc.data() as CollectionFollow);
  }
  return result;
};

export const getCollectionFollows = async (
  req: Request<
    { user: string },
    any,
    any,
    {
      limit: string;
    }
  >,
  res: Response
) => {
  const user = trimLowerCase(req.params.user);
  const limit = +req.query.limit ?? 0;

  if (!user) {
    error('Invalid input');
    res.sendStatus(StatusCode.BadRequest);
    return;
  }
  const result = await fetchFollowingCollectionsByUser(user, limit);

  const resp = jsonString(result);
  // To enable cdn cache
  res.set({
    'Cache-Control': 'must-revalidate, max-age=30',
    'Content-Length': Buffer.byteLength(resp ?? '', 'utf8')
  });
  res.send(resp);
};

export const setCollectionFollow = async (req: Request<{ user: string }>, res: Response) => {
  const user = trimLowerCase(req.params.user);
  const collectionFollow = req.body.collectionFollow as CollectionFollow;
  const chainId = req.body.chainId;
  const deleteFollow = req.body.deleteFollow;

  if (!user || !collectionFollow || deleteFollow === undefined || !chainId) {
    error('Invalid input');
    res.sendStatus(StatusCode.BadRequest);
    return;
  }

  try {
    const follows = getUserInfoRef(user).collection(firestoreConstants.COLLECTION_FOLLOWS_COLL);
    const key = `${chainId}:${collectionFollow.address}`;
    if (deleteFollow) {
      await follows.doc(key).delete();
    } else {
      await follows.doc(key).set(collectionFollow);
    }

    res.sendStatus(StatusCode.Ok);
  } catch (err: any) {
    error('Error setting watchlist for user', user);
    error(err);
    res.sendStatus(StatusCode.InternalServerError);
  }
};
