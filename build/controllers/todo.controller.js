"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getTodoById = exports.all = exports.add = void 0;
const Todo_1 = require("../models/Todo");
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, done } = req.body;
    if (title) {
        const newTodo = yield Todo_1.Todo.create({ title, done: done ? true : false });
        res.status(201);
        res.json({ item: newTodo });
    }
    else {
        res.json({ error: 'Título da tarefa obrigatório!' });
    }
});
exports.add = add;
const all = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield Todo_1.Todo.findAll();
    res.json({ list });
});
exports.all = all;
const getTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const todo = yield Todo_1.Todo.findByPk(id);
    if (todo) {
        res.json({ todo });
    }
    else {
        res.json({ error: 'Tarefa não encontrada!' });
    }
});
exports.getTodoById = getTodoById;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, done } = req.body;
    let todo = yield Todo_1.Todo.findByPk(id);
    if (!todo) {
        res.json({ error: 'Tarefa não encontrada !' });
    }
    else {
        if (title)
            todo.title = title;
        if (done) {
            switch (done.toString().toLowerCase()) {
                case 'true':
                case '1':
                    todo.done = true;
                    break;
                case 'false':
                case '0':
                    todo.done = false;
                    break;
            }
        }
        yield todo.save();
        res.json({ todo });
    }
});
exports.update = update;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const todo = yield Todo_1.Todo.findByPk(id);
    if (todo)
        yield todo.destroy();
    res.json({});
});
exports.remove = remove;
