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
let processedCode;
let answerPart1 = 0;
let answerPart2;
const OPS = {
    1: add,
    2: multiply,
    99: terminate
};
// preprocess input - forgot this part at first which made me very confused about not being right
fInput[1] = 12;
fInput[2] = 2;

processedCode = [...fInput];

function runIntcode(memorySegment) {
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

    return processedCode;
}

function part1() {
    const finishedMemory = runIntcode(fInput);

    answerPart1 = finishedMemory[0];

    console.assert(answerPart1 === 3306701, `${answerPart1} should be 3306701`);

    console.group('answer 1');
    console.log(answerPart1);
    console.groupEnd('answer 1');

    return answerPart1;
}

function part2() {
    let noun = 0;
    let verb = 0;
    let target = 19690720;
    let result;

    processedCode = [...fInput];
    processedCode[1] = noun;
    processedCode[2] = verb;

    for (let i = 0; i <= 99; ++i) {
        for (let j = 0; j <= 99; ++j) {
            processedCode = [...fInput];
            processedCode[1] = i;
            processedCode[2] = j;

            result = runIntcode(fInput)

            if (result[0] === target) {
                answerPart2 = (100 * i) + j;

                break;
            }
        }

        if (answerPart2) {
            break;
        }
    }

    console.assert(answerPart2 === 7621, `${answerPart2} should be 7621`);

    console.group('answer 2');
    console.log(answerPart2);
    console.groupEnd('answer 2');

    return answerPart2;
}

part1();
part2();

function add(num1, num2) {
    return num1 + num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function terminate() {
    return false;
}