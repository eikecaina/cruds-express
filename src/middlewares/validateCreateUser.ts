import { NextFunction, Request, Response } from 'express';

export const validateCreateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, email } = req.body;

  const hasEmptyField = [name, email].some(
    (value) => typeof value !== 'string' || value.trim() === ''
  );

  if (hasEmptyField) {
    return res.status(400).json({
      message: 'name and email are required and cannot be empty',
    });
  }

  next();
};
