const TRAITS = require('./traits.json');
const DEFAULT_PROPERTIES = {
    nickname: 'default',
    get birthdate() {
        return new Date();
    },
    get traits() {
        const traits = [];
        TRAITS.forEach(TRAIT => {
            const traitType = TRAIT.type;
            const traitValues = TRAIT.values;
            const traitValue = traitValues[Math.floor(Math.random() * traitValues.length)];

            traits.push({traitType: traitType, traitValue: traitValue});
        })
        return traits;
    }
}

class Dragon {
    constructor({birthdate, nickname, traits} = {}) {
        this.birthdate = birthdate || DEFAULT_PROPERTIES.birthdate;
        this.nickname = nickname || DEFAULT_PROPERTIES.nickname;
        this.traits = traits || DEFAULT_PROPERTIES.traits;
    }
}

module.exports = Dragon;