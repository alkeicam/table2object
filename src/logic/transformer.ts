
export interface Accumulator {
    [index: string]: string|number|any[],
    
}
export interface Group {
    value: string|number,
    displayValue: string
}

export interface Level {    
    value: Accumulator, // multiple accumulated     
    group: Group,    
    next?: Level
}

/**
 * Generates new level from raw rows and/or previous level
 * 
 */
export interface GeneratorFunction {
    (propName: string, rows: any[], prevLevel?: Level): Level
}
/*
events

miesiac
    tydzien
        rank, pracownik, calories (suma w tygodniu), commits (suma w tygodniu), lines (suma w tygodniu) 
               (rows) => {

   
                 }

*/

/**
 * 
 */
export interface Specification{
    propName: string,
    generator: GeneratorFunction
    next?: Specification
}

class Transformer {
    transform(rows:any[], specs:Specification):Level{        
        return this._level(rows, specs);
    }

    /**
     * recursive, top down, start from root and go down first then accumulate on way up
     * @param rows 
     * @param currentSpecs 
     * @returns 
     */
    _level(rows:any[], currentSpecs: Specification):Level{
        let nextLevel;        
        if(currentSpecs.next){
            nextLevel = this._level(rows, currentSpecs.next)
        }
        const level = currentSpecs.generator(currentSpecs.propName, rows, nextLevel);   
        level.next = nextLevel     
        return level;
    }
}

const transformer = new Transformer();
export {transformer};