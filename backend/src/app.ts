import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import { errors as celebrateErrors } from 'celebrate';
import errorHandler from './middlewares/error-handler';
import { requestLogger, errorLogger } from './middlewares/logger';
import indexRoutes from './routes/index';
import productRoutes from './routes/product';
import orderRoutes from './routes/order';

const PORT = process.env.PORT || 3000;
const DB_ADDRESS = process.env.DB_ADDRESS || 'mongodb://127.0.0.1:27017/weblarek';
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(requestLogger);

app.use('/', indexRoutes);
app.use('/product', productRoutes);
app.use('/order', orderRoutes);

app.use(errorLogger);
app.use(celebrateErrors());
app.use(errorHandler);

const startServer = async () => {
  try {
    await mongoose.connect(DB_ADDRESS);
    console.log(`Database name: ${mongoose.connection.db.databaseName}`);

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

startServer();
