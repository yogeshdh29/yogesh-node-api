'use strict';

const fs = require('fs');

fs.readFile('student.json', (err, data) => {
    if (err) throw err;
    let student = JSON.parse(data);
    console.log(student);
});

console.log('This is after the read call');


let student = {
  name: 'MIke',
  age: 23,
  gender: 'Male',
  department: 'English',
  car: 'Honda'
};

let data = JSON.stringify(student, null, 2);

fs.writeFile('student.json', data, (err) => {
  if(err) throw err;
  console.log('Data written');
});
console.log('This is after the write call');
