const {Router} = require('express');

const router = new Router();

router.get('/new', (request, reponse) => {
    reponse.json({dragon: request.app.locals.engine.generation.newDragon()});
});

module.exports = router