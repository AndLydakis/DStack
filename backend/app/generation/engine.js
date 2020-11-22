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
        const generation = new Generation();
        GenerationTable.storeGeneration(generation)
            .then(({generationId}) => {
                this.generation = generation;
                this.generation.generationId = generationId;

                this.timer = setTimeout(() => {
                    this.buildNewGeneration();
                }, this.generation.expiration.getTime() - Date.now());

            })
            .catch(error => {
                console.log('Error storing generation', error)
            })
    }
}

module.exports = GenerationEngine;