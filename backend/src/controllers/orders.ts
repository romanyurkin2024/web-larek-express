import { NextFunction, Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { items, total } = req.body;
  const itemsInDb = await Product.find({ _id: { $in: items } });
  const calculatedTotal = itemsInDb.reduce((sum, p) => sum + (p.price || 0), 0);

  if (!itemsInDb) {
    return res.status(400).json({ message: 'Выбранные товары отсутствуют' });
  }

  const invalidItem = itemsInDb.find((item) => item.price === null);
  if (invalidItem) {
    return next(new BadRequestError(`Товар с id ${invalidItem._id} не продается`));
  }

  if (itemsInDb.length !== items.length) {
    const foundIds = itemsInDb.map((p) => p._id.toString());
    const notFoundIds = items.filter((id: string) => !foundIds.includes(id));

    return next(new BadRequestError(`Следующие товары не найдены в базе: ${notFoundIds.join(', ')}`));
  }

  if (calculatedTotal !== total) {
    return next(new BadRequestError('Неверная сумма заказа'));
  }

  return res.send({ id: faker.string.ulid(), total: calculatedTotal });
};

export default createOrder;
