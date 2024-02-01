const express = require('express');
const router = express.Router();


// caminho onde fica as funções chamadas nas rotas
const tasksController = require('./controllers/tasksControllers');
const tasksMiddleware = require('./middleware/tasksMiddleware')

// aqui é feito e pensado nas rotas que a api vai ter
router.get('/tasks', tasksController.getAll); // busca as tarefas
router.post('/tasks' , tasksMiddleware.validateFieldTitle, tasksController.createTaks)// adiciona uma nova tarefa´;
router.delete('/tasks/:id', tasksController.deleteTask);
router.put('/tasks/:id', tasksMiddleware.validateFieldTitle, tasksMiddleware.validateFieldStatus, tasksController.updadeTask);


router.get('/tasks/:status', tasksController.getTasksStatus);

module.exports = router;