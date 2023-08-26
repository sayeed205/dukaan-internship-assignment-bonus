import { Router } from 'express';

import { authController } from '../controllers';
import { validate } from '../middleware';
import { asyncHandler } from '../utils';
import { authValidation } from '../validations';

const router = Router();

// user auth
router.post(
    '/signup/user',
    validate(authValidation.signup),
    asyncHandler(authController.userSignup)
);
router.post(
    '/login/user',
    validate(authValidation.login),
    asyncHandler(authController.userLogin)
);

// end user auth
router.post(
    '/signup/end-user',
    validate(authValidation.signup),
    asyncHandler(authController.endUserSignup)
);
router.post(
    '/login/end-user',
    validate(authValidation.login),
    asyncHandler(authController.endUserLogin)
);

export const authRouter = router;
