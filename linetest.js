const line1 = {
    start: {x: 0, y: 0},
    end: {x: 0, y: 5}
};
const line2 = {
    start: {x: -3, y: 2},
    end: {x: 5, y: 2}
};
let intersection;

function findIntersection(line1, line2) {
    const A = line1.start;
    const B = line1.end;
    const C = line2.start;
    const D = line2.end;

    const a1 = B.y - A.y;
    const b1 = A.x - B.x;
    const c1 = (a1 * A.x) + (b1 * A.y);

    const a2 = D.y - C.y;
    const b2 = C.x - D.x;
    const c2 = (a2 * C.x) + (b2 * C.y);

    const determinant = a1 * b2 - a2 * b1;

    if (determinant === 0) {
        // lines are parallel
        return false;
    }

    console.log(`
        a1: ${a1}
        b1: ${b1}
        c1: ${c1}
    `);

    console.log(`
        a2: ${a2}
        b2: ${b2}
        c2: ${c2}
    `);

    console.log(`
        determinant: ${determinant}
    `);

    const x = (b2 * c1 - b1 * c2) / determinant;
    const y = (a1 * c2 - a2 * c1) / determinant;

    return {x, y};
}

console.log(findIntersection(line1, line2));