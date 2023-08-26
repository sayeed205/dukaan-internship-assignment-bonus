import { EndUser, User } from '../models';
import { ErrorResponse } from '../utils';
import { Login, Signup } from '../validations/auth-validation';

export const userSignup = async (userInfo: Signup) => {
    const { name, email, password } = userInfo;

    if (await User.isEmailTaken(email)) {
        throw new ErrorResponse('Email is already in use', 409);
    }

    const user = await User.create({ name, email, password });
    return { ok: true, token: user.generateToken() };
};

export const userLogin = async (userInfo: Login) => {
    const { email, password } = userInfo;

    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new ErrorResponse('Invalid credentials', 401);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new ErrorResponse('Invalid credentials', 401);
    }

    return { ok: true, token: user.generateToken() };
};

export const endUserSignup = async (userInfo: Signup) => {
    const { name, email, password } = userInfo;

    if (await EndUser.isEmailTaken(email)) {
        throw new ErrorResponse('Email is already in use', 409);
    }

    const user = await EndUser.create({ name, email, password });
    return { ok: true, token: user.generateToken() };
};

export const endUserLogin = async (userInfo: Login) => {
    const { email, password } = userInfo;

    const user = await EndUser.findOne({ where: { email } });
    if (!user) {
        throw new ErrorResponse('Invalid credentials', 401);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new ErrorResponse('Invalid credentials', 401);
    }

    return { ok: true, token: user.generateToken() };
};
