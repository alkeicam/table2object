// import chai, { assert } from 'chai'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'


chai.should();
chai.use(chaiAsPromised);

// const assert = chai.assert;

const expect = chai.expect;

// import sinon, { SinonStub } from 'sinon';


import {Specification, transformer} from "../src/table2object"
import {AccumulatorsFactory} from "../src/table2object"
import {GeneratorsFactory} from "../src/table2object"

import {EventsMocks} from "./data.mock"

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
            expect(result["a_account"].rows.length).eq(EventsMocks.devworkout_1.length);

            expect(result.a_account.a_account_devjam_app.rows.length).eq(17);            
            expect(result.a_account.a_account_devjam_app.commit.rows.length).eq(11);
            expect(result.a_account.a_account_devjam_app.push.rows.length).eq(6);

            expect(result.a_account.a_account_devjam_sponsor.rows.length).eq(187);
            expect(result.a_account.a_account_devjam_sponsor.commit.rows.length).eq(117);
            expect(result.a_account.a_account_devjam_sponsor.push.rows.length).eq(70);
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
            expect(result.a_account.a_account_devjam_app.commit["albert.einstein@mail.com"].accumulators).is.empty;
            expect(result.a_account.a_account_devjam_app.push.accumulators.count).eq(6);
            expect(result.a_account.a_account_devjam_app.commit.accumulators.count).eq(11);
            expect(result.a_account.a_account_devjam_app.accumulators).is.empty;
            expect(result.a_account.accumulators.effort).closeTo(2544,0.1);
            expect(result.accumulators).is.empty;            
        })
        it("grouping can be done using custom function generators",()=>{
            const specs:Specification = {                
                propName: "account",
                // accumulator used for prop name grouping
                accumulators: [
                    AccumulatorsFactory.sum("effort", "s"), AccumulatorsFactory.count("count")
                ],
                next: {                    
                    propGenerator: GeneratorsFactory.month("ct"),
                    accumulators: [
                        AccumulatorsFactory.count("count"), AccumulatorsFactory.sum("effort", "s")
                    ],
                    next: {
                        propGenerator: GeneratorsFactory.week("ct"),
                        accumulators: [
                            AccumulatorsFactory.count("count"), AccumulatorsFactory.sum("effort", "s")
                        ],
                        next: {
                            propGenerator: GeneratorsFactory.day("ct"),
                            accumulators: [
                                AccumulatorsFactory.count("count"), AccumulatorsFactory.sum("effort", "s")
                            ],
                            next: {
                                propName: "project",
                                accumulators: [],
                                next: {
                                    propName: "user"
                                }                        
                            }                                
                        }
                    }                                        
                }
            }
            const result = transformer.transform(EventsMocks.devworkout_1, specs);
            expect(result.accumulators).is.empty;  
            // make sure months are calculated correctly
            expect(Object.keys(result.a_account).reduce((prev, curr)=>{return curr.startsWith("169")?++prev:prev},0)).eq(4)
            expect(Object.keys(result.a_account).reduce((prev, curr)=>{return curr.startsWith("170")?++prev:prev},0)).eq(2)

            // now check weeks as grouping
            expect(result.a_account["1704063600000"]["1"].accumulators.count).eq(2);
            expect(result.a_account["1704063600000"]["1"].accumulators.effort).closeTo(36.2,0.5);

            // now check days within weeks grouping
            expect(Object.keys(result.a_account["1704063600000"]["4"]).reduce((prev, curr)=>{return curr.startsWith("1705")?++prev:prev},0)).eq(2)


        })
    })
    describe("Demo Samples",()=>{
        it("demo1",()=>{
            const specs:Specification = {                
                propName: "account",
                next: {
                    propName: "project",
                    next: {
                        propName: "oper"
                    }
                }
            }
            const result = transformer.transform(EventsMocks.devworkout_2, specs);
            
            expect(result.acct1).is.not.null;

        })
    })
})


