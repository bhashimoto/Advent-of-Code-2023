async function solve():Promise<number> {

    const { open } = require('node:fs/promises');
    
    return await (async () => {
        const file = await open('./input.txt');

        var total = 0;
        for await (const line of file.readLines()) {
            let right = '';
            let left = '';
            for(let i = 0; i < line.length && left === ''; ++i) {
                if(line[i] >= '0' && line[i] <= '9') {
                    left = line[i];
                } else {
                    left = match_word(line.slice(i));
                }
            }
            for(let i = line.length-1; i >= 0 && right === ''; --i) {
                if(line[i] >= '0' && line[i] <= '9') {
                    right = line[i];
                } else {
                    right = match_word(line.slice(i));
                }
            }
            console.log(left + right);
            total += parseInt(left + right);
        }
        console.log(total);
        return total;
    })();
}

function match_word(input:string): string {
    if(input.indexOf('one') === 0) {
        return '1';
    } else if(input.indexOf('two') === 0) {
        return '2';
    } else if(input.indexOf('three') === 0) {
        return '3';
    } else if(input.indexOf('four') === 0) {
        return '4';
    } else if(input.indexOf('five') === 0) {
        return '5';
    } else if(input.indexOf('six') === 0) {
        return '6';
    } else if(input.indexOf('seven') === 0) {
        return '7';
    } else if(input.indexOf('eight') === 0) {
        return '8';
    } else if(input.indexOf('nine') === 0) {
        return '9';
    } else {
        return '';
    }
}

solve();