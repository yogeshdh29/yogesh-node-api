'use strict';
module.exports = function(app) {
  var todoList = require('../controller/todoListController');

app.route('/')
.get(function (req, res) {
  res.send('Welcome to Node API.A few possible routes!!  /tasks');
});

app.route('/tasks')
.get(todoList.list_all_tasks)
.post(todoList.create_a_task);

app.route('/tasks/:taskId')
.get(todoList.read_a_task)
.put(todoList.update_a_task)
.delete(todoList.delete_a_task);

app.route('/read')
.get(todoList.read_from_student)
.post(todoList.create_a_student);
};
