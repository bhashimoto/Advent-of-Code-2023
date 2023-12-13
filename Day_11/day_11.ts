const test:boolean = false;
const fileName:string = test? './test.txt' : './input.txt';
const fs = require('fs');

const file = fs.readFileSync(fileName, 'utf8');


function problem(expansion:number){
    const mat = file.split('\r\n').map((row:string) => row.split(''));
    const spaces = findEmptySpace(mat);
    const stars = findStars(mat);

    /*
    console.log('spaces');
    console.log(spaces);
    console.log('stars');
    console.log(stars);
    */
    console.log(`calculating distances with expansion ${expansion}`);
    const distances = calculateDistances(stars, spaces, expansion);
    console.log(distances);
}

function expand(mat:string[][]):void{
    // cols
    let width = mat[0].length;
    for (let j = 0; j < width; ++j){
        let star = false;
        for(let i = 0; !star && i < mat.length; ++i){
            if(mat[i][j] === '#'){
                star = true;
            }
        }
        if (!star){
            for(let i = 0; i < mat.length; ++i){
                mat[i].splice(j,0,'.');
            }
            ++j;
            ++width;
        }
    }

    // rows
    let len = mat.length;
    for (let i = 0; i < len; ++i){
        let star = false;
        for(let j = 0;!star && j < mat[i].length; ++j){
            if (mat[i][j] === '#'){
                star = true;
            }
        }
        if (!star){
            const insert = mat[i];
            mat.splice(i,0,insert);
            ++i;
            ++len;
        }
    }
}

function findStars(mat:string[][]):number[][]{
    var ret:number[][] = [];
    for(let i = 0; i < mat.length; ++i) {
        for (let j = 0; j < mat[0].length; ++j) {
            if (mat[i][j] === '#'){
                ret.push([i,j]);
            }
        }
    }

    return ret;
}

function calculateDistances(stars:number[][], spaces:{rows:number[], columns:number[]}, expansion:number=1):number{
    var distances = 0;

    for (let s = 0; s < stars.length; ++s){
        distances += stars.slice(s+1).map((star, idx) => {
            let xDistance = Math.abs(stars[s][1] - star[1]);
            let yDistance = Math.abs(stars[s][0] - star[0]);

            for(let x = 0; x < spaces.columns.length; x++){
                
                if ((stars[s][1] < spaces.columns[x] && spaces.columns[x] < star[1]) || 
                    (star[1] < spaces.columns[x] && spaces.columns[x] < stars[s][1])){
                    xDistance += expansion - 1;
                }
            }

            for(let y = 0; y < spaces.rows.length; y++){
                if ((stars[s][0] < spaces.rows[y] && spaces.rows[y] < star[0]) || 
                    (star[0] < spaces.rows[y] && spaces.rows[y] < stars[s][0])){
                    yDistance += expansion - 1;
                }
            }
            //console.log(`Distance between star ${s+1} and star ${s + idx+2} is ${xDistance + yDistance}`);
            return xDistance + yDistance;

        }).reduce((acc, curr) => acc + curr,0);
    }

    return distances;
}

function findEmptySpace(mat:string[][]):{rows:number[], columns:number[]} {
    const ret = {
        rows: Array<number>(0),
        columns: Array<number>(0),
    }

    //rows
    for(let i = 0; i < mat.length; ++i){
        let hasStar:boolean = false;
        for(let j = 0; j < mat[0].length; ++j) {
            if (mat[i][j] =='#') {
                hasStar = true;
            }
        }
        if (!hasStar){
            ret.rows.push(i);
        }
    }

    // cols
    for(let j = 0; j < mat[0].length; ++j){
        let hasStar:boolean = false;
        for(let i = 0; i < mat.length; ++i) {
            if (mat[i][j] =='#') {
                hasStar = true;
            }
        }
        if (!hasStar){
            ret.columns.push(j);
        }
    }


    return ret;
}


problem(1000000);