// import chai, { assert } from 'chai'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'


chai.should();
chai.use(chaiAsPromised);

// const assert = chai.assert;

const expect = chai.expect;

// Sinon is a library used for mocking or verifying function calls in JavaScript.

// import sinon, { SinonStub } from 'sinon';


// import {TileBase} from '../src/logic/map/common.notest'
// import {MapBase, MapHexOddQ, MapSquare, Neighbour, Path, Paths,} from '../src/logic/map/map'
// import {MapsFileMocks, MapsMocks, TerrainMocks, TileMocks} from './data.mock'
// import {CostCalculator, CostCalculatorConst, CostCalculatorTerrain} from "../src/logic/map/costs"
// import {ActionContextUnitAttack, ActionContextUnitMove, ActionUnitAttack, ActionUnitFortify, ActionUnitLandFieldOfView, ActionUnitMove} from "../src/logic/units/actions/action"
// import { SpecsBase, SpecsLocation } from '../src/logic/units/unit';
// import {Utils} from "../src/util/utils";

// import { GameygineEvents } from '../src/util/eventDictionary.notest';
// import EventEmitter from 'eventemitter3';
// import { Tile } from '../src/logic/map/tile';

import {Level, Specification, transformer} from "../src/table2object"
import {EventsMocks} from "./data.mock"
import { AccumulatorFunction } from '../src/logic/transformer';
import {AccumulatorsFactory} from "../src/logic/accumulators"

// const messageBus = new EventEmitter();

/*
{
    "Execon DevJam Desktop App@Execon One": {
        effort: 1,
        commits: 1,
        lines: 1
    }
    "Execon DevJam Sposor App@Execon One": {
        effort: 1,
        commits: 1,
        lines: 1
    }
}


lisc -> rows

col1, col2, col3, col4, col4

aa, cc, ee, gg, ii
aa, cd, ee, gh, ij


r1c1, r1c2, r1c3, r1c4, r1c5
r2c1, r2c2, r2c3, r2c4, r1c5

*/

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
            // const sumEffort:AccumulatorFunction = (level:Level)=>{
            //     const sum =  level.rows?.reduce((prev, curr)=>{
            //         return prev += curr.s
            //     },0)
                
            //     return {
            //         propName: "effort",
            //         value:sum
            //     }
            // }
            const count:AccumulatorFunction = (level:Level)=>{
                const val =  level.rows!.length;
                
                return {
                    propName: "count",
                    value:val
                }
            }

            const specs:Specification = {                
                propName: "account",
                // accumulator used for prop name grouping
                accumulators: [
                    AccumulatorsFactory.sum("effort", "s"), count
                ],
                next: {
                    propName: "project",
                    accumulators: [],
                    next: {
                        propName: "oper",
                        accumulators: [
                            count
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


