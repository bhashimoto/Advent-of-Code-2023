const fs = require('fs');
const fileName = './input.txt';
const round = 1;

const map = new Map();
const file = fs.readFileSync(fileName, 'utf8').split('\r\n');
const instructions = file[0].split('');
const m = file.slice(2).map((row) => row.split(" = "));
m.map((row) => {
    map.set(row[0],{L: row[1].slice(1,4), R: row[1].slice(6,9)});
})
//console.log(map);
//console.log(map);


function r1():number{
    var idx = 0;
    var steps = 0;
    var done = false;
    const size = instructions.length;
    var position = 'AAA';
    var current = map.get('AAA');
    while(!done){
        //console.log(`step ${steps} with id:${idx} at ${position} going ${instructions[idx]} to ${current[instructions[idx]]}`)
        steps++;
        if(instructions[idx] === "L"){
            position = current.L;
            current = map.get(current.L);
        } else {
            position = current.R
            current= map.get(current.R)
        }

        if (position === 'ZZZ'){
            done = true;

        }
        idx = (idx + 1)%size;
    }
    return steps;
}
const start:string[] = m.filter((row) => row[0][2] === 'A').map((row) => row[0]);
console.log("start: ", start);

function r2():number {
    var pos:string[] = start;
    var time:number[] = pos.map((row) => 0);

    var steps = 0;
    var done = false;
    var idx = 0;
    const size = instructions.length;

    while(!done){
        steps++;
        
        //console.log(`step: ${steps}\t idx: ${idx}\t moving: ${instructions[idx]}\t pos: ${pos}`);

        pos = pos.map((row) => map.get(row)[instructions[idx]]);
        
        for(let i = 0; i < pos.length; ++i){
            if(pos[i][2] === 'Z'){
                time[i] = Math.max(time[i], steps);
                console.log(time);
            }
            
        }

        idx = (idx + 1)%size;

        if (time.reduce((acc, curr) => acc*curr, 1)){
            done = true;
            steps = time.reduce((acc, curr) => lcm(acc, curr),1);
        }
    }


    return steps;
}

function gcd(a:number, b:number):number {
    if( b===0){
        return a;
    }
    return gcd(b, a%b);
}

function lcm(a:number, b:number):number {
    return a*b/gcd(a,b);
}


console.log(r2());