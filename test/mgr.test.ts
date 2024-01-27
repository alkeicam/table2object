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
        it("a",()=>{
            const specs:Specification = {
                generator:(_propName: string, _rows: any[], _prevLevel?: Level)=>{


                    const result:Level = {
                        group: {
                            displayValue:"Total",
                            value: "Total"
                        },
                        value: {
                            // project, sum(effort), sum(commits), sum(lines)
                            rows: []
                        }                                                 
                    }





                    return result;
                },
                propName: "",
                next:undefined
            }
            const result = transformer.transform(EventsMocks.devworkout_1, specs);
            expect(result).eq({});
        })
    })
})


