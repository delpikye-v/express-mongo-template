import express from 'express'

import TodoService from './todo.service.js';

class TodoController {
    constructor() {
        this.path = '/todo';
        this.routes = express.Router();

        // router register
        this.routes.get('/', TodoService.list);
        this.routes.get('/:id', TodoService.get);
        this.routes.post('/', TodoService.create);
        this.routes.put('/:id', TodoService.update);
        this.routes.delete('/:id', TodoService.delete);
    }
}

export default TodoController;