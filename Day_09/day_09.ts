const fs = require('fs');
const fileName = './input.txt';

const file = fs.readFileSync(fileName,'utf8').split('\r\n').map((row) => row.split(' ').map((num) => parseInt(num)));
//console.log(file);

function predict(arr:number[]):number {
    if (arr.reduce((acc, curr) => acc+curr, 0) === 0){
        return 0;
    }
    const diffs:number[] = [];
    for (let i = 0; i < arr.length-1; ++i){
        diffs.push(arr[i+1] - arr[i]);
    }
    return arr[arr.length - 1] + predict(diffs);
}

function predict2(arr:number[]):number {
    if(arr.reduce((acc, curr) => acc+curr,0) === 0){
        return 0;
    }
    const diffs:number[] = [];
    for(let i = 0; i < arr.length - 1; ++i){
        diffs.unshift(arr[i+1] - arr[i]);
        
    }
    return arr[0] - predict(diffs);
}

//console.log(predict(file[0]));
console.log(file.reduce((acc, curr) => acc + predict(curr), 0));
console.log(file.reduce((acc, curr) => acc + predict2(curr), 0));
