const Dragon = require('./index');
const base64 = require('base-64');

class Breeder {
    static breedDragon({matron, patron}) {
        const matronTraits = matron.traits;
        const patronTraits = patron.traits;
        const babyTraits = [];
        matronTraits.forEach(({traitType, traitValue}) => {
            const matronTrait = traitValue;
            const patronTrait = patronTraits.find(
                trait => trait.traitType === traitType
            ).traitValue;

            babyTraits.push({
                traitType: traitType,
                traitValue: Breeder.pickTrait({matronTrait, patronTrait})
            })
        })

        return new Dragon({nickname: 'baby', traits: babyTraits});
    }

    // Two incoming traits: matronTrait, patronTrait
    // Traits have their characters summed.
    // get range by summing sums
    // If random number < matronTrait.character sum pick matron
    // else pick matron
    static pickTrait({matronTrait, patronTrait}) {
        if (matronTrait === patronTrait) return matronTrait;
        const matronSum = Breeder.charSum(base64.encode(matronTrait));
        const patronSum = Breeder.charSum(base64.encode(patronTrait));
        const randNum = Math.floor(Math.random() * (matronSum + patronSum))
        return randNum < matronSum ? matronTrait : patronTrait;

    }

    static charSum(string) {
        return string.split('').reduce((sum, character)=> sum += character.charCodeAt(0), 0);
    }
}

module.exports = Breeder;