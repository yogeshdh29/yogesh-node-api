'use strict';

var mongoose = require('mongoose'),
Task = mongoose.model('Tasks');
var payloadChecker = require('payload-validator');
var expectedPayload = {
  "name": "",
  "age": 0,
  "gender": "",
  "department": "",
  "car": ""
}

exports.check_payload = function (req, res) {
  res.json({"message" : "GET not supported"});
  if(req.body){
    var result = payloadChecker.validator(req.body, expectedPayload, ["name", "age", "gender", "department", "car"], false);
    if(result.success)
    {
      res.json({"message": "Payload is valid"});
    }
    else {
      res.json({"message": result.res.errorMessage});
    }
  }
  else {
    res.json({"message": "payload not correct"});
  }
};

exports.check_payload2 = function (req, res) {

  if(req.body){
    var result = payloadChecker.validator(req.body, expectedPayload, ["name", "age", "gender", "department", "car"], false);
    if(result.success)
    {
      var fs = require('fs');
      let data = JSON.stringify(req.body, null, 2);
      fs.writeFile('././student.json', data, (err) => {
        if(err) throw err;
        res.json("Data Written");
        console.log('Data written');
      });
    }
    else {
      res.json({"message": result.response.errorMessage});
    }
  }
  else {
    res.json({"message": "payload not correct"});
  }
};
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

exports.write_a_student = function (req, res) {
  var fs = require('fs');
  var body = '';
  var filePath = '././student.json';
  req.on('data', function(data) {
    body += data;
  });
  req.on('end', function () {
    fs.appendFile(filePath, body, function () {
      console.log('Data written');
      res.end();
    });
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
