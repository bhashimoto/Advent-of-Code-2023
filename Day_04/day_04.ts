const fs = require('fs');
const readline = require('readline');

type game = {
    id:number;
    winning_numbers: number[];
    available_numbers: number[];
    tickets: number;
    wins: number;
}

async function readFile(filename:string):Promise<game[]> {
    const fileStream = fs.createReadStream(filename);

    const rl = readline.createInterface({
        input:fileStream,
        crlfDelay:Infinity
    });

    const games:game[] = [];

    for await (const line of rl){
        const id:number = parseInt(line.slice(line.indexOf(" "), line.indexOf(":")));
        const data:string = line.split(":")[1].trim();
        games.push(
            {
                id: id,
                winning_numbers: data.split('|')[0]
                                        .trim().split(' ')
                                        .map((number) => parseInt(number))
                                        .filter(v => Number.isInteger(v as number)),
                available_numbers: data.split('|')[1]
                                        .trim().split(' ')
                                        .map((number) => parseInt(number))
                                        .filter(v => Number.isInteger(v as number)),
                tickets: 0,
                wins: 0,
            }
        );
        checkWins(games[games.length -1]);
    }

    return games;
    // console.log(games);
}

function checkWins(input:game):void{
    input.wins = input.available_numbers.map((num):number => {
        if(input.winning_numbers.includes(num)){
            return 1;
        }
        return 0;
    }).reduce(((acc, curr) => {return acc + curr}), 0);
}

// problem 1
async function day4_1(fileName:string){
    const games = await readFile(fileName);
    //console.log(games);
    const ret = games.map((game) => {
        return game.available_numbers.map((number):number =>{
            if(game.winning_numbers.includes(number)) {
                return 1;
            }
            //console.log(`Game: ${game.id}, didn't find ${number}`)
            return 0;
        }).reduce((acc, curr) => {
            //console.log(`Adding ${curr}`)
            return acc + curr;
        },0);
    }).reduce((acc, curr) => {
        if(curr > 0){
            return acc + 2**(curr-1);
        } else {
            return acc;
        }
    },0);
    console.log(ret);
};

day4_1('./input.txt');

async function day4_2(fileName:string){
    const games:game[] = await readFile(fileName);
    //console.log(games);
    var total = 0;

    for(let i = games.length-1; i >= 0; --i){
        games[i].tickets = 1 + games.slice(i,i+games[i].wins+1).reduce((acc,curr) => {
            return acc + curr.tickets;
        },0);
        total += games[i].tickets;
        //console.log(`Game ${i+1}: Adding ${games[i].tickets} to total. Current total: ${total}`);
    }
    console.log(total);

}

day4_2('./input.txt');