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


        console.log('Storing New Generation');
        GenerationTable.storeGeneration(generation)
            .then(({generationId}) => {
                this.generation = generation;
                this.generation.generationId = generationId;
                console.log('Stored generation ', this.generation.generationId);

                console.log('New Generation: ', this.generation);

                this.timer = setTimeout(() => {
                    console.log('This Generation has expired, building new one');
                    this.buildNewGeneration();
                }, this.generation.expiration.getTime() - Date.now());

            })
            .catch(error => {
                console.log('Error storing generation', error)
            })
    }
}

module.exports = GenerationEngine;