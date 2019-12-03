let fInput = require('fs')
            .readFileSync('input-3.txt')
            .toString()
            .split('\n');
// let testInput = require('fs')
//             .readFileSync('input-3.test.txt')
//             .toString()
//             .split('\n');
let answer1 = 0;
let wirePaths = [];
let intersections;
let shortestDistance;
let shortestRoute;

fInput = fInput.map(wire => wire.split(',').map(instruction => {
    let instructionArr = instruction.split('');
    let dir = instructionArr.shift();
    let length = parseInt(instructionArr.join(''));

    return { dir, length };
}));

function loadPaths() {
    fInput.forEach((wire, index) => {
        wirePaths.push([[0, 0]]);

        wire.forEach(instruction => {
            let moveX = 0;
            let moveY = 0;
            let lastIndex = wirePaths[index].length - 1;
            switch (instruction.dir) {
                case 'L':
                    moveX = -1;
                    break;
                case 'R':
                    moveX = 1;
                    break;
                case 'U':
                    moveY = 1;
                    break;
                case 'D':
                    moveY = -1;
                    break;
                default:
                    break;
            }

            for (let i = 1; i < instruction.length + 1; ++i) {
                wirePaths[index].push([
                    wirePaths[index][lastIndex][0] + (moveX * (i)),
                    wirePaths[index][lastIndex][1] + (moveY * (i)),
                ]);
            }
        });
    });
}

function findIntersections(paths) {
    let intersections = [];

    paths[0].forEach((path0Coord, index0) => {
        let index1 = paths[1].findIndex((path1Coord) => (path1Coord[0] === path0Coord[0]) && (path1Coord[1] === path0Coord[1]));

        if (index1 > 0 && index0 !== 0) {
            if (!shortestRoute || shortestRoute > index0 + index1) {
                shortestRoute = index0 + index1;
            }

            intersections.push([...paths[1][index1]]);
        }
    });

    return intersections;
}

function findShortestDistance(intersections) {
    let shortestDistance;

    intersections.forEach((coords, index) => {
        let dist = Math.abs(coords[0]) + Math.abs(coords[1]);

        if (index !== 0) {
            shortestDistance = (dist < shortestDistance) ? dist : shortestDistance;
        } else {
            shortestDistance = dist;
        }
    });

    return shortestDistance;
}

const TIMER = 'solution 3';
console.time(TIMER);
loadPaths();
intersections = findIntersections(wirePaths);
shortestDistance = findShortestDistance(intersections);

answer1 = shortestDistance;

console.assert(answer1 === 1195, `${answer1} should have been 1195`);

console.group('answer 1');
console.log(answer1);
console.groupEnd('answer 1');

let answer2 = shortestRoute;

console.group('answer 2');
console.log(answer2);
console.groupEnd('answer 2');

console.assert(answer2 === 91518, `${answer2} should have been 91518`);
console.timeEnd(TIMER);