const Dragon = require('./dragon');
const Generation = require('./generation');
const GenerationEngine = require('./generation/engine');
const dragonRouter = require('./api/dragon');
const generationRouter = require('./api/generation');

const express = require('express');
const app = express();

engine = new GenerationEngine();

app.locals.engine = engine;

app.use('/dragon', dragonRouter);
app.use('/', generationRouter);

engine.start();

module.exports = app;
// console.log(new Dragon({birthdate: new Date(), nickname: 'test'}));
// console.log(new Dragon());
//
// setTimeout(() => {
//     const g = new Dragon();
//     console.log(g);
// }, 3000);

// const generation = new Generation();
// console.log(generation);
// console.log(generation.newDragon());
// setTimeout(() => {
//     const d = generation.newDragon();
//     console.log(d);
// }, 15000)


// setTimeout(() => {
//     engine.stop();
// }, 20000);