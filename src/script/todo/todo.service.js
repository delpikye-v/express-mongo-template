/**
 * This is sample.
 */

import HttpException from '../../utils/exceptions/http.exception.js';

import Todo from './todo.model.js';

const prepareData = (data = {}) => {
    let changes = { ...data };
    delete changes['_id'];
    delete changes['__v'];
    return changes;
};

class TodoService {
    static async list(req, res) {
        const model = await Todo.find();
        res.json({
            result: model,
        });
    }

    static async get(req, res, next) {
        let { id } = req.params;
        try {
            let model = await Todo.findOne({ _id: id });
            res.json({
                result: model,
            });
        } catch {
            return next(new HttpException(404, 'No found data'));
        }
    }

    static async create(req, res, next) {
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
            return next(new HttpException(400, 'Bad request!'));
        }
    }

    static async delete(req, res, next) {
        const { id } = req.params;
        try {
            let result = await Todo.deleteOne({ _id: id });
            const { deletedCount } = result;
            const resultDel = deletedCount !== 0;
            res.json({
                result: resultDel,
                message: resultDel ? 'Deleted!' : 'No record!',
            });
        } catch {
            return next(new HttpException(400, 'Bad request!'));
        }
    }

    static async update(req, res, next) {
        const { id } = req.params;
        try {
            let changes = prepareData(req.body);

            await Todo.findOneAndUpdate({ _id: id }, changes).then(() => {
                res.status(201).json({
                    result: true,
                    message: 'Updated!',
                });
                resolve()
            })
        } catch {
            return next(new HttpException(404, 'No data update!'));
        }
    }
}

export default TodoService;
