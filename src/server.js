import app from './app.js';
import logger from './utils/logger.js';
import { PORT } from './utils/config.js';

app.listen(PORT, () =>
    logger.info(`Server running in ${process.env.NODE_ENV} on port ${PORT}`),
);
