import { StatusCode } from '@johnkcr/temple-lib/dist/types/core';
import { getUserInfoRef } from 'services/temple/users/getUser';
import { error, trimLowerCase, jsonString } from '@johnkcr/temple-lib/dist/utils';
import { Request, Response } from 'express';

export const getUserEmail = async (req: Request<{ user: string }>, res: Response) => {
  const user = trimLowerCase(req.params.user);

  if (!user) {
    error('Invalid input');
    res.sendStatus(StatusCode.BadRequest);
    return;
  }

  const userDoc = await getUserInfoRef(user).get();

  const data = userDoc.data();
  if (data?.profileInfo?.email?.address) {
    const resp = jsonString(data.profileInfo.email);
    // To enable cdn cache
    res.set({
      'Cache-Control': 'must-revalidate, max-age=30',
      'Content-Length': Buffer.byteLength(resp ?? '', 'utf8')
    });
    res.send(resp);
  } else {
    res.send('{}');
  }
};
