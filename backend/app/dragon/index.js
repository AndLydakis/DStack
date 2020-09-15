const TRAITS = require('../../data/traits.json')

const DEFAULT_PROPERTIES = {
    nickname: 'JohnDoe',
    dragonId: undefined,
    get birthdate() {
        return new Date();
    },
    get randomTraits() {
        const traits = [];

        TRAITS.forEach(TRAIT => {
            const traitType = TRAIT.type;
            const traitValues = TRAIT.values;
            // Pick random value from each trait
            const traitValue = traitValues[Math.floor(Math.random() * traitValues.length)];
            // Push type, value pair to traits list
            traits.push({traitType, traitValue});
        });
        return traits;
    },
    generationId: undefined
};

class Index {
    constructor({dragonId, birthdate, nickname, traits, generationId} = {}) {
        this.dragonId = dragonId || DEFAULT_PROPERTIES.dragonId;
        this.birthdate = birthdate || DEFAULT_PROPERTIES.birthdate;
        this.nickname = nickname || DEFAULT_PROPERTIES.nickname;
        this.traits = traits || DEFAULT_PROPERTIES.randomTraits;
        this.generationId = generationId || DEFAULT_PROPERTIES.generationId;

        console.log('New Dragon ',this);

    }

}

module.exports = Index;