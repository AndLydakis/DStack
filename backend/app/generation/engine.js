const Generation = require('./index');
const GenerationTable = require('./table');

class GenerationEngine {
    constructor() {
        this.generation = null;
    }

    start() {
        this.buildNewGeneration();
    }

    stop() {
        clearTimeout(this.timer);
    }

    buildNewGeneration() {
        this.generation = new Generation();
        console.log('New Generation: ', this.generation);

        console.log('Storing New Generation');
        GenerationTable.storeGeneration(this.generation);

        this.timer = setTimeout(() => {
            console.log('This Generation has expired, building new one');
            this.buildNewGeneration();
        }, this.generation.expiration.getTime() - Date.now());
    }
}

module.exports = GenerationEngine;