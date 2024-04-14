import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validatorMiddleware = [
  body('email').notEmpty().withMessage('이메일은 필수 입력 값입니다.'),
  body('password').notEmpty().withMessage('비밀번호는 필수 입력 값입니다.'),
  (req: Request, _: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errors.array());
    }
    next();
  },
];
