import { Router } from 'express';

import { userController } from '../controllers';
import { auth, validate } from '../middleware';
import { asyncHandler } from '../utils';
import { pagination, userValidation } from '../validations';

const router = Router();

router.get('/', validate(pagination), asyncHandler(userController.getAllUsers));

router.get(
    '/:id',
    validate(userValidation.getUserById),
    asyncHandler(userController.getUserById)
);

router.put(
    '/profile',
    auth,
    validate(userValidation.updateProfile),
    asyncHandler(userController.updateProfile)
);

router.delete('/profile', auth, asyncHandler(userController.deleteMyAccount));

export const userRouter = router;
