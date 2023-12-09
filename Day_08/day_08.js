var fs = require('fs');
var fileName = './input.txt';
var round = 1;
var map = new Map();
var file = fs.readFileSync(fileName, 'utf8').split('\r\n');
var instructions = file[0].split('');
var m = file.slice(2).map(function (row) { return row.split(" = "); });
m.map(function (row) {
    map.set(row[0], { L: row[1].slice(1, 4), R: row[1].slice(6, 9) });
});
//console.log(map);
//console.log(map);
function r1() {
    var idx = 0;
    var steps = 0;
    var done = false;
    var size = instructions.length;
    var position = 'AAA';
    var current = map.get('AAA');
    while (!done) {
        //console.log(`step ${steps} with id:${idx} at ${position} going ${instructions[idx]} to ${current[instructions[idx]]}`)
        steps++;
        if (instructions[idx] === "L") {
            position = current.L;
            current = map.get(current.L);
        }
        else {
            position = current.R;
            current = map.get(current.R);
        }
        if (position === 'ZZZ') {
            done = true;
        }
        idx = (idx + 1) % size;
    }
    return steps;
}
var start = m.filter(function (row) { return row[0][2] === 'A'; }).map(function (row) { return row[0]; });
console.log("start: ", start);
function r2() {
    var pos = start;
    var time = pos.map(function (row) { return 0; });
    var steps = 0;
    var done = false;
    var idx = 0;
    var size = instructions.length;
    while (!done) {
        steps++;
        //console.log(`step: ${steps}\t idx: ${idx}\t moving: ${instructions[idx]}\t pos: ${pos}`);
        pos = pos.map(function (row) { return map.get(row)[instructions[idx]]; });
        for (var i = 0; i < pos.length; ++i) {
            if (pos[i][2] === 'Z') {
                time[i] = Math.max(time[i], steps);
                console.log(time);
            }
        }
        idx = (idx + 1) % size;
        if (time.reduce(function (acc, curr) { return acc * curr; }, 1)) {
            done = true;
            steps = time.reduce(function (acc, curr) { return lcm(acc, curr); }, 1);
        }
    }
    return steps;
}
function gcd(a, b) {
    if (b === 0) {
        return a;
    }
    return gcd(b, a % b);
}
function lcm(a, b) {
    return a * b / gcd(a, b);
}
console.log(r2());
