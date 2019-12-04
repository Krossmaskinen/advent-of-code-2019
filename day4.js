// const input = require('fs')
//             .readFileSync('input-[#].txt')
//             .toString()
//             .split('-');
const testInput = require('fs')
            .readFileSync('test4.txt')
            .toString()
            .split('')
            .map(Number);
const rangeStart = 109165;
const rangeEnd = 576723;
let validPasswords = [];

function getIsValidPassword(password) {
    let neverDecrease = true;
    let hasTwinDigits = false;

    if (password.length < 6) {
        return false;
    }

    for (let i = 1; i < 6; ++i) {
        // should not decrease
        if (password[i] < password[i - 1]) {
            neverDecrease = false;
            break;
        }

        if (password[i] === password[i - 1]) {
            hasTwinDigits = true;
        }
    }

    // if (!neverDecrease) {
    //     console.log(password, 'decreases');
    // }

    // if (!hasTwinDigits) {
    //     console.log(password, 'no twins');
    // }

    return  (neverDecrease && hasTwinDigits);
}

function getValidPasswordsInRange(rangeStart, rangeEnd) {
    const validPasswords = [];
    console.log('rangestart', rangeStart);
    console.log('rangeEnd', rangeEnd);


    for (let i = rangeStart; i < (rangeEnd - 6); ++i) {
        const inputRange = i.toString().split('').map(Number);
        const passwordToTest = inputRange;
        const passwordResult = getIsValidPassword(passwordToTest);

        if (passwordResult) {
            validPasswords.push(passwordToTest)
        }
    }

    return validPasswords;
}

console.time('day4');
validPasswords = getValidPasswordsInRange(rangeStart, rangeEnd);
console.timeEnd('day4');

console.group('sample');
console.log(validPasswords.slice(validPasswords.length - 10, validPasswords.length - 1));
console.groupEnd('sample');

console.group('answer');
console.log(validPasswords.length);
console.groupEnd('answer');