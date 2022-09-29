const Random = require("random-js").Random;
const {MersenneTwister19937} = require("random-js");

const random = new Random(MersenneTwister19937.autoSeed());

exports.getRandomSQLQuery = (tableName, columnName, isColumnString, columnValues) => {
  if(columnValues != null && columnValues.length > 0){
    let query = `SELECT * FROM ${tableName} WHERE `;
    for(let i=0; i<columnValues.length; i++){
      if(isColumnString)
        query += `${columnName}="${columnValues[i]}" OR `;
       else
        query += `${columnName}=${columnValues[i]} OR `;
    }

    query = query.slice(0, -4);
    return query;
  }

  return null;
}

exports.generateRandIntArr = (min, max, elemCount) => {
  if(min != null && max != null && min >= 0 && max >= 0 && min < max && elemCount > 0 && elemCount <= 100000000){
    const range = max-min+1;
    const sameArrCount = Math.floor(elemCount/range);

    const populationArr = [];
    let result = [];
    for(let i=min; i<=max; i++)
      populationArr.push(i);

    if(sameArrCount >= 1){
      for(let i=0; i<sameArrCount; i++)
        result.push(...random.sample(populationArr, range));

      const itemsLeft = elemCount-result.length;
      if(itemsLeft > 0){
        for(let i=0; i<itemsLeft; i++)
          result.push(random.integer(min, max));
      }
    }else
      result.push(...random.sample(populationArr, elemCount));

    return result;
  }

  return null;
}