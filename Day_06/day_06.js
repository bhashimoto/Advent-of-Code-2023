var fs = require('fs');
var filename = './input.txt';
var file = fs.readFileSync(filename, 'utf-8');
var _a = file.split('\r\n')
    .map(function (line) { return (line.split(':')[1]
    .trim().split(' ')
    .filter(function (val) { return val.length > 0; })
    .map(function (item) { return parseInt(item); })); }), times = _a[0], distances = _a[1];
function part1(times, distances) {
    var winCount = [];
    for (var i = 0; i < times.length; ++i) {
        var wins = 0;
        for (var t = 0; t < times[i]; ++t) {
            if (t * (times[i] - t) > distances[i]) {
                ++wins;
            }
        }
        winCount.push(wins);
    }
    console.log(winCount);
    console.log(winCount.reduce(function (acc, curr) { return acc * curr; }, 1));
}
function part2(times, distances) {
    var newTime = parseInt(times.map(function (time) { return time.toString(); }).reduce(function (acc, curr) { return acc + curr; }));
    var newDistance = parseInt(distances.map(function (distance) { return distance.toString(); }).reduce(function (acc, curr) { return acc + curr; }));
    part1([newTime], [newDistance]);
}
part1(times, distances);
part2(times, distances);
