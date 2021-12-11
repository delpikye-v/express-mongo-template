/**
 * This is sample.
 */
import express from 'express';
import TodoController from '../controllers/TodoController.js';

const routes = express.Router();

// more defind
routes.get('/', TodoController.list);
routes.get('/:id', TodoController.get);
routes.post('/', TodoController.create);
routes.put('/:id', TodoController.update);
routes.delete('/:id', TodoController.delete);

export default routes;
