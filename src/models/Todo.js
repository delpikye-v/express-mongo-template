/**
 * This is sample.
 */
import mongoose from 'mongoose';

const { Schema, model } = mongoose;
export const TodoSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        require: true,
    }
});

let Todo = model('Todo', TodoSchema);
export default Todo;
