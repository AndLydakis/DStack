const Generation = require('./generation');

class GeneratioEngine {
    constructor() {
        this.generation = null;
    }

    buildNewGeneration() {
        this.generation = new Generation();
        console.log('New Generation: ', this.generation);

        setTimeout(() => {
            this.buildNewGeneration();
        }, this.generation.expiration.getTime() - Date.now());
    }
}