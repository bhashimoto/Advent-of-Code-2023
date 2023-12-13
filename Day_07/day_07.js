var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var fs = require('fs');
var fileName = "./input.txt";
var round = 2;
var file = fs.readFileSync(fileName, 'utf8');
//console.log(file);
var games = file.split('\r\n').map(function (game) {
    var mapping = game.split(' ');
    return {
        bet: parseInt(mapping[1]),
        hand: mapping[0],
        handValue: mapValues(mapping[0], round),
        strength: calcStrength(mapping[0], round),
        rank: 0,
        winnings: 0,
    };
});
var result = calculateWinnings(games);
console.log(result);
console.log("".concat(result === 253473930, ", expected 253473930"));
fs.writeFile('./out.json', JSON.stringify(games), function (err) {
    if (err) {
        console.error(err);
    }
});
function calculateWinnings(games) {
    games.sort(function (a, b) {
        if (a.strength !== b.strength) {
            return b.strength - a.strength;
        }
        else {
            for (var i = 0; i < a.handValue.length; i++) {
                if (a.handValue[i] !== b.handValue[i]) {
                    return b.handValue[i] - a.handValue[i];
                }
            }
            return 0;
        }
    });
    games.map(function (game, idx, arr) {
        game.rank = arr.length - idx;
        game.winnings = game.bet * game.rank;
    });
    return games.reduce(function (acc, curr) { return acc + curr.bet * curr.rank; }, 0);
}
function mapValues(hand, problem) {
    return hand.split('').map(function (val) {
        switch (val) {
            case 'A':
                return 14;
            case 'K':
                return 13;
            case 'Q':
                return 12;
            case 'J':
                if (problem === 2) {
                    return 0;
                }
                else {
                    return 11;
                }
                ;
            case 'T':
                return 10;
            default:
                return parseInt(val);
        }
    });
}
function calcStrength(hand, round) {
    var ret = 0;
    var counts = hand.split('').reduce(function (acc, obj) {
        if (!acc.has(obj)) {
            acc.set(obj, 0);
        }
        acc.set(obj, acc.get(obj) + 1);
        return acc;
    }, new Map());
    if (round === 2 && counts.has('J')) {
        var filteredJ = __spreadArray([], __read(counts.entries()), false).filter(function (entry) { return entry[0] !== 'J'; });
        //console.log(filteredJ);
        if (filteredJ.length > 0) {
            var highest = filteredJ.reduce(function (acc, curr) {
                return curr[1] > acc[1] ? curr : acc;
            }, ['', 0]);
            counts.set(highest[0], counts.get(highest[0]) + counts.get('J'));
            //console.log(`Hand: ${hand}, Highest: ${highest}, new count: ${counts.get(highest[0])}`);
            counts.delete('J');
        }
        else {
            return 6; // hand is JJJJJ
        }
    }
    var countCounts = new Map();
    counts.forEach(function (value, key, map) {
        if (!countCounts.has(value)) {
            countCounts.set(value, 0);
        }
        countCounts.set(value, countCounts.get(value) + 1);
    });
    //console.log(countCounts);
    if (countCounts.has(5)) {
        ret = 6;
    }
    else if (countCounts.has(4)) {
        ret = 5;
    }
    else if (countCounts.has(3)) {
        if (countCounts.has(2)) {
            ret = 4;
        }
        else {
            ret = 3;
        }
    }
    else if (countCounts.has(2)) {
        if (countCounts.get(2) === 2) {
            ret = 2;
        }
        else {
            ret = 1;
        }
    }
    return ret;
}
