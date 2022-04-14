import { Router } from 'express';
import { authenticateUser } from 'middleware/auth';
import { getUserAssets } from './_user/assets';
import { getUserEmail } from './_user/getEmail';
import { postSubscribeUserEmail } from './_user/subscribeEmail';
import { postUsPerson } from './_user/usperson';
import { lowRateLimit, postUserRateLimit } from 'middleware/rateLimit';
import { getCollectionFollows, setCollectionFollow } from './_user/collectionFollows';
import { getUserFollows, setUserFollow } from './_user/userFollows';
import { getUserFeed } from './_user/userFeed';

const router = Router();

router.use('/:user', authenticateUser);

router.get('/:user/assets', getUserAssets);
router.get('/:user/getEmail', getUserEmail);
router.get('/:user/collectionFollows', getCollectionFollows);
router.get('/:user/userFollows', getUserFollows);
router.get('/:user/feed', getUserFeed);

router.post('/:user/subscribeEmail', lowRateLimit, postSubscribeUserEmail);
router.post('/:user/usperson', lowRateLimit, postUsPerson);
router.post('/:user/collectionFollows', postUserRateLimit, setCollectionFollow);
router.post('/:user/userFollows', postUserRateLimit, setUserFollow);

export default router;
