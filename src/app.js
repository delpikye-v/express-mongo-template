import express from 'express';
import morgan from 'morgan';

// more connection
import connection from './connections/mongodb.js';

// route import
import TodoRoutes from './routes/TodoRoutes.js'

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

// db connection
connection()

// register api
app.use('/api/todo', TodoRoutes)

export default app;
