import { Router } from 'express';
import { endUserController } from '../controllers';
import { auth, validate } from '../middleware';
import { asyncHandler } from '../utils';
import { endUserValidation, pagination } from '../validations';

const router = Router();

router.get(
    '/',
    validate(pagination),
    asyncHandler(endUserController.getAllEndUsers)
);

router.get(
    '/:id',
    validate(endUserValidation.getEndUserById),
    asyncHandler(endUserController.getEndUserById)
);

router.put(
    '/profile',
    auth,
    validate(endUserValidation.updateProfile),
    asyncHandler(endUserController.updateProfile)
);

router.delete('/profile', auth, asyncHandler(endUserController.deleteEndUser));

export const endUserRouter = router;
