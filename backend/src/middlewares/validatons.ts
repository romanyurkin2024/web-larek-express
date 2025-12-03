import { celebrate, Joi, Segments } from 'celebrate';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
enum PaymentMethod {
  Card = 'card',
  Online = 'online'
}

export const validateOrderBody = celebrate({
  [Segments.BODY]: Joi.object().keys({

    items: Joi.array().items(
      Joi.string().hex().length(24).messages({
        'string.hex': 'ID товара должен быть шестнадцатеричной строкой',
        'string.length': 'ID товара должен содержать ровно 24 символа',
      }),
    ).required().min(1)
      .messages({
        'array.base': 'Поле "items" должно быть массивом ID',
        'array.min': 'Массив "items" не должен быть пустым',
        'any.required': 'Поле "items" обязательно',
      }),

    total: Joi.number().required().messages({
      'number.base': 'Поле "total" должно быть числом',
      'any.required': 'Поле "total" обязательно',
    }),

    payment: Joi.string().valid(...Object.values(PaymentMethod)).required().messages({
      'any.required': 'Поле "payment" обязательно',
      'any.only': `Неверный способ оплаты. Возможные значения: ${Object.values(PaymentMethod).join(', ')}`,
    }),

    // email: Почта
    email: Joi.string().regex(EMAIL_REGEX).required().messages({
      'any.required': 'Поле "email" обязательно',
      'string.pattern.base': 'Некорректный формат email',
    }),

    // phone: Телефон
    phone: Joi.string().required().messages({
      'any.required': 'Поле "phone" обязательно',
    }),

    // address: Адрес
    address: Joi.string().required().messages({
      'any.required': 'Поле "address" обязательно',
    }),
  }),
});

export const validateObjId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
});

export const validateProductUpdateBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Поле "title" обязательно',
        'string.min': 'Минимальная длина поля "title" – 2 символа',
        'string.max': 'Максимальная длина поля "title" – 30 символов',
      }),
    image: Joi.object({
      fileName: Joi.string().required().messages({
        'any.required': 'Поле "image.fileName" обязательно',
      }),
      originalName: Joi.string().required().messages({
        'any.required': 'Поле "image.originalName" обязательно',
      }),
    }).required().messages({
      'any.required': 'Поле "image" обязательно',
      'object.base': 'Поле "image" должно быть объектом',
    }),
    category: Joi.string().required().messages({
      'any.required': 'Поле "category" обязательно',
    }),
    description: Joi.string().optional(),
    price: Joi.number().optional().allow(null),
  }),
});

export const validateProductBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Поле "title" обязательно',
        'string.min': 'Минимальная длина поля "title" – 2 символа',
        'string.max': 'Максимальная длина поля "title" – 30 символов',
      }),
    image: Joi.object({
      fileName: Joi.string().required().messages({
        'any.required': 'Поле "image.fileName" обязательно',
      }),
      originalName: Joi.string().required().messages({
        'any.required': 'Поле "image.originalName" обязательно',
      }),
    }).required().messages({
      'any.required': 'Поле "image" обязательно',
      'object.base': 'Поле "image" должно быть объектом',
    }),
    category: Joi.string().required().messages({
      'any.required': 'Поле "category" обязательно',
    }),
    description: Joi.string().optional(),
    price: Joi.number().optional().allow(null),
  }),
});
