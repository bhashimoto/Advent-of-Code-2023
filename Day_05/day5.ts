const fs = require('fs');
const fileName = './test.txt';

const file = fs.readFileSync(fileName,'utf-8');
const blocks = file.split('\n\n').map((block) => block.split('\n'));

blocks[0] = blocks[0][0].split(' ');
blocks[0] = blocks[0].slice(1,blocks[0].length).map((num) => parseInt(num));
//console.log(blocks[0]);

for(let i = 1; i < blocks.length; ++i){
	blocks[i] = blocks[i].slice(1,blocks[i].length)
				.filter((word) => word.length > 0)
				.map((row) => row.split(' ').map((num) => parseInt(num)));
	//blocks[i] = blocks[i].slice(0,2);
}

//console.log(blocks);

function buildMap(blocks) {
	const ret = [];
	for (let i = 0; i < blocks.length; ++i){
		const maps = [];
		for(let j = 0; j < blocks[i][2]; ++j){
			maps.push([blocks[i][1]+j, blocks[i][0]+j]);
		}
		ret.push(...maps);
	}
	return ret;
}

//const maps = blocks.slice(1).map((block) => buildMap(block));
//console.log(maps[1]);
function checkMap(block, seed){
	for(let i = 0; i < block.length; ++i){
		console.log(`Seed: ${seed}, new:${block[i][0]+seed}, in:${block[i][1]}, out: ${block[i][0]}, spread: ${block[i][2]}`);
		if(seed >= block[i][1] && seed < (block[i][1] + block[i][2])){
			return block[i][0] + seed - block[i][1];
		} else {
			return seed;
		}
	}
}

console.log(checkMap(blocks[1],blocks[0]));

let seeds = blocks[0];
for (let block = 1; block < blocks.length; ++block){
	let temp = [];
	for (let seed = 0; seed < seeds.length; ++seed){
		temp.push(checkMap(blocks[block],seeds[seed]));
	}
	seeds = temp;
}
console.log(seeds);
//console.log(Math.min(...seeds));

