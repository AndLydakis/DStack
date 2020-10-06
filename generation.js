const Dragon = require('./dragon');
const {REFRESH_RATE, SECONDS} = require('./config.js');
const refreshRate = REFRESH_RATE * SECONDS;

class Generation {
    constructor() {
        this.expiration = this.calculateExpiration();
    }

    calculateExpiration() {
        const expirationPeriod = Math.floor(Math.random() * refreshRate * 0.5);
        const msUntilExpiration = Math.floor() < 0.5 ?
            refreshRate - expirationPeriod : refreshRate + expirationPeriod;

        return new Date(Date.now() + msUntilExpiration);
    }

    newDragon() {
        if (Date.now() > this.expiration) {
            throw new Error(`Generation has expired: ${this.expiration}`);
        }
        return new Dragon();
    }
}

module.exports = Generation;

