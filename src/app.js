import express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import logger from './middleware/logger.middleware.js'
import errorMiddleware from './middleware/error.middleware.js';

class App {
    express = null
    port = 4000
    constructor(controllers = [], port) {
        this.express = express()
        this.port = port

        this.connectiondatabase();
        this.middlewarConfig();
        this.registerRouter(controllers);
        this.errorHandling()
    }

    connectiondatabase() {
        const { MONGO_PATH } = process.env;
        mongoose.connect(MONGO_PATH,  {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            logger.info('Connected to database!');
        }).catch(() => {
            logger.error('Connect database fail!')
        })
    }

    middlewarConfig() {
        this.express.use(cors());
        this.express.use(compression());
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(helmet());
        this.express.use(morgan('dev'));
    }

    registerRouter(controllers = []) {
        let self = this
        controllers.forEach(control => {
            control.routes && self.express.use(`/api${control.path}`, control.routes)
        })
    }

    errorHandling() {
        this.express.use(errorMiddleware)
    }

    start() {
        this.express.listen(this.port, () => {
            logger.info(`Server running in ${process.env.NODE_ENV} on port ${this.port}`)
        })
    }
}

export default App;
