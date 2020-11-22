const Dragon = require('../dragon');
const {REFRESH_RATE, SECONDS} = require('../config.js');
const refreshRate = REFRESH_RATE * SECONDS;
const dragonsPerGeneration = 10;

class Generation {
    constructor() {
        this.expiration = this.calculateExpiration();
        this.generationId = undefined;
        this.accountCounts = {};
    }

    calculateExpiration() {
        const expirationPeriod = Math.floor(Math.random() * refreshRate * 0.5);
        const msUntilExpiration = Math.random() < 0.5 ?
            refreshRate - expirationPeriod : refreshRate + expirationPeriod;

        return new Date(Date.now() + msUntilExpiration);
    }

    newDragon({accountId}) {
        if (!(accountId in this.accountCounts)) {this.accountCounts[accountId] = 1}
        else if (this.accountCounts[accountId] === dragonsPerGeneration) {
            throw new Error('You have reached the limit of dragons per generation');
        } else (this.accountCounts[accountId] += 1)
        if (Date.now() > this.expiration) {
            throw new Error(`Generation has expired: ${this.expiration}`);
        }
        return new Dragon({generationId: this.generationId});
    }
}

module.exports = Generation;

