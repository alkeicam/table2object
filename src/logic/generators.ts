import {GeneratorFunction} from "./transformer"
import moment from "moment"

export class GeneratorsFactory {    
    
    static day(tsPropName: string):GeneratorFunction{

        
        const f:GeneratorFunction = (row:any)=>{
            const value = row[tsPropName];

            const timestamp = moment(value).startOf("day").valueOf();

            return `${timestamp}`
        }

        return f;
    }    
    static week(tsPropName: string):GeneratorFunction{

        
        const f:GeneratorFunction = (row:any)=>{
            const value = row[tsPropName];

            const timestamp = moment(value).week();

            return `${timestamp}`
        }

        return f;
    }
    static month(tsPropName: string):GeneratorFunction{

        
        const f:GeneratorFunction = (row:any)=>{
            const value = row[tsPropName];

            const timestamp = moment(value).startOf("month").valueOf();

            return `${timestamp}`
        }

        return f;
    }
}

