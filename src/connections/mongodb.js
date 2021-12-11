import mongoose from 'mongoose';
import logger from '../utils/logger.js';
import { MONGO_URI } from '../utils/config.js';

const connection = () => {
    mongoose
        .connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            logger.info('Connected to database');
        })
        .catch((err) => {
            logger.error(err);
        });
};

export default connection;
