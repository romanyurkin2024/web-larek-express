import { Error as MongooseError } from 'mongoose';
import BadRequestError from '../src/errors/bad-request-error';
import ConflictError from '../src/errors/conflict-error';
import { NextFunction } from 'express';

export const catchMongooseErrors = (error: unknown, next: NextFunction): boolean => {
  // 400 Bad Request
  if (error instanceof MongooseError.ValidationError) {
    next(new BadRequestError(error.message));
    return true;
  }

  // 409 Conflict
  if (error instanceof Error && error.message.includes('E11000')) {
    next(new ConflictError('Продукт с таким названием уже существует'));
    return true;
  }

  return false;
};