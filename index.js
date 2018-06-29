const Brain = require('./brain');
const dataSet = require('./dataSet.js');

const brain = new Brain();
brain.trainList(dataSet);

const fieldToFind = 'nationality';
const baseData = {
    hair: 'Brown',
    eyes: 'Blue',
};

const guess = brain.guess(baseData, fieldToFind)
console.log(fieldToFind, guess);