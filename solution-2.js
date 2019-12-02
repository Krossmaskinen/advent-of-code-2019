const fInput = require('fs')
            .readFileSync('input-2.txt')
            .toString()
            .split(',')
            .map(Number);
const testInput = require('fs')
            .readFileSync('input-2.test.txt')
            .toString()
            .split(',')
            .map(Number);
let processedCode = [...fInput];
let answer = 0;
const OPS = {
    1: add,
    2: multiply,
    99: terminate
};

// preprocess input - forgot this part at first which made me very confused about not being right
processedCode[1] = 12;
processedCode[2] = 2;

for (let i = 0; i < fInput.length; i += 4) {
    const instruction = processedCode[i];
    const op = OPS[instruction];
    const val1 = processedCode[processedCode[i + 1]];
    const val2 = processedCode[processedCode[i + 2]];
    const targetIndex = processedCode[i + 3];
    const res = op(val1, val2);

    if (res === false) {
        break;
    }

    processedCode[targetIndex] = res;
}

answer = processedCode[0];

console.group('answer')
console.log(answer);
console.groupEnd('answer')

return answer;

function add(num1, num2) {
    return num1 + num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function terminate() {
    return false;
}