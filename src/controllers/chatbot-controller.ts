import { Request, Response } from 'express';
import { chatbotService } from '../services';
import { getUser, zParse } from '../utils';
import { chatbotValidation, pagination } from '../validations';

export const createChatbot = async (req: Request, res: Response) => {
    const user = getUser(req);
    const parse = await zParse(chatbotValidation.createChatBot, req);

    const json = await chatbotService.createChatBot(user.id, parse.body);
    return res.status(201).json(json);
};

export const getAllChatbots = async (req: Request, res: Response) => {
    const parse = await zParse(pagination, req);
    const user = await zParse(chatbotValidation.id, req);

    const json = await chatbotService.getAllChatbots(
        user.params.id,
        parse.query
    );
    return res.status(200).json(json);
};

export const getChatbotById = async (req: Request, res: Response) => {
    const parse = await zParse(chatbotValidation.id, req);
    const json = await chatbotService.getChatbotById(parse.params.id);
    return res.status(200).json(json);
};

export const updateChatbot = async (req: Request, res: Response) => {
    const user = getUser(req);
    const parse = await zParse(chatbotValidation.updateChatBot, req);

    const json = await chatbotService.updateChatbot(
        user.id,
        parse.params.id,
        parse.body
    );
    return res.status(200).json(json);
};

export const deleteChatbot = async (req: Request, res: Response) => {
    const user = getUser(req);
    const parse = await zParse(chatbotValidation.id, req);
    console.log(user);

    const json = await chatbotService.deleteChatbot(parse.params.id, user.id);
    return res.status(200).json(json);
};
