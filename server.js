import { config } from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";

import { notFoundError, errorHandler } from "./middlewares/error-handler.js";
import { verifyAccessToken } from './middlewares/token-manager.js';
import authRoutes from './routes/authentication.js';
import productRoutes from './routes/product.js';

config();

const app = express();
const port = process.env.PORT || 9090;
const databaseName = 'Nectar';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
    .connect(`mongodb://127.0.0.1:27017/${databaseName}`)
    .then(() => {
        console.log(`Connected to ${databaseName}`);
    })
    .catch(err => {
        console.log(err);
    })

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', verifyAccessToken, async (req, res, next) => {
    res.send('Nectar running!');
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.use(notFoundError);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});