import { Request, Response } from 'express';

import { conversationService } from '../services';
import { getUser, zParse } from '../utils';
import { conversationValidation, pagination } from '../validations';

export const createConversation = async (req: Request, res: Response) => {
    const parsed = await zParse(conversationValidation.createConversation, req);
    const user = getUser(req);

    return res
        .status(201)
        .json(
            await conversationService.createConversation(user.id, parsed.body)
        );
};

export const getConversationsByChatbotId = async (
    req: Request,
    res: Response
) => {
    const parsed = await zParse(conversationValidation.id, req);
    const chatbotId = parsed.params.id;

    const paginationParsed = await zParse(pagination, req);

    const user = getUser(req);

    return res
        .status(200)
        .json(
            await conversationService.getConversationsByChatbotId(
                chatbotId,
                user.id,
                paginationParsed.query
            )
        );
};

export const getConversationById = async (req: Request, res: Response) => {
    const parsed = await zParse(conversationValidation.id, req);
    const id = parsed.params.id;

    return res
        .status(200)
        .json(await conversationService.getConversationById(id));
};

export const updateConversation = async (req: Request, res: Response) => {
    const parsed = await zParse(conversationValidation.updateConversation, req);
    const conversationId = parsed.params.id;
    const user = getUser(req);

    return res
        .status(200)
        .json(
            await conversationService.updateConversation(
                conversationId,
                user.id,
                parsed.body.isComplete
            )
        );
};

export const deleteConversation = async (req: Request, res: Response) => {
    const parsed = await zParse(conversationValidation.id, req);
    const id = parsed.params.id;
    const user = getUser(req);

    return res
        .status(200)
        .json(await conversationService.deleteConversation(id, user.id));
};
