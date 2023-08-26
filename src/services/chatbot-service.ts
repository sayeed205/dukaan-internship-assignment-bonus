import { Op } from 'sequelize';
import { z } from 'zod';
import { ChatBot, User } from '../models';
import { ErrorResponse } from '../utils';
import { Pagination, chatbotValidation } from '../validations';

type ChatbotInfo = z.infer<typeof chatbotValidation.createChatBot>;

export const createChatBot = async (
    id: number,
    chatbotInfo: ChatbotInfo['body']
) => {
    const user = await User.findByPk(id);

    if (!user) {
        throw new ErrorResponse('User not found or invalid jwt token', 404);
    }

    const chatbot = await ChatBot.create({ ...chatbotInfo, userId: id });
    return { ok: true, chatbot };
};

export const getAllChatbots = async (id: number, pagination: Pagination) => {
    const user = await User.findByPk(id);

    if (!user) {
        throw new ErrorResponse('User not found', 404);
    }

    const { p, l, q } = pagination;
    const chatbots = await ChatBot.findAndCountAll({
        attributes: ['id', 'name', 'description'],
        limit: l,
        offset: (p - 1) * l,
        where: {
            userId: id,
            name: {
                [Op.like]: `%${q}%`,
            },
        },
    });

    return {
        ok: true,
        data: {
            chatbots: chatbots.rows,
            page: p,
            limit: l,
            total: chatbots.count,
            totalPages: Math.ceil(chatbots.count / l),
        },
    };
};

export const getChatbotById = async (id: number) => {
    const chatbot = await ChatBot.findByPk(id, {
        attributes: ['id', 'name', 'description'],
    });
    if (!chatbot) {
        return { ok: false, message: 'Chatbot not found' };
    }
    return { ok: true, chatbot };
};

export const updateChatbot = async (
    userId: number,
    id: number,
    chatbotInfo: Partial<ChatbotInfo['body']>
) => {
    const chatbot = await ChatBot.findByPk(id, {
        attributes: ['id', 'name', 'description'],
    });
    if (!chatbot) {
        return { ok: false, message: 'Chatbot not found' };
    }

    if (chatbot.userId !== userId) {
        throw new ErrorResponse('Unauthorized', 401);
    }

    await chatbot.update({ ...chatbotInfo });
    return { ok: true, chatbot };
};

export const deleteChatbot = async (chatbotId: number, userId: number) => {
    const chatbot = await ChatBot.findByPk(chatbotId, {
        attributes: ['id', 'name', 'description', 'userId'],
    });
    if (!chatbot) {
        return { ok: false, message: 'Chatbot not found' };
    }

    if (chatbot.userId !== userId) {
        throw new ErrorResponse('Unauthorized', 401);
    }

    await chatbot.destroy();
    return { ok: true, chatbot };
};
