const input = require('fs')
            .readFileSync('input#.txt')
            .toString()
            .split('\n')
            .map(Number);
const testInput = require('fs')
            .readFileSync('test#.txt')
            .toString()
            .split('\n')
            .map(Number);
let answer = 0;