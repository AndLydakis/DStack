const Dragon = require('./dragon');
const Generation = require('./generation');

// console.log(new Dragon({birthdate: new Date(), nickname: 'test'}));
// console.log(new Dragon());
//
// setTimeout(() => {
//     const g = new Dragon();
//     console.log(g);
// }, 3000);

const generation = new Generation();
console.log(generation);
console.log(generation.newDragon());
setTimeout(() => {
    const d = generation.newDragon();
    console.log(d);
}, 15000)