var test = false;
var fileName = test ? './test.txt' : './input.txt';
var fs = require('fs');
var file = fs.readFileSync(fileName, 'utf8');
function problem(expansion) {
    var mat = file.split('\r\n').map(function (row) { return row.split(''); });
    var spaces = findEmptySpace(mat);
    var stars = findStars(mat);
    /*
    console.log('spaces');
    console.log(spaces);
    console.log('stars');
    console.log(stars);
    */
    console.log("calculating distances with expansion ".concat(expansion));
    var distances = calculateDistances(stars, spaces, expansion);
    console.log(distances);
}
function expand(mat) {
    // cols
    var width = mat[0].length;
    for (var j = 0; j < width; ++j) {
        var star = false;
        for (var i = 0; !star && i < mat.length; ++i) {
            if (mat[i][j] === '#') {
                star = true;
            }
        }
        if (!star) {
            for (var i = 0; i < mat.length; ++i) {
                mat[i].splice(j, 0, '.');
            }
            ++j;
            ++width;
        }
    }
    // rows
    var len = mat.length;
    for (var i = 0; i < len; ++i) {
        var star = false;
        for (var j = 0; !star && j < mat[i].length; ++j) {
            if (mat[i][j] === '#') {
                star = true;
            }
        }
        if (!star) {
            var insert = mat[i];
            mat.splice(i, 0, insert);
            ++i;
            ++len;
        }
    }
}
function findStars(mat) {
    var ret = [];
    for (var i = 0; i < mat.length; ++i) {
        for (var j = 0; j < mat[0].length; ++j) {
            if (mat[i][j] === '#') {
                ret.push([i, j]);
            }
        }
    }
    return ret;
}
function calculateDistances(stars, spaces, expansion) {
    if (expansion === void 0) { expansion = 1; }
    var distances = 0;
    var _loop_1 = function (s) {
        distances += stars.slice(s + 1).map(function (star, idx) {
            var xDistance = Math.abs(stars[s][1] - star[1]);
            var yDistance = Math.abs(stars[s][0] - star[0]);
            for (var x = 0; x < spaces.columns.length; x++) {
                if ((stars[s][1] < spaces.columns[x] && spaces.columns[x] < star[1]) ||
                    (star[1] < spaces.columns[x] && spaces.columns[x] < stars[s][1])) {
                    xDistance += expansion - 1;
                }
            }
            for (var y = 0; y < spaces.rows.length; y++) {
                if ((stars[s][0] < spaces.rows[y] && spaces.rows[y] < star[0]) ||
                    (star[0] < spaces.rows[y] && spaces.rows[y] < stars[s][0])) {
                    yDistance += expansion - 1;
                }
            }
            //console.log(`Distance between star ${s+1} and star ${s + idx+2} is ${xDistance + yDistance}`);
            return xDistance + yDistance;
        }).reduce(function (acc, curr) { return acc + curr; }, 0);
    };
    for (var s = 0; s < stars.length; ++s) {
        _loop_1(s);
    }
    return distances;
}
function findEmptySpace(mat) {
    var ret = {
        rows: Array(0),
        columns: Array(0),
    };
    //rows
    for (var i = 0; i < mat.length; ++i) {
        var hasStar = false;
        for (var j = 0; j < mat[0].length; ++j) {
            if (mat[i][j] == '#') {
                hasStar = true;
            }
        }
        if (!hasStar) {
            ret.rows.push(i);
        }
    }
    // cols
    for (var j = 0; j < mat[0].length; ++j) {
        var hasStar = false;
        for (var i = 0; i < mat.length; ++i) {
            if (mat[i][j] == '#') {
                hasStar = true;
            }
        }
        if (!hasStar) {
            ret.columns.push(j);
        }
    }
    return ret;
}
problem(1000000);
