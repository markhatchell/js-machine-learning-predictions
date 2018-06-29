const Brain = require('./brain');
const dataSet = require('./dataSet.js');

const brain = new Brain();
brain.trainList(dataSet);
console.log(brain.guess('month', 'July'));