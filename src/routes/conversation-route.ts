import { Router } from 'express';

import { conversationController } from '../controllers';
import { auth, validate } from '../middleware';
import { asyncHandler } from '../utils';
import { conversationValidation, pagination } from '../validations';

const router = Router();

router.post(
    '/',
    auth,
    validate(conversationValidation.createConversation),
    asyncHandler(conversationController.createConversation)
);

router.get(
    '/chatbot/:id',
    auth,
    validate(conversationValidation.id),
    validate(pagination),
    asyncHandler(conversationController.getConversationsByChatbotId)
);

router.get(
    '/:id',
    validate(conversationValidation.id),
    asyncHandler(conversationController.getConversationById)
);

router.put(
    '/:id',
    auth,
    validate(conversationValidation.updateConversation),
    asyncHandler(conversationController.updateConversation)
);

router.delete(
    '/:id',
    auth,
    validate(conversationValidation.id),
    asyncHandler(conversationController.deleteConversation)
);

export const conversationRouter = router;
