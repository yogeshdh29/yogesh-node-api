'use strict';

var mongoose = require('mongoose'),
Task = mongoose.model('Tasks');

exports.read_from_student = function (req, res) {
  var fs = require('fs');
  var data;
  fs.readFile('././student.json', 'utf8', function (err, data) {
    if (err) throw err;
    data = JSON.parse(data);
    res.json(data);
  });

};

exports.create_a_student = function (req, res) {
  var fs = require('fs');
  let student = {
    name: 'Molly',
    age: 23,
    gender: 'FeMale',
    department: 'English',
    car: 'Honda'
  };
  let data = JSON.stringify(student, null, 2);
  fs.writeFile('././student.json', data, (err) => {
    if(err) throw err;
    res.json("Data Written");
    console.log('Data written');
  });
};

exports.list_all_tasks = function (req,res) {
  Task.find ({}, function (err, task) {
    if(err)
    res.send(err);
    res.json(task);
  });
};

exports.create_a_task = function (req, res) {
  var new_task = new Task(req.body);
  new_task.save(function (err, task) {
    if(err)
    res.send(err);
    res.json(task);
  });
};

exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
