import {AccumulatorFunction, Level} from "./transformer"

export class AccumulatorsFactory {    
    static sum(propName: string, by: string):AccumulatorFunction{
        const f:AccumulatorFunction = (level:Level)=>{
            const sum =  level.rows!.reduce((prev, curr)=>{
                return prev += curr[by]
            },0)
            
            return {
                propName: propName,
                value: sum
            }
        }

        return f;
    }
    static count(propName: string):AccumulatorFunction{
        const f:AccumulatorFunction = (level:Level)=>{
            const val =  level.rows!.length
            
            return {
                propName: propName,
                value: val
            }
        }

        return f;
    }
}

