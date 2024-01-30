

# table2object (table to object)
Lightweight toolkit for transforming array of rows into a structured Java Script object.

## Test coverage

```
  table2object
    Transformer
      ✓ rows are split accordingly to structure
      ✓ accumulators are applied accordingly to structure and specification
      ✓ grouping can be done using custom function generators (52ms)


  3 passing (63ms)

------------------|----------|----------|----------|----------|-------------------|
File              |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
------------------|----------|----------|----------|----------|-------------------|
All files         |      100 |      100 |      100 |      100 |                   |
 src              |        0 |        0 |        0 |        0 |                   |
  table2object.ts |        0 |        0 |        0 |        0 |                   |
 src/logic        |      100 |      100 |      100 |      100 |                   |
  accumulators.ts |      100 |      100 |      100 |      100 |                   |
  generators.ts   |      100 |      100 |      100 |      100 |                   |
  transformer.ts  |      100 |      100 |      100 |      100 |                   |
------------------|----------|----------|----------|----------|-------------------|
```

## Install
As a library:

```
$ npm install table2object --save
```

## Use

### Import library
```
import {Specification, transformer} from "../src/table2object"
import {AccumulatorsFactory} from "../src/table2object"
import {GeneratorsFactory} from "../src/table2object"
```

### Structure by selected columns
Transform array - build structure grouping by selected columns


```
const data = [{},...,{}] // some array of rows/objects

const specs:Specification = {                
        propName: "account", // top level grouping - rows will be grouped by "account" column values
        next: {
            propName: "project", // middle level grouping - rows will be grouped by "project" column values
            next: {
                propName: "oper" // lowest level grouping - rows will be grouped by "oper" column values
            }
        }
    }
const result = transformer.transform(data, specs);
```

### Structure and generate aggregate values
Transform array with aggregates - build structure grouping by selected columns and adding accumulation/aggregate values


```
const data = [{},...,{}] // some array of rows/objects

const specs:Specification = {                
        propName: "account", // top level grouping - rows will be grouped by "account" column values
        next: {
            propName: "project", // middle level grouping - rows will be grouped by "project" column values
            accumulators: [AccumulatorsFactory.count("count")], // for each value in "project" column a "count" aggregate will be calculated from rows
            next: {
                propName: "oper" // lowest level grouping - rows will be grouped by "oper" column values
            }
        }
    }
const result = transformer.transform(data, specs);
```

### Structure by custom function
Transform array with aggregates and custom/generated/derived grouping values - build structure grouping by selected columns and adding accumulation/aggregate values, some structure level keys are generated using provided function


```
const data = [{},...,{}] // some array of rows/objects

const specs:Specification = {                
        propName: "account", // top level grouping - rows will be grouped by "account" column values
        next: {
            propName: "project", // middle level grouping - rows will be grouped by "project" column values
            accumulators: [AccumulatorsFactory.count("count")], // for each value in "project" column a "count" aggregate will be calculated from rows
            next: {
                propName: "oper" // middle level grouping - rows will be grouped by "oper" column values
                next: {
                  propGenerator: GeneratorsFactory.week("timestampColumn"), // lowest level grouping - rows will be grouped by week number calculated from "timestampColumn" from data rows
                }
            }
        }
    }
const result = transformer.transform(data, specs);
```

### Examples

Rows data:

```
[
  {
    oper: 'commit',
    account: 'acct1',
    user: 'albert.einstein@mail.com',
    project: 'project1',
    id: 'wqp2yz9ibz8',
    decoded: {
      commit: 'commit 861c46520ff1c198a621510b6fae3bf8cebdac74',
      changeSummary: [Object]
    },
    ct: 1693342741795,
    e: { ec: 4.161, em: 3.48, et: 0, er: 4.818, ed: 4.194, e: 16.653 },
    s: 116.7,
    _rid: 'SLxNAIKMILO0AAAAAAAAAA==',
    _self: 'dbs/SLxNAA==/colls/SLxNAIKMILM=/docs/SLxNAIKMILO0AAAAAAAAAA==/',
    _etag: '"d9001d2f-0000-0700-0000-64ee5c250000"',
    _attachments: 'attachments/',
    _ts: 1693342757
  },
  {
    oper: 'push',
    account: 'acct1',
    user: 'albert.einstein@mail.com',
    project: 'project2',
    id: '12jjb85rdce9',
    decoded: {
      commit: 'commit 9cd9a5adbbfbb842f220e32643502bd2f35ef8d0',
      changeSummary: [Object]
    },
    ct: 1693342968768,
    e: { ec: 4.036, em: 2.617, et: 0, er: 5.097, ed: 0, e: 11.75 },
    s: 13,
    _rid: 'SLxNAIKMILO1AAAAAAAAAA==',
    _self: 'dbs/SLxNAA==/colls/SLxNAIKMILM=/docs/SLxNAIKMILO1AAAAAAAAAA==/',
    _etag: '"d9001f33-0000-0700-0000-64ee5d160000"',
    _attachments: 'attachments/',
    _ts: 1693342998
  },
  {
    oper: 'commit',
    account: 'acct1',
    user: 'john.doe@mail.com',
    project: 'project1',
    id: '5j4a6shjccq',
    decoded: {
      commit: 'commit 9cd9a5adbbfbb842f220e32643502bd2f35ef8d0',
      changeSummary: [Object]
    },
    ct: 1693342964497,
    e: { ec: 4.036, em: 2.617, et: 0, er: 5.097, ed: 4.963, e: 16.713 },
    s: 0.3,
    _rid: 'SLxNAIKMILO2AAAAAAAAAA==',
    _self: 'dbs/SLxNAA==/colls/SLxNAIKMILM=/docs/SLxNAIKMILO2AAAAAAAAAA==/',
    _etag: '"d9002033-0000-0700-0000-64ee5d160000"',
    _attachments: 'attachments/',
    _ts: 1693342998
  },
  {
    oper: 'commit',
    account: 'acct1',
    user: 'isaac.newton@mail.com',
    project: 'project2',
    id: '9s7e1ewxaoe',
    decoded: {
      commit: 'commit 848504a842e81e7141f5e69c79a541ed3e31a6d9',
      changeSummary: [Object]
    },
    ct: 1693344077023,
    e: {
      ec: 4.085,
      em: 1.252,
      et: 0,
      er: 5.092,
      ed: 5.106,
      e: 15.534999999999998
    },
    s: 0.3,
    _rid: 'SLxNAIKMILO3AAAAAAAAAA==',
    _self: 'dbs/SLxNAA==/colls/SLxNAIKMILM=/docs/SLxNAIKMILO3AAAAAAAAAA==/',
    _etag: '"d900ef47-0000-0700-0000-64ee61510000"',
    _attachments: 'attachments/',
    _ts: 1693344082
  }
]
```

#### Example #1

Specification:
```
const specs:Specification = {                
                propName: "account",
                next: {
                    propName: "project",
                    next: {
                        propName: "oper"
                    }
                }
            }
```

Result:
```
{
  rows: [
    {
      oper: 'commit',
      account: 'acct1',
      user: 'albert.einstein@mail.com',
      project: 'project1',
      id: 'wqp2yz9ibz8',
      decoded: [Object],
      ct: 1693342741795,
      e: [Object],
      s: 116.7,
      _rid: 'SLxNAIKMILO0AAAAAAAAAA==',
      _self: 'dbs/SLxNAA==/colls/SLxNAIKMILM=/docs/SLxNAIKMILO0AAAAAAAAAA==/',
      _etag: '"d9001d2f-0000-0700-0000-64ee5c250000"',
      _attachments: 'attachments/',
      _ts: 1693342757
    },
    {
      oper: 'push',
      account: 'acct1',
      user: 'albert.einstein@mail.com',
      project: 'project2',
      id: '12jjb85rdce9',
      decoded: [Object],
      ct: 1693342968768,
      e: [Object],
      s: 13,
      _rid: 'SLxNAIKMILO1AAAAAAAAAA==',
      _self: 'dbs/SLxNAA==/colls/SLxNAIKMILM=/docs/SLxNAIKMILO1AAAAAAAAAA==/',
      _etag: '"d9001f33-0000-0700-0000-64ee5d160000"',
      _attachments: 'attachments/',
      _ts: 1693342998
    },
    {
      oper: 'commit',
      account: 'acct1',
      user: 'john.doe@mail.com',
      project: 'project1',
      id: '5j4a6shjccq',
      decoded: [Object],
      ct: 1693342964497,
      e: [Object],
      s: 0.3,
      _rid: 'SLxNAIKMILO2AAAAAAAAAA==',
      _self: 'dbs/SLxNAA==/colls/SLxNAIKMILM=/docs/SLxNAIKMILO2AAAAAAAAAA==/',
      _etag: '"d9002033-0000-0700-0000-64ee5d160000"',
      _attachments: 'attachments/',
      _ts: 1693342998
    },
    {
      oper: 'commit',
      account: 'acct1',
      user: 'isaac.newton@mail.com',
      project: 'project2',
      id: '9s7e1ewxaoe',
      decoded: [Object],
      ct: 1693344077023,
      e: [Object],
      s: 0.3,
      _rid: 'SLxNAIKMILO3AAAAAAAAAA==',
      _self: 'dbs/SLxNAA==/colls/SLxNAIKMILM=/docs/SLxNAIKMILO3AAAAAAAAAA==/',
      _etag: '"d900ef47-0000-0700-0000-64ee61510000"',
      _attachments: 'attachments/',
      _ts: 1693344082
    }
  ],
  acct1: {
    rows: [ [Object], [Object], [Object], [Object] ],
    project1: { rows: [Array], commit: [Object] },
    project2: { rows: [Array], push: [Object], commit: [Object] }
  }
}
```


## API specification

### Specification

Informs transformer how to change rows of data into a structure of Levels' objects

```
/**
 * Specifies how to transfer array of objects into structure
 */
interface Specification{
    propName: string,
    accumulators?: AccumulatorFunction[],
    next?: Specification|FunctionalSpecification
}
/**
 * Extension that allows for building structure keys using custom function instead of an existing property/column in
 * array data
 */
interface FunctionalSpecification extends Omit<Specification,"propName">{
    propGenerator: GeneratorFunction
}
```

### Level

Transformation result - structure of levels - structured data holding source rows:
```
/**
 * Building block of a result object that is generated from array of data
 */
interface Level {   
    [index: string]: Level|any
    rows?: any[],
    accumulators?:Accumulators
}
```

### Accumualators
Accumulators calculated accumulated values for each level (where specified)

#### AccumulatorsFactory.sum(propName: string, by: string)
Calculates sum of values from the "by" property of source rows. Result is stored in "propName" accumulator property.

#### AccumulatorsFactory.sum(propName: string, by: string)
Calculates count of rows at given level. Result is stored in "propName" accumulator property.

### Generators
Generators provide custom level grouping keys/properties (instead of using source row columns)

#### GeneratorsFactory.day(tsPropName: string)
Level will be stored at timestamp day value from a "tsPropName" timestamp source row column

#### GeneratorsFactory.week(tsPropName: string)
Level will be stored at week number (1-52) value from a "tsPropName" timestamp source row column.

#### GeneratorsFactory.month(tsPropName: string)
Level will be stored at timestamp first day of month value from a "tsPropName" timestamp source row column.
