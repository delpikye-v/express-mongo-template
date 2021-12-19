import 'dotenv/config';
import 'module-alias/register.js';
import App from './app.js'
import TodoController from './script/todo/todo.controller.js'

const app = new App(
    [new TodoController()],
    Number(process.env.PORT)
)

app.start()
