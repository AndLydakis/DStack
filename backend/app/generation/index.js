const {REFRESH_RATE, SECONDS} = require('../config.js');
const Dragon = require('../dragon');

const refreshRate = REFRESH_RATE * SECONDS;

class Generation {
    constructor() {
        this.expiration = this.calculateExpiration();
        this.generationId = undefined;
    }

    calculateExpiration() {
        console.log('Calculating expiration');
        const expirationPeriod = Math.floor(Math.random() * refreshRate * 0.5);
        // random expiration period
        const msUntilExpiration = Math.random() < 0.5 ? refreshRate - expirationPeriod : refreshRate + expirationPeriod;
        return new Date(Date.now() + msUntilExpiration);
    }

    newDragon() {
        if (Date.now() > this.expiration) {
            throw new Error(`This generation expired on ${this.expiration}`);
        }
        return new Dragon({generationId: this.generationId});
    }
}

module.exports = Generation;