const Generation = require('./index.js');
const GenerationTable = require('./table.js');

class GenerationEngine {

    constructor() {
        this.generation = null;
        this.timer = null;
    }

    start() {
        console.log('Starting engine');
        this.newGeneration();
    }

    stop() {
        console.log('Stopping engine');
        clearTimeout(this.timer);
    }

    newGeneration() {
        const generation = new Generation();

        GenerationTable.storeGeneration(generation)
            .then(({generationId})=>{
                this.generation = generation;
                this.generation.generationId = generationId;
                this.timer = setTimeout(
                    () => this.newGeneration(),
                    this.generation.expiration.getTime() - Date.now()
                );
            })
            .catch(error=>console.log(error));
    }
}

module.exports = GenerationEngine;