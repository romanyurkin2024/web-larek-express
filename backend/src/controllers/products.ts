import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import Product from '../models/product';
import { catchMongooseErrors } from '../../utils/dbErrorCatcher';
import NotFoundError from '../errors/not-found-error';

export const getProducts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find({});
    return res.json({ items: products, total: products.length });
  } catch (error) {
    if (catchMongooseErrors(error, next)) {
      return next();
    }
    return next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    if (catchMongooseErrors(error, next)) return;
    next(error);
  }
};

export const changeProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      new ObjectId(req.params.id),
      req.body,
      { runValidators: true, new: true },
    );

    if (!updatedProduct) {
      return next(new NotFoundError('Продукт не был найден'));
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    if (catchMongooseErrors(error, next)) {
      return next(error);
    }
    return next(error);
  }
};
