import { StatusCode } from '@johnkcr/temple-lib/dist/types/core';
import { fuzzySearchTitle } from 'services/temple/collections/fuzzySearchTitle';
import { Router } from 'express';
import { error, jsonString } from '@johnkcr/temple-lib/dist/utils';

const router = Router();

router.get('/', async (req, res) => {
  const startsWithOrig = req.query.startsWith;
  try {
    const resp = await fuzzySearchTitle(startsWithOrig as string, 10);
    const respStr = jsonString(resp);
    res.set({
      'Cache-Control': 'must-revalidate, max-age=60',
      'Content-Length': Buffer.byteLength(respStr ?? '', 'utf8')
    });

    res.send(respStr);
    return;
  } catch (err: any) {
    error('Failed to get titles', err);
    res.sendStatus(StatusCode.InternalServerError);
  }
});

export default router;
