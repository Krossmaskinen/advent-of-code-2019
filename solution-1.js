const fInput = require('fs')
            .readFileSync('input-1-1.txt')
            .toString()
            .split('\n')
            .map(Number);
const testInput = require('fs')
            .readFileSync('input-1-1.txt')
            .toString()
            .split('\n')
            .map(Number);
let totalFuelRequired = 0;

console.group('part 1');
console.assert(getRequiredFuel(testInput[0] === 2, '1st input should be 2'));
console.assert(getRequiredFuel(testInput[1] === 2, '2nd input should be 2'));
console.assert(getRequiredFuel(testInput[2] === 654, '3rd input should be 654'));
console.assert(getRequiredFuel(testInput[3] === 33583, '4th input should be 33583'));
console.groupEnd('part 1');

function getRequiredFuelRecursive(mass) {
    let requiredFuel = parseInt(mass / 3) - 2;

    if (requiredFuel > 0) {
        requiredFuel += getRequiredFuelRecursive(requiredFuel);
    }

    return requiredFuel >= 0 ? requiredFuel : 0;
}

function getRequiredFuel(mass) {
    const requiredFuel = parseInt(mass / 3) - 2;

    return requiredFuel;
}

// start the party!
fInput.forEach(mass => {
    totalFuelRequired += getRequiredFuelRecursive(mass);
});

console.group('solution');
console.log(totalFuelRequired);
console.groupEnd('solution');