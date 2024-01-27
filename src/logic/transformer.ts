export interface Accumulators {
    [index: string]: string|number,
    
}
export interface Level {   
    [index: string]: Level|any
    rows?: any[],
    accumulators?:Accumulators
}

export interface Result {
    propName: string,
    value: number|string
}

/**
 * Is run after level rows are collected
 * should add property do level object with accumulated value
 */
export interface AccumulatorFunction {
    (level: Level): Result
}


/**
 * 
 */
export interface Specification{
    propName: string,
    accumulators?: AccumulatorFunction[],
    next?: Specification
}

class Transformer {
    transform(rows:any[], specs:Specification):Level{  
        // root level
        const level:Level = {
            rows: rows
        }      
        // iterate in depth along with specs
        this._level(level, specs);

        return level;
    }

    /**
     * @returns 
     */
    _level(currentLevel: Level, currentSpecs: Specification){
                  
        // if(currentSpecs.propName){
        // get distinct values in propName column
        const distinctValues = currentLevel.rows!.map(item=>item[currentSpecs.propName!]).filter((value, index, array)=>{return array.indexOf(value) === index});

        distinctValues.forEach(key=>{
            // get rows matching this key in column propName
            const rowsWithKeyValueInPropCol = currentLevel.rows!.filter(item=>item[currentSpecs.propName!]==key);
                        
            currentLevel[key] = {
                rows: rowsWithKeyValueInPropCol
            }

            if(currentSpecs.accumulators&&currentSpecs.accumulators.length>0){
                currentSpecs.accumulators.forEach(accumulator=>{
                    const result = accumulator(currentLevel[key]);
                    if(!currentLevel[key].accumulators)
                        currentLevel[key].accumulators = {}
    
                    currentLevel[key].accumulators[result.propName] = result.value
                })
            }

            if(currentSpecs.next){                    
                this._level(currentLevel[key], currentSpecs.next!);
            }
            
            
        })
        // }
          
        
        // if(currentSpecs.accumulators&&currentSpecs.accumulators.length>0){
        //     currentSpecs.accumulators.forEach(accumulator=>{
        //         const result = accumulator(currentLevel);
        //         if(!currentLevel.accumulators)
        //             currentLevel.accumulators = {}

        //         currentLevel.accumulators[result.propName] = result.value
        //     })
        // }
    }
}

const transformer = new Transformer();
export {transformer};