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
let validPasswords1 = [];
let validPasswords2 = [];

function getIsValidPassword(password, isPart2) {
    let neverDecrease = true;
    let hasTwinDigits = false;
    let twins = {};

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
            twins[password[i]] = twins[password[i]] ? twins[password[i]] + 1 : 2;
        }
    }

    if (isPart2) {
        hasTwinDigits = Object.values(twins).some(val => val === 2);
    } else {
        hasTwinDigits = Object.keys(twins).length > 0;
    }

    return  (neverDecrease && hasTwinDigits);
}

function getValidPasswordsInRange(rangeStart, rangeEnd, isPart2) {
    const validPasswords = [];

    for (let i = rangeStart; i < (rangeEnd - 6); ++i) {
        const inputRange = i.toString().split('').map(Number);
        const passwordToTest = inputRange;
        const passwordResult = getIsValidPassword(passwordToTest, isPart2);

        if (passwordResult) {
            validPasswords.push(passwordToTest)
        }
    }

    return validPasswords;
}

console.time('day4 part 1');
validPasswords1 = getValidPasswordsInRange(rangeStart, rangeEnd, false);
console.timeEnd('day4 part 1');

console.group('sample');
console.log(validPasswords1.slice(validPasswords1.length - 10, validPasswords1.length - 1));
console.groupEnd('sample');

console.group('answer 1');
console.log(validPasswords1.length);
console.groupEnd('answer 1');

// part 2

console.time('day4 part 2');
validPasswords2 = getValidPasswordsInRange(rangeStart, rangeEnd, true);
console.timeEnd('day4 part 2');

console.group('sample');
console.log(validPasswords2.slice(validPasswords2.length - 10, validPasswords2.length - 1));
console.groupEnd('sample');

console.group('answer 2');
console.log(validPasswords2.length);
console.groupEnd('answer 2');

// part 1
console.assert(validPasswords1.length === 2814, `${validPasswords1.length} should be 2814`);

// part 2
console.assert(validPasswords2.length === 1991, `${validPasswords2.length} should be 1991`);