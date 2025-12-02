import mongoose from 'mongoose';

interface IProductImage {
  fileName: string;
  originalName: string
}

interface IProduct {
  title: string;
  image: IProductImage;
  category: string;
  description?: string;
  price?: number;
}

const productImageSchema = new mongoose.Schema<IProductImage>({
  fileName: String,
  originalName: String,
});

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    unique: true,
    required: [true, 'Поле "title" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "title" - 2'],
    maxlength: [30, 'Максимальная длина поля "title" - 30'],
  },
  image: {
    type: productImageSchema,
    required: [true, 'Поле "image" должно быть заполнено'],
  },
  category: {
    type: String,
    required: [true, 'Поле "category" должно быть заполнено'],
  },
  description: String,
  price: {
    type: Number,
    default: null,
  },
});

export default mongoose.model<IProduct>('product', productSchema);
