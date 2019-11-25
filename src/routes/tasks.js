const express = require('express');
const tasks = require('../controllers/tasks');
const auth = require('../config/auth');

const router = new express.Router();

router.post('/create/tasks', auth, tasks.createTasks);
router.get('/tasks', auth, tasks.getTasks);
router.delete('/delete/task', auth, tasks.deleteTask);

module.exports = router;