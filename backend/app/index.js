const GenerationEngine = require('./generation/engine.js');
const express = require('express');
const dragonRouter = require('./api/dragon.js');
const generationRouter = require('./api/generation.js');
const app = express();
const engine = new GenerationEngine();

app.locals.engine = engine;
app.use('/dragon', dragonRouter);
app.use('/generation', generationRouter);

// Error handling function
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        type: 'error', message: err.message
    });
});

engine.start();

module.exports = app;