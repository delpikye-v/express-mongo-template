import dotenv from 'dotenv';

dotenv.config();

const { PORT, NODE_ENV, MONGO_URI_PROD, MONGO_URI_DEV } = process.env;
const MONGO_URI = NODE_ENV === 'production' ? MONGO_URI_PROD : MONGO_URI_DEV;

export { MONGO_URI, PORT };
