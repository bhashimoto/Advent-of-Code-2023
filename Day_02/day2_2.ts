async function day2_2(fileName:string):Promise<number> {
    const limit = {
        'red': 12,
        'green': 13,
        'blue': 14
    }
    
    const { open } = require('node:fs/promises');
    const file = await open(fileName);

    var ret = 0;

    for await (const line of file.readLines()) {
        const game = line.slice(line.indexOf(":")+2).split(';');

        const mins = game.map((round) => {
            const colors = round.trim().split(',');
            
            const elements = {
                'red': 0,
                'green': 0,
                'blue': 0,
            }

            for(let i = 0; i < colors.length; ++i){
                const color = colors[i].trim().split(' ');
                elements[color[1]] = color[0];
            }
            return elements;
        }).reduce((acc, curr) => {
            return {
                'red': Math.max(acc['red'], curr['red']),
                'green': Math.max(acc['green'], curr['green']),
                'blue': Math.max(acc['blue'], curr['blue']),
            }
        });
        ret += mins['red'] * mins['green'] * mins['blue'];
    }

    console.log(ret);
    return ret;
}

day2_2('./input.txt');