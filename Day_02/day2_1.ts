async function day2_1(fileName:string):Promise<number> {
    const limit = {
        'red': 12,
        'green': 13,
        'blue': 14
    }
    
    const { open } = require('node:fs/promises');
    const file = await open(fileName);

    var ret = 0;

    for await (const line of file.readLines()) {
        const gameId:number = parseInt(line.slice(5, line.indexOf(':')));
        const games = line.slice(line.indexOf(":")+2).split(';');

        let validGame:boolean = games.map((game) => {
            const colors = game.trim().split(',');
            return colors.map((color) => {
                const result = color.trim().split(' ');
                return result[0] <= limit[result[1]];
            }).reduce((res, curr) => res && curr);
        }).reduce((res, curr) => res && curr);
       
        if(validGame){
            ret += gameId;
        }
    }

    console.log(ret);
    return ret;
}

day2_1('./input.txt');