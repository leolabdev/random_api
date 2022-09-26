const db = require('./DB');
const MersenneTwister19937 = require('random-js/dist/engine/MersenneTwister19937');
const sample = require('random-js/dist/distribution/sample');

// create a Mersenne Twister-19937 that is auto-seeded based on time and other random values
const engine = MersenneTwister19937.autoSeed();

// create a distribution that will consistently produce integers within inclusive range [0, 99].


exports.makeRandomQuery = async () => {

}

function getRandomSQLQuery(tableName, elemCount, minValue, maxValue){
  const randValArr = generateRandIntArr(minValue, maxValue, elemCount);
}

function generateRandIntArr(min, max, elemCount){
  const populationArr = [];
  for(let i=min; i<max; i++)
    populationArr.push(i);

  const distribution = sample(engine, populationArr, elemCount);
  return distribution(engine);
}