const { createCustomError } = require("../error/custom-error");
const asyncwrapper = require("../middleware/async");
const Task = require("../models/taskmodels");

const getAllTasks = asyncwrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
});

const createTask = asyncwrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
});

const getTask = asyncwrapper(async (req, res, next) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        return next(createCustomError(`No task with id ${req.params.id}`, 404))
        // throw new Error(`No task with id ${req.params.id}`);
        // return res.status(404).json({msg : `No task with id ${req.params.id}`});
    }
    res.status(200).json({ task });
});

const updateTask = asyncwrapper(async (req, res, next) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
        return next(createCustomError(`No task with id ${req.params.id}`, 404))
        // return res.status(404).json({msg : `No task with id ${req.params.id}`});
    }
    res.status(200).json({ task })
});

const deleteTask = asyncwrapper(async (req, res, next) => {
    const { _id: taskID } = req.params;
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
        return next(createCustomError(`No task with id ${req.params.id}`, 404))
        // return res.status(404).json({msg : `No task with id ${req.params.id}`});
    }
    res.status(200).json({ task });
});


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};