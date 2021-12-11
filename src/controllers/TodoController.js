/**
 * This is sample.
 */
import Todo from '../models/Todo.js';

class TodoController {
    static async list(req, res) {
        const model = await Todo.find();
        res.json({
            result: model,
        });
    }

    static async get(req, res) {
        let { id } = req.params;
        try {
            let model = await Todo.findOne({ _id: id });
            if (!model) {
                return res.status(404).json({
                    result: {},
                    message: 'Nodata!'
                });
            }
            res.json({
                result: model,
            });
        } catch {
            res.status(400).json({
                error: false,
                message: 'Bad request!'
            });
        }
    }

    static async create(req, res) {
        try {
            const { name, description, completed } = prepareData(req.body);
            if (!name) {
                return res.status(400).json({ error: true, message: 'missing content' });
            }

            const todo = new Todo({ name, description, completed: !!completed });
            let result = await todo.save();
            res.status(201).json({
                result: result,
            });
        } catch {
            return res.status(400).json({
                error: false,
                message: 'Bad request!'
            })
        }
    }

    static async delete(req, res) {
        const { id } = req.params;
        try {
            let result = await Todo.deleteOne({ _id: id });
            const { deletedCount } = result;
            const resultDel = deletedCount !== 0
            res.json({
                result: resultDel,
                message: resultDel ? 'Deleted!' : 'No record!'
            });
        } catch {
            return res.status(400).json({
                error: true,
                message: 'Bad request!'
            })
        }
    }

    static async update(req, res) {
        const { id } = req.params;
        try {
            let changes = prepareData(req.body)

            await Todo.findOneAndUpdate({ _id: id }, changes)
            return res.status(201).json({
                result: true,
                message: 'Updated!',
            })
        } catch {
            return res.status(404).json({
                result: false,
                message: 'Nodata update!'
            })
        }
    }
}

export default TodoController;

function prepareData(data = {}) {
    let changes = { ...data }
    delete changes['_id']
    delete changes['__v']
    return changes
}