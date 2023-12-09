const fs = require('fs');
const fileName = "./input.txt";
const round:number = 2;

const file = fs.readFileSync(fileName, 'utf8');
//console.log(file);
const games = file.split('\r\n').map((game:string) => {
    const mapping = game.split(' ');
    return {
        bet: parseInt(mapping[1]),
        hand: mapping[0],
        handValue: mapValues(mapping[0], round),
        strength: calcStrength(mapping[0], round),
        rank:0,
        winnings:0,
    }
});


const result = calculateWinnings(games);
fs.writeFile('./out.json', JSON.stringify(games), err =>{
    if(err){
        console.error(err);
    }
})
console.log(result);
console.log(games.reduce((acc, curr) => acc + curr.winnings,0));
console.log(`${result === 253473930}, expected 253473930`);


function calculateWinnings(games):number{
    games.sort((a,b) => {
        if(a.strength !== b.strength){
            return b.strength - a.strength;
        } else {
            for(let i = 0; i < a.hand.length; i++){
                if(a.handValue[i] !== b.handValue[i]){
                    return b.handValue[i] - a.handValue[i];
                }
            }
            return 0;
        }
    });
    games.map((game, idx:number, arr) => {
        game.rank = arr.length - idx;
        game.winnings = game.bet*game.rank;
    });
    return games.reduce((acc:number, curr) => acc + curr.bet*curr.rank , 0);
}


function mapValues(hand:string, problem:number):number[]{
    return hand.split('').map((val:string) =>{
        switch(val){
            case 'A':
                return 14;
            case 'K':
                return 13;
            case 'Q':
                return 12;
            case 'J':
                if(problem === 2){
                    return 1;
                } else {
                    return 11;
                };
            case 'T':
                return 10;
            default:
                return parseInt(val);
        }
    });
}

function calcStrength(hand:string, round:number):number {
    var ret:number = 0;
    const counts = hand.split('').reduce((acc, obj) =>{
        if(!acc.has(obj)){
            acc.set(obj, 0);
        }
        acc.set(obj, acc.get(obj) + 1);
        return acc;
    }, new Map());
    
    if (round === 2 && counts.has('J')) {
        const filteredJ = [...counts.entries()].filter((entry) => entry[0] !== 'J');
        //console.log(filteredJ);
        if (filteredJ.length > 0) {
            const highest = filteredJ.reduce((acc, curr) => {
                return curr[1] > acc[1] ? curr : acc
            },['',0]);
            counts.set(highest[0], counts.get(highest[0]) + counts.get('J'));
            //console.log(`Hand: ${hand}, Highest: ${highest}, new count: ${counts.get(highest[0])}`);
            counts.delete('J');
        } else {
            return 6; // hand is JJJJJ
        }
    }
    let countCounts = new Map();
    counts.forEach((value, key, map) => {
        if(!countCounts.has(value)){
            countCounts.set(value, 0);
        }
        countCounts.set(value, countCounts.get(value)+1);
    });
    
    //console.log(countCounts);
    if(countCounts.has(5)) {
        ret =  6;
    } else if(countCounts.has(4)) {
        ret = 5;
    } else if(countCounts.has(3)) {
        if(countCounts.has(2)){
            ret =  4;
        } else {
            ret =  3;
        }
    } else if(countCounts.has(2)) {
        if(parseInt(countCounts.get(2)) === 2){
            ret =  2;
        } else{
            ret =  1;
        }
    } else{ 
        //console.log(`Hand ${hand} has 1`);
    }
    return ret;
}