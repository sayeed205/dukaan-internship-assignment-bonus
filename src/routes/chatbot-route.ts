import { Router } from 'express';

import { chatbotController } from '../controllers';
import { auth, validate } from '../middleware';
import { asyncHandler } from '../utils';
import { chatbotValidation, pagination } from '../validations';

const router = Router();

router.post(
    '/',
    auth,
    validate(chatbotValidation.createChatBot),
    asyncHandler(chatbotController.createChatbot)
);

router.get(
    '/user/:id',
    validate(pagination),
    validate(chatbotValidation.id),
    asyncHandler(chatbotController.getAllChatbots)
);

router.get(
    '/:id',
    validate(chatbotValidation.id),
    asyncHandler(chatbotController.getChatbotById)
);

router.put(
    '/:id',
    auth,
    validate(chatbotValidation.updateChatBot),
    asyncHandler(chatbotController.updateChatbot)
);

router.delete(
    '/:id',
    auth,
    validate(chatbotValidation.id),
    asyncHandler(chatbotController.deleteChatbot)
);

export const chatbotRouter = router;
