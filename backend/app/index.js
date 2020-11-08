const GenerationEngine = require('./generation/engine.js');
const express = require('express');
const dragonRouter = require('./api/dragon.js');
const generationRouter = require('./api/generation.js');
const accountRouter = require('./api/account.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const engine = new GenerationEngine();

app.locals.engine = engine;

app.use(cors({origin: 'http://localhost:1234', credentials: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/account', accountRouter);
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