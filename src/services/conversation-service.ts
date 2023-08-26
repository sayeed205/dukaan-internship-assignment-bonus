import { Op } from 'sequelize';
import { Conversation, EndUser } from '../models';
import { ErrorResponse } from '../utils';
import { Pagination } from '../validations';

type ConversationInfo = {
    title: string;
    content: string;
    isComplete: boolean;
    chatbotId: number;
};

export const createConversation = async (
    id: number,
    conversationInfo: ConversationInfo
) => {
    // probably only end users gonna have conversations with chatbots

    const user = await EndUser.findByPk(id);

    if (!user) {
        throw new ErrorResponse('Probably you are not an end user', 404);
    }

    const conversation = await Conversation.create({
        ...conversationInfo,
        endUserId: id,
    });

    return { ok: true, conversation };
};

export const getConversationsByChatbotId = async (
    chatbotId: number,
    endUserId: number,
    pagination: Pagination
) => {
    const { p, l, q } = pagination;
    const conversations = await Conversation.findAll({
        attributes: [
            'id',
            'title',
            'content',
            'isComplete',
            'endUserId',
            'chatbotId',
            'createdAt',
        ],
        limit: l,
        offset: (p - 1) * l,
        where: {
            chatbotId,
            endUserId,
            [Op.or]: [
                {
                    title: {
                        [Op.like]: `%${q}%`,
                    },
                },
                {
                    content: {
                        [Op.like]: `%${q}%`,
                    },
                },
            ],
        },
    });

    return {
        ok: true,
        data: {
            conversations,
            page: p,
            limit: l,
            total: conversations.length,
            totalPages: Math.ceil(conversations.length / l),
        },
    };
};

export const getConversationById = async (id: number) => {
    const conversation = await Conversation.findByPk(id, {
        attributes: [
            'id',
            'title',
            'content',
            'isComplete',
            'endUserId',
            'chatbotId',
            'createdAt',
        ],
    });

    if (!conversation) {
        throw new ErrorResponse('Conversation not found', 404);
    }

    return { ok: true, conversation };
};

export const updateConversation = async (
    conversationId: number,
    userId: number,
    isComplete: boolean
) => {
    const conversation = await Conversation.findByPk(conversationId, {
        attributes: [
            'id',
            'title',
            'content',
            'isComplete',
            'endUserId',
            'chatbotId',
            'createdAt',
        ],
    });

    if (!conversation) {
        throw new ErrorResponse('Conversation not found', 404);
    }

    if (conversation.endUserId !== userId) {
        throw new ErrorResponse(
            'You are not allowed to update this conversation',
            403
        );
    }

    conversation.isComplete = isComplete;
    await conversation.save();

    return { ok: true, conversation };
};

export const deleteConversation = async (
    conversationId: number,
    userId: number
) => {
    const conversation = await Conversation.findByPk(conversationId, {
        attributes: [
            'id',
            'title',
            'content',
            'isComplete',
            'endUserId',
            'chatbotId',
            'createdAt',
        ],
    });

    if (!conversation) {
        throw new ErrorResponse('Conversation not found', 404);
    }

    if (conversation.endUserId !== userId) {
        throw new ErrorResponse(
            'You are not allowed to delete this conversation',
            403
        );
    }

    await conversation.update({ isDeleted: true });

    return { ok: true, conversation };
};
