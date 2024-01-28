

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

### Transform array - build structure grouping by selected columns
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

### Transform array with aggregates - build structure grouping by selected columns and adding accumulation/aggregate values
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

### Transform array with aggregates and custom/generated/derived grouping values - build structure grouping by selected columns and adding accumulation/aggregate values, some structure level keys are generated using provided function
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