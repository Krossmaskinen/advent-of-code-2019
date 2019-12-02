const fInput = require('fs')
            .readFileSync('input-[#].txt')
            .toString()
            .split('\n')
            .map(Number);
const testInput = require('fs')
            .readFileSync('input-[#].test.txt')
            .toString()
            .split('\n')
            .map(Number);
let answer = 0;