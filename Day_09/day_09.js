var fs = require('fs');
var fileName = './input.txt';
var file = fs.readFileSync(fileName, 'utf8').split('\r\n').map(function (row) { return row.split(' ').map(function (num) { return parseInt(num); }); });
//console.log(file);
function predict(arr) {
    if (arr.reduce(function (acc, curr) { return acc + curr; }, 0) === 0) {
        return 0;
    }
    var diffs = [];
    for (var i = 0; i < arr.length - 1; ++i) {
        diffs.push(arr[i + 1] - arr[i]);
    }
    return arr[arr.length - 1] + predict(diffs);
}
function predict2(arr) {
    if (arr.reduce(function (acc, curr) { return acc + curr; }, 0) === 0) {
        return 0;
    }
    var diffs = [];
    for (var i = 0; i < arr.length - 1; ++i) {
        diffs.unshift(arr[i + 1] - arr[i]);
    }
    return arr[0] - predict(diffs);
}
//console.log(predict(file[0]));
console.log(file.reduce(function (acc, curr) { return acc + predict(curr); }, 0));
console.log(file.reduce(function (acc, curr) { return acc + predict2(curr); }, 0));
