/**
 * Convert string to string[]
 * @param string
 * @returns {null|*[]}
 * @example
 *  convertStringToArr("John,Petr,Lauri")
 *  return ['John','Petr',''Lauri]
 */

export const convertStringToArr = (string) => {
    if(string != null){
        let stringArrRaw = [...string];
        let stringStart = 0, stringEnd = stringArrRaw.length-1;
        while(stringArrRaw[stringStart] === ' ')
            stringStart++;
        while(stringArrRaw[stringEnd] === ' ')
            stringEnd--;
        let stringArr = stringArrRaw.slice(stringStart, stringEnd+1);

        const result = [];
        let elemStartIndex = 0;
        for(let i=0; i<stringArr.length; i++){
            if(stringArr[i] === ','){
                const elem = stringArr.slice(elemStartIndex, i).join('');
                result.push(elem);
                elemStartIndex = i+1;
            }

            if(stringArr[i] === ',' && stringArr[i+1] === ' ')
                elemStartIndex++;

            if(i === stringArr.length-1){
                const elem = stringArr.slice(elemStartIndex, i+1).join('');
                result.push(elem);
            }
        }

        return result;
    }

    return null;
}
