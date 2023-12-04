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
            if(matrix[i][j] >= '0' && matrix[i][j] <= '9'){
                const [val, index] = findNumber(matrix, i, j);
                j = index;
                ret += val;
            }
        }
    }

    //console.log(matrix);
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