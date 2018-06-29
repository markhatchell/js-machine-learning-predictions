const Brain = require('./brain');
const dataSet = require('./dataSet.js');

const brain = new Brain();
brain.trainList(dataSet);
const fieldToFind = 'nationality';
const guess = brain.guess({
    hair: 'Brown',
    eyes: 'Blue',
}, fieldToFind)
console.log(fieldToFind, guess);