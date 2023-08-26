import { Request, Response } from 'express';
import { chatbotService } from '../services';
import { getUser, zParse } from '../utils';
import { chatbotValidation } from '../validations';

export const createChatbot = async (req: Request, res: Response) => {
    const user = getUser(req);
    const parse = await zParse(chatbotValidation.createChatBot, req);

    const json = await chatbotService.createChatBot(user.id, parse.body);
    return res.status(201).json(json);
};

// export const getAllChatbots = async (req: Request, res: Response) => {
//     const id = parseInt(req.params.id);
//     const json = await chatbotService.getAllChatbots(id);
//     return res.status(200).json(json);
// };

// export const getChatbotById = async (req: Request, res: Response) => {
//     const id = parseInt(req.params.id);
//     const json = await chatbotService.getChatbotById(id);
//     return res.status(200).json(json);
// };

// export const updateChatbot = async (req: Request, res: Response) => {
//     const id = parseInt(req.params.id);
//     const botInfo = req.body as ChatbotInfo;
//     const json = await chatbotService.updateChatbot(id, botInfo);
//     return res.status(200).json(json);
// };

// export const deleteChatbot = async (req: Request, res: Response) => {
//     const id = parseInt(req.params.id);
//     const json = await chatbotService.deleteChatbot(id);
//     return res.status(200).json(json);
// };
