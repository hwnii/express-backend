import { compare, hash } from 'bcrypt';
import { nanoid } from 'nanoid';
import { sign } from 'jsonwebtoken';
import { SignUpRequest, SignInRequest } from './users.type';
import { User } from '@prisma/client';
import { JWT_SECRET_KEY } from '../../../config/env.config';
import prismaClient from '../../../prisma/client.prisma';

/**
 * SignUp
 */
const signUp = async (signUpRequest: SignUpRequest) => {
  const { email, password } = signUpRequest;

  const encryptedPassword = await hash(password, 12);

  const user = await prismaClient.user.create({
    data: { id: nanoid(), email, encryptedPassword },
  });

  const accessToken = generatedAccessToken(user);

  return accessToken;
};

/**
 * SignIn
 */
const signIn = async (signInRequest: SignInRequest) => {
  const { email, password } = signInRequest;

  const user = await prismaClient.user.findUnique({ where: { email } });
  if (!user) throw new Error('No user');

  const isCorrect = await compare(password, user.encryptedPassword);
  if (!isCorrect) throw new Error('Invalid password');

  const accessToken = generatedAccessToken(user);

  return accessToken;
};

/**
 * AccessToken
 */
const generatedAccessToken = (user: User) => {
  const { email } = user;

  const accessToken = sign({ email }, JWT_SECRET_KEY, {
    subject: user.id,
    expiresIn: '2h',
  });

  return accessToken;
};

const usersService = {
  signUp,
  signIn,
};

export default usersService;
