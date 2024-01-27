# GameYngine - Typescript Strategy Game Engine

# Loading Map
Map can be populated by:
* loading tile data from `TileBase[]` array
* loading from `MapFile` json object that holds map specification

## Loading from tiles array
Method:
```typescript
fromTiles(tiles:TileBase[]):void;
```
Example:
```typescript
const tiles:TileBase[] = []; // some tiles data
theMap.fromTiles(tiles);
```

## Loading from json file with map specification

Method:
```typescript
fromJson(data:MapFile):void;
```
Example:
```typescript
const mapSpecification:MapFile = {} // some map file data
theMap.fromJson(mapSpecification);
```

Following is a format of the `MapFile` object:
```typescript
export interface MapSpecs {
    id: string, // unique id of the map   
    name: string, // name of the map
    kind: string, // one of HexTile or QuadTile
    size: string, // size of map in "widthxheight" format i.e. 10x5
    tags: string[], // additional tags assigned with map
    address: string, // when map resembles real world place this contains it's address
    latlon: string[], // when map resembles real world place this contains it's location        
}

export interface MapFile {
    specs: MapSpecs, // map basic data
    tiles?: TileBase[] // tiles specifications    
}
```

Here is a sample JSON `MapFile` object that can be loaded into map:

```javascript
{
  "specs": {
    "id": "dkhsvpmudqk",
    "name": "",
    "kind": "HexTile",
    "size": "8x5",
    "tags": [
      "8x5",
      "HexTile"
    ],
    "address": "",
    "latlon": [
      ""
    ],
    "options": {
      "backgroundImgUrl": "https://i.postimg.cc/90wC1JV8/cefd6efe20aa05768aded22e3f8f27f8.jpg"
    }
  },
  "tiles": [
    {
      "id": "0,0",
      "x": "0",
      "y": "0",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "0,1",
      "x": "0",
      "y": "1",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "0,2",
      "x": "0",
      "y": "2",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "0,3",
      "x": "0",
      "y": "3",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "0,4",
      "x": "0",
      "y": "4",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "1,0",
      "x": "1",
      "y": "0",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "1,1",
      "x": "1",
      "y": "1",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "1,2",
      "x": "1",
      "y": "2",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "1,3",
      "x": "1",
      "y": "3",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "1,4",
      "x": "1",
      "y": "4",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "2,0",
      "x": "2",
      "y": "0",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "2,1",
      "x": "2",
      "y": "1",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "2,2",
      "x": "2",
      "y": "2",
      "d": "S",
      "r": "MAS_YELLOW_TILE",
      "t": {
        "kind": "UNDEFINED",
        "modifications": [
          "CONSTRUCTION",
          "CUSTOM",
          "YELLOW"
        ]
      }
    },
    {
      "id": "2,3",
      "x": "2",
      "y": "3",
      "d": "S",
      "r": "MAS_YELLOW_TILE",
      "t": {
        "kind": "UNDEFINED",
        "modifications": [
          "CONSTRUCTION",
          "CUSTOM",
          "YELLOW"
        ]
      }
    },
    {
      "id": "2,4",
      "x": "2",
      "y": "4",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "3,0",
      "x": "3",
      "y": "0",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "3,1",
      "x": "3",
      "y": "1",
      "d": "S",
      "r": "MAS_YELLOW_TILE",
      "t": {
        "kind": "UNDEFINED",
        "modifications": [
          "CONSTRUCTION",
          "CUSTOM",
          "YELLOW"
        ]
      }
    },
    {
      "id": "3,2",
      "x": "3",
      "y": "2",
      "d": "S",
      "r": "MAS_C_T_GRASS_TILE",
      "t": {
        "kind": "UNDEFINED",
        "modifications": [
          "CONSTRUCTION",
          "CUSTOM",
          "GREEN"
        ]
      }
    },
    {
      "id": "3,3",
      "x": "3",
      "y": "3",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "3,4",
      "x": "3",
      "y": "4",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "4,0",
      "x": "4",
      "y": "0",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "4,1",
      "x": "4",
      "y": "1",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "4,2",
      "x": "4",
      "y": "2",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "4,3",
      "x": "4",
      "y": "3",
      "d": "S",
      "r": "MAS_YELLOW_TILE",
      "t": {
        "kind": "UNDEFINED",
        "modifications": [
          "CONSTRUCTION",
          "CUSTOM",
          "YELLOW"
        ]
      }
    },
    {
      "id": "4,4",
      "x": "4",
      "y": "4",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "5,0",
      "x": "5",
      "y": "0",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "5,1",
      "x": "5",
      "y": "1",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "5,2",
      "x": "5",
      "y": "2",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "5,3",
      "x": "5",
      "y": "3",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "5,4",
      "x": "5",
      "y": "4",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "6,0",
      "x": "6",
      "y": "0",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "6,1",
      "x": "6",
      "y": "1",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "6,2",
      "x": "6",
      "y": "2",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "6,3",
      "x": "6",
      "y": "3",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "6,4",
      "x": "6",
      "y": "4",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "7,0",
      "x": "7",
      "y": "0",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "7,1",
      "x": "7",
      "y": "1",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "7,2",
      "x": "7",
      "y": "2",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "7,3",
      "x": "7",
      "y": "3",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    },
    {
      "id": "7,4",
      "x": "7",
      "y": "4",
      "d": "S",
      "r": "MAS_TRANSPARENT2_TILE",
      "t": {
        "kind": "UNDEFINED"
      }
    }
  ],
  "assets": [
    {
      "libId": "nof399vbt7",
      "id": "4jsvjis8sbh",
      "vId": "MAS_TRANSPARENT2_TILE"
    },
    {
      "libId": "3wsjbxpbqr",
      "id": "6t2qcxj3tjo",
      "vId": "MAS_YELLOW_TILE"
    },
    {
      "libId": "nof399vbt7",
      "id": "ztoga54xmdc",
      "vId": "MAS_C_T_GRASS_TILE"
    }
  ]
}
```


