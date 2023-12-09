var fs = require('fs');
var fileName = './input.txt';
var file = fs.readFileSync(fileName, 'utf-8');
var blocks = file.split('\r\n\r\n').map(function (block) { return block.split('\r\n'); });
blocks[0] = blocks[0][0].split(' ');
blocks[0] = blocks[0].slice(1, blocks[0].length).map(function (num) { return parseInt(num); });
//console.log(blocks);
for (var i = 1; i < blocks.length; ++i) {
    blocks[i] = blocks[i].slice(1, blocks[i].length)
        .filter(function (word) { return word.length > 0; })
        .map(function (row) { return row.split(' ').map(function (num) { return parseInt(num); }); });
    //blocks[i] = blocks[i].slice(0,2);
}
//console.log(blocks);
//const maps = blocks.slice(1).map((block) => buildMap(block));
//console.log(maps[1]);
function checkMap(block, seeds) {
    //console.log(`Calling checkMap with:\n\tblock:${block}\n\tseeds:${seeds}`);
    var ret = [];
    for (var _i = 0, seeds_1 = seeds; _i < seeds_1.length; _i++) {
        var seed = seeds_1[_i];
        var match = false;
        for (var _a = 0, block_1 = block; _a < block_1.length; _a++) {
            var mapping = block_1[_a];
            if (!match && mapping[1] <= seed && seed < (mapping[1] + mapping[2])) {
                //console.log(`Seed ${seed} between ${mapping[1]} and ${mapping[1] + mapping[2]}`);
                ret.push(mapping[0] + seed - mapping[1]);
                match = true;
            }
        }
        if (!match) {
            ret.push(seed);
        }
    }
    return ret;
}
function part1() {
    var seeds = blocks[0];
    for (var i = 1; i < blocks.length; ++i) {
        //console.log(seeds);
        seeds = checkMap(blocks[i], seeds);
    }
    //console.log(seeds);
    return Math.min.apply(Math, seeds);
}
function part2() {
    var min = Infinity;
    for (var i = 0; i < blocks[0].length; i += 2) {
        for (var j = 0; j < blocks[0][i + 1]; ++j) {
            var seed = [blocks[0][i] + j];
            for (var block = 1; block < blocks.length; ++block) {
                seed = checkMap(blocks[block], seed);
            }
            min = Math.min(min, seed[0]);
        }
        console.log("Seed: ".concat(blocks[0][i], ", current min:").concat(min));
    }
    return min;
}
//console.log(part_one());
console.log(part1());
