import fs from 'fs';
const filename = './input.txt';

const file = fs.readFileSync(filename, 'utf-8');
const [times, distances] = file.split('\r\n')
                                .map((line:string) => (line.split(':')[1]
                                                    .trim().split(' ')
                                                    .filter((val:string) => val.length >0)
                                                    .map((item:string) => parseInt(item))
                                                ));

function part1(times:number[], distances:number[]){
    const winCount:number[] = [];
    for(let i = 0; i < times.length; ++i){
        let wins = 0;
        for(let t = 0; t < times[i]; ++t){
            if(t*(times[i]-t) > distances[i]){
                ++wins;
            }
        }
        winCount.push(wins);
    }
    console.log(winCount);
    console.log(winCount.reduce((acc,curr) => acc*curr, 1));
}

function part2(times:number[], distances:number[]){
    const newTime = parseInt(times.map((time) => time.toString()).reduce((acc,curr) => acc+curr));
    const newDistance = parseInt(distances.map((distance) => distance.toString()).reduce((acc,curr) => acc+curr));

    part1([newTime], [newDistance]);
}

part1(times,distances);
part2(times, distances);