// import chai, { assert } from 'chai'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'


chai.should();
chai.use(chaiAsPromised);

// const assert = chai.assert;

const expect = chai.expect;

// import sinon, { SinonStub } from 'sinon';


import {Specification, transformer} from "../src/table2object"
import {EventsMocks} from "./data.mock"
import {AccumulatorsFactory} from "../src/logic/accumulators"

describe("table2object",()=>{
    describe("Transformer",()=>{
        it("rows are split accordingly to structure",()=>{
            const specs:Specification = {                
                propName: "account",
                next: {
                    propName: "project",
                    next: {
                        propName: "oper"
                    }
                }
            }
            const result = transformer.transform(EventsMocks.devworkout_1, specs);
            
            expect(result.rows?.length).eq(EventsMocks.devworkout_1.length);
            expect(result["a_execon"].rows.length).eq(EventsMocks.devworkout_1.length);

            expect(result.a_execon.a_execon_devjam_app.rows.length).eq(17);            
            expect(result.a_execon.a_execon_devjam_app.commit.rows.length).eq(11);
            expect(result.a_execon.a_execon_devjam_app.push.rows.length).eq(6);

            expect(result.a_execon.a_execon_devjam_sponsor.rows.length).eq(187);
            expect(result.a_execon.a_execon_devjam_sponsor.commit.rows.length).eq(117);
            expect(result.a_execon.a_execon_devjam_sponsor.push.rows.length).eq(70);
        })

        it("accumulators are applied accordingly to structure and specification",()=>{            

            const specs:Specification = {                
                propName: "account",
                // accumulator used for prop name grouping
                accumulators: [
                    AccumulatorsFactory.sum("effort", "s"), AccumulatorsFactory.count("count")
                ],
                next: {
                    propName: "project",
                    accumulators: [],
                    next: {
                        propName: "oper",
                        accumulators: [
                            AccumulatorsFactory.count("count")
                        ],
                        next: {
                            propName: "user"
                        }                        
                    }
                }
            }
            const result = transformer.transform(EventsMocks.devworkout_1, specs);
            expect(result.rows?.length).eq(EventsMocks.devworkout_1.length);
            expect(result.a_execon.a_execon_devjam_app.commit["jan.kowalski@execon.pl"].accumulators).is.empty;
            expect(result.a_execon.a_execon_devjam_app.push.accumulators.count).eq(6);
            expect(result.a_execon.a_execon_devjam_app.commit.accumulators.count).eq(11);
            expect(result.a_execon.a_execon_devjam_app.accumulators).is.empty;
            expect(result.a_execon.accumulators.effort).closeTo(2544,0.1);
            expect(result.accumulators).is.empty;            
        })
    })
})


