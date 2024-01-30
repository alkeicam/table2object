/**
 * Holds multiple accumulated values on Level object
 */
export interface Accumulators {
    [index: string]: string|number,
    
}

/**
 * Building block of a result object that is generated from array of data
 */
export interface Level {   
    [index: string]: Level|any
    rows?: any[],
    accumulators?:Accumulators
}
/**
 * Result (value) of accumulation, will be stored in the level at "propName" property.
 */
export interface Result {
    propName: string,
    value: number|string
}

/**
 * Aggregates subarray of data for given structure level
 */
export interface AccumulatorFunction {
    (level: Level): Result
}
/**
 * Provides way for specifying custom properties to be used as structure keys instead 
 * of array props/columns
 */
export interface GeneratorFunction {
    (row: any): string
}

/**
 * Specifies how to transfer array of objects into structure
 */
export interface Specification{
    propName: string,
    accumulators?: AccumulatorFunction[],
    next?: Specification|FunctionalSpecification
}
/**
 * Extension that allows for building structure keys using custom function instead of an existing property/column in
 * array data
 */
export interface FunctionalSpecification extends Omit<Specification,"propName">{
    propGenerator: GeneratorFunction
}

/**
 * Transforms array of objects into provided structued object.
 */
class Transformer {
    /**
     * Performs array transformation using provided specification into object that holds both structure and structured rows
     * along with any accumulators.
     * @param rows input array of objects
     * @param specs specification how to translate this object into structured json object
     * @returns structure of Levels
     */
    transform(rows:any[], specs:Specification|FunctionalSpecification):Level{  
        // root level
        const level:Level = {
            rows: rows
        }      
        // iterate in depth along with specs
        this._level(level, specs);

        return level;
    }

    /**
     * Internal. Handles level calculation.
     */
    _level(currentLevel: Level, currentSpecs: FunctionalSpecification|Specification){
                          
        let distinctValues;

        if((<FunctionalSpecification>currentSpecs).propGenerator){
            distinctValues = currentLevel.rows!.map((<FunctionalSpecification>currentSpecs).propGenerator).filter((value, index, array)=>{return array.indexOf(value) === index});
        }else{
            // get distinct values in propName column
            distinctValues = currentLevel.rows!.map(item=>item[(<Specification>currentSpecs).propName!]).filter((value, index, array)=>{return array.indexOf(value) === index});
        }
        

        distinctValues.forEach(key=>{
            // get rows matching this key in column propName

            const rowsWithKeyValueInPropCol = (<FunctionalSpecification>currentSpecs).propGenerator?currentLevel.rows!.filter(item=>(<FunctionalSpecification>currentSpecs).propGenerator(item)==key):currentLevel.rows!.filter(item=>item[(<Specification>currentSpecs).propName!]==key);
                        
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
    }
}

const transformer = new Transformer();
export {transformer};