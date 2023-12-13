const test = false;
const problem = 1;
const fileName = test? './test4.txt' : './input.txt';

const fs = require('fs');
let file = fs.readFileSync(fileName, 'utf8').toString().split('\r\n').map((row) => row.split(''));

//console.log(file);

function findStart(matrix:string[]):number[] {
    for(let i = 0; i < matrix.length; ++i){
        const j = matrix[i].indexOf('S');
        if (j !== -1){
            return [i, j];
        }
    }
    return [-1, -1];
}

function findConnected(m:string[], [i, j]:number[]):number[][]{
    const ret:number[][] = [];

    if (i > 0 && (m[i-1][j] == "F" || m[i-1][j] == "7" || m[i-1][j] == "|")) {
        ret.push([i-1, j]);
    }
    if (i < m.length && (m[i+1][j] == "L" || m[i+1][j] == "J" || m[i+1][j] == "|")) {
        ret.push([i+1, j]);
    }
    if(j > 0 && (m[i][j-1] == 'L' || m[i][j-1] == 'F' || m[i][j-1] === "-")) {
        ret.push([i, j-1]);
    }
    if(j < m[0].length && (m[i][j+1] == '7' || m[i][j+1] === 'J' || m[i][j+1] === "-")) {
        ret.push([i,j+1]);
    }

    return ret;
}

function walk(m:string[], [i, j]:number[], entrance:number[]):number[][]{
    const shape = m[i][j];

    if (shape === 'S' || shape === 'O'){
        console.log('Finished');
        return [[i,j],[i,j]];
    }

    if (shape === "|"){
        if(entrance[0] < i){
            return [[i+1, j],[i,j]];
        } else {
            return [[i-1, j],[i,j]];
        }
    }
    if (shape === "L"){
        if (entrance[0] < i) {
            return [[i, j+1],[i,j]];
        } else {
            return [[i-1, j],[i,j]];
        }
    }
    if (shape === "J"){
        if (entrance[1] < j){
            return [[i-1, j],[i,j]];
        } else {
            return [[i, j-1],[i,j]];
        }
    }
    if (shape === "-") {
        if (entrance[1] > j){
            return [[i, j-1],[i,j]];
        } else {
            return [[i, j+1],[i,j]];
        }
    }
    if (shape === "7") {
        if (entrance[1] < j){
            return [[i+1, j],[i,j]];
        } else {
            return [[i, j-1],[i,j]];
        }
    }
    if (shape === "F") {
        if (entrance[1] > j) {
            return [[i+1, j],[i,j]];
        } else {
            return [[i, j+1],[i,j]];
        }
    }
    

    return [[-1, -1],[-1,-1]];

}

const start = findStart(file);
console.log("start",start);
const connected = findConnected(file, start);
console.log("connected", connected);

var curr = start;
var next = findConnected(file, curr)[0];
var steps = 1;
function p1() {
    while (file[next[0]][next[1]] !== 'S') {

        [next, curr] = walk(file, next, curr);
        //console.log(`current: [${curr}]\tgoing to: [${next}]\tnext character: ${file[next[0]][next[1]]}`);
        steps++;
    }
    console.log(`round-trip: ${steps} -- max: ${steps / 2}`);
}

function p2(){
    while(file[next[0]][next[1]] !== 'O') {
        file[curr[0]][curr[1]] = 'O';
        //console.log(file[curr[0]][curr[1]]);
        [next, curr] = walk(file, next, curr);
        //console.log(`current: [${curr}]\tgoing to: [${next}]\tnext character: ${file[next[0]][next[1]]}`);
        steps++;
    }
    file[curr[0]][curr[1]] = 'O';
    const wFile:string = file.map((row:string[]) => row.join('').replace(/[^O\.]/g,'.')).join('\n');
    fs.writeFile('./out.txt', wFile, err => {
        if(err){
            console.error(err);
        }
    })
    file = wFile.split('\n');
    var count = 0;
    for(let i = 1; i < file.length; i++){
        var check = false;
        for(let j = 1; j < file[0].length; ++j){
            if(!check && file[i][j] !== '.'){
                check = true;
            } else if(check && file[i][j] === '.'){
                if (isInside(file,[i,j])){
                    count++;
                }
            }
        }
    }
    console.log(count);
    //console.log(file);
}

function isInside(m:string[][],[i,j]:number[]):boolean {
    const maxWidth= m[0].length;
    const maxHeight = m.length;
    var windingsX = 0;
    var windingsY = 0;
    for(let x = j; x < maxWidth; ++x){
        if (m[i][x] === 'O'){
            windingsX++;
        }
    }
    for(let y = i; y < maxHeight; ++y){
        if (m[y][j] === 'O'){
            windingsX++;
        }
    }

    return (windingsX % 2 !== 0) // && (windingsY %2 !== 0);
}

p2();