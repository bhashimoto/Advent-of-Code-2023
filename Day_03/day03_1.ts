async function day3_1(fileName:string):Promise<number> {
    const { open } = require('node:fs/promises');
    const file = await open(fileName);

    var ret:number = 0;
    const matrix:string[] = [];

    for await(const line of file.readLines()){
        matrix.push("." + line + ".");
    }

    var dummy = "";
    for(let i = 0; i < matrix[0].length; ++i){
        dummy += '.';
    }
    matrix.push(dummy);
    matrix.unshift(dummy);

    const height = matrix.length; // wrapped two dummy lines at input file
    const width = matrix[0].length;
    for(let i = 0; i < height; ++i){
        for(let j = 0; j < width; ++j){
            if(isNumber(matrix[i][j])){
                const [val, index] = findNumber(matrix, i, j);
                j = index;
                ret += val;
            }
        }
    }

    //console.log(matrix);
    return ret;
}

async function day3_2(fileName:string):Promise<number> {
    const { open } = require('node:fs/promises');
    const file = await open(fileName);

    var ret:number = 0;
    const matrix:string[] = [];

    for await(const line of file.readLines()){
        matrix.push("." + line + ".");
    }

    var dummy = "";
    for(let i = 0; i < matrix[0].length; ++i){
        dummy += '.';
    }
    matrix.push(dummy);
    matrix.unshift(dummy);

    console.log("file loaded");
    const height = matrix.length; // wrapped two dummy lines at input file
    const width = matrix[0].length;
    for(let i = 0; i < height; ++i){
        for(let j = 0; j < width; ++j){
            if(matrix[i][j] === '*'){
                const ratio = calculateRatio(matrix, i, j);
                console.log(`Gear at (${i}, ${j}) with ratio ${ratio}`);
                ret += ratio;
            }
        }
    }

    //console.log(matrix);
    return ret;
}

function calculateRatio(matrix:string[], i:number, j:number):number {
    var ret = 0;
    const numbers:number[] = [];
    //look left
    if(isNumber(matrix[i][j-1])){
        let y = 1;
        while(isNumber(matrix[i][j-y-1])){
            y++;
        }
        numbers.push(getNumber(matrix,i,j-y)[0]);
    }

    //look right
    if(isNumber(matrix[i][j+1])){
        numbers.push(getNumber(matrix, i, j+1)[0]);
    }

    // look up
    let up = findNumberInRow(matrix, i-1, j);
    if(up.length !== 0 && up[0] !== 0){
        numbers.push(...up);
    }

    // look down
    let down = findNumberInRow(matrix, i+1, j);
    if(down.length !== 0 && down[0] !== 0){
        numbers.push(...down);
    }

    console.log(numbers);
    if(numbers.length === 2){
        ret = numbers.reduce((acc, curr) => acc*curr);
    }

    return ret;
}

function getNumber(matrix:string[], i:number, j:number):[val:number, index:number]{
    let val = 0;
    let digits = 0;
    while(isNumber(matrix[i][j + digits])){
        val = 10*val + parseInt(matrix[i][j + digits]);
        ++digits;
    }
    return [val, j + digits];
}

function findNumberInRow(matrix:string[], i:number, j:number):number[]{
    var ret:number[] = [];
    if(isNumber(matrix[i][j-1])){
        let start = j-1;
        while(isNumber(matrix[i][start - 1])){
            start--;
        }
        let [val, index] = getNumber(matrix, i, start);
        ret.push(val);
        if(index <= j){
            if(isNumber(matrix[i][j+1])){
                ret.push(getNumber(matrix, i, j+1)[0]);
            }
        }
    } else if(isNumber(matrix[i][j])){
        ret.push(getNumber(matrix, i, j)[0]);
    } else {
        ret.push(getNumber(matrix, i, j+1)[0]);
    }

    return ret;
}

function findNumber(matrix:string[], i:number, j:number):[val:number, index:number]{
    let val = 0;
    let digits = 0;
    while(isNumber(matrix[i][j + digits])){
        val = 10*val + parseInt(matrix[i][j + digits]);
        ++digits;
    }

    // check neighbouring special characters
    var valid:boolean = false;
    // above and below
    for(let x = j-1; x <= j + digits; ++x){
        if(matrix[i-1][x] !== '.' && !isNumber(matrix[i-1][x])){
            valid = true;
        }
        if (matrix[i + 1][x] !== '.' && !isNumber(matrix[i + 1][x])) {
            valid = true;
        }
    }
    // left and right
    if (matrix[i][j-1] !== '.' && !isNumber(matrix[i][j-1])) {
        valid = true;
    }
    if (matrix[i][j+digits] !== '.' && !isNumber(matrix[i][j+digits])) {
        valid = true;
    }

    if(!valid){
        val = 0;
    } else{
        //console.log(val);
    }
    return [val, j + digits];
}

function isNumber(c:string):boolean {
    return c >= '0' && c <= '9';
}

day3_1('./input.txt').then((val) => {
    console.log(val);
});

day3_2('./test.txt').then((val) => {
    console.log(val);
})

day3_2('./input.txt').then((val) => {
    console.log(val);
})