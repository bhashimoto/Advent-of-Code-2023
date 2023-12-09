const fs = require('fs');
const fileName = './input.txt';

const file = fs.readFileSync(fileName,'utf-8');
var blocks = file.split('\r\n\r\n').map((block:string) => block.split('\r\n'));

blocks[0] = blocks[0][0].split(' ');
blocks[0] = blocks[0].slice(1,blocks[0].length).map((num:string) => parseInt(num));
//console.log(blocks);

for(let i = 1; i < blocks.length; ++i){
	blocks[i] = blocks[i].slice(1,blocks[i].length)
				.filter((word:string) => word.length > 0)
				.map((row:string) => row.split(' ').map((num) => parseInt(num)));
	//blocks[i] = blocks[i].slice(0,2);
}

//console.log(blocks);

//const maps = blocks.slice(1).map((block) => buildMap(block));
//console.log(maps[1]);
function checkMap(block:number[][], seeds:number[]):number[]{
	//console.log(`Calling checkMap with:\n\tblock:${block}\n\tseeds:${seeds}`);
	var ret:number[] = [];
	for (let seed of seeds){
		let match = false;
		for (let mapping of block){
			if (!match && mapping[1] <= seed && seed < (mapping[1] + mapping[2])){
				//console.log(`Seed ${seed} between ${mapping[1]} and ${mapping[1] + mapping[2]}`);
				ret.push(mapping[0] + seed - mapping[1]);
				match = true;
			} 
		}
		if (!match){
			ret.push(seed);
		}
	}	

	return ret;
}

function part1(){
	let seeds: number[] = blocks[0];
	for (let i = 1; i < blocks.length; ++i) {
		//console.log(seeds);
		seeds = checkMap(blocks[i], seeds);

	}
	//console.log(seeds);
	return Math.min(...seeds);
}


function part2(){
	let min:number = Infinity;
	for(let i = 0; i < blocks[0].length; i+=2){
		for(let j = 0; j < blocks[0][i+1]; ++j){
			let seed:number[] = [blocks[0][i] + j];
			for(let block = 1; block < blocks.length; ++block){
				seed = checkMap(blocks[block], seed);
			}
			min = Math.min(min, seed[0]);
		}
		console.log(`Seed: ${blocks[0][i]}, current min:${min}`);
	}
	
	return min;
}



//console.log(part_one());
console.log(part1());