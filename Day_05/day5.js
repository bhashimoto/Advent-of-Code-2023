var fs = require('fs');
var fileName = './test.txt';
var file = fs.readFileSync(fileName, 'utf-8');
var blocks = file.split('\n\n').map(function (block) { return block.split('\n'); });
blocks[0] = blocks[0][0].split(' ');
blocks[0] = blocks[0].slice(1, blocks[0].length).map(function (num) { return parseInt(num); });
//console.log(blocks[0]);
for (var i = 1; i < blocks.length; ++i) {
    blocks[i] = blocks[i].slice(1, blocks[i].length)
        .filter(function (word) { return word.length > 0; })
        .map(function (row) { return row.split(' ').map(function (num) { return parseInt(num); }); });
    //blocks[i] = blocks[i].slice(0,2);
}
//console.log(blocks);
function buildMap(blocks) {
    var ret = [];
    for (var i = 0; i < blocks.length; ++i) {
        var maps = [];
        for (var j = 0; j < blocks[i][2]; ++j) {
            maps.push([blocks[i][1] + j, blocks[i][0] + j]);
        }
        ret.push.apply(ret, maps);
    }
    return ret;
}
//const maps = blocks.slice(1).map((block) => buildMap(block));
//console.log(maps[1]);
function checkMap(block, seed) {
    for (var i = 0; i < block.length; ++i) {
        console.log("Seed: ".concat(seed, ", new:").concat(block[i][0] + seed, ", in:").concat(block[i][1], ", out: ").concat(block[i][0], ", spread: ").concat(block[i][2]));
        if (seed >= block[i][1] && seed < (block[i][1] + block[i][2])) {
            return block[i][0] + seed - block[i][1];
        }
        else {
            return seed;
        }
    }
}
console.log(checkMap(blocks[1], blocks[0]));
var seeds = blocks[0];
for (var block = 1; block < blocks.length; ++block) {
    var temp = [];
    for (var seed = 0; seed < seeds.length; ++seed) {
        temp.push(checkMap(blocks[block], seeds[seed]));
    }
    seeds = temp;
}
console.log(seeds);
//console.log(Math.min(...seeds));
