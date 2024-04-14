import { NextFunction, Request, Response, Router } from 'express';
import { SignInRequest, SignUpRequest } from './users.type';
import usersService from './users.service';
import { validatorMiddleware } from '../../../middlewares/validator.middleware';

const usersController = Router();

usersController.post(
  '/sign-up',
  validatorMiddleware,
  async (
    req: Request<never, never, SignUpRequest>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password, nickname, description } = req.body;

      const accessToken = await usersService.signUp({
        email,
        password,
        nickname,
        description,
      });

      res.json(accessToken);
    } catch (e) {
      next(e);
    }
  }
);

usersController.post(
  '/sign-in',
  validatorMiddleware,
  async (
    req: Request<never, never, SignInRequest>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;

      const accessToken = await usersService.signIn({ email, password });

      res.json(accessToken);
    } catch (err) {
      next(err);
    }
  }
);

export default usersController;
