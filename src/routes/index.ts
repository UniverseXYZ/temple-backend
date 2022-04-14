import { Router } from 'express';
import p from './p';
import u from './u';
import titles from './titles';
import verifyEmail from './verifyEmail';

const router = Router();

router.use('/p', p);
router.use('/titles', titles);
router.use('/verifyEmail', verifyEmail);

/**
 * Require auth
 */
router.use('/u', u);

export default router;
