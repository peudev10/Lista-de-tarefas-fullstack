const tasksModel = require('../models/tasksModels');

const getAll = async (request, response) => {
    const tasks = await tasksModel.getAll();
    return response.status(200).json(tasks);
};

const createTaks = async (request, response) =>{
    const createdTask = await tasksModel.createTaks(request.body);
    return response.status(201).json(createdTask);
}

const deleteTask = async (request, response) =>{
    const {id} = request.params;
    await tasksModel.deleteTask(id);

    return response.status(204).json();
}

const updadeTask = async (request, response) =>{
    const {id} = request.params;

    await tasksModel.updadeTask(id, request.body);

    return response.status(204).json()
}

const getTasksStatus = async (request, response) => {
    const status = request.params;
    const statusTask = await tasksModel.getTasksStatus(status);

    return response.status(200).json(statusTask);
}
module.exports = {
    getAll,
    createTaks,
    getTasksStatus,
    deleteTask,
    updadeTask
};