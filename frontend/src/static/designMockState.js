import {RESOURCE_ALIAS} from "../constants/resource";


const historyModelState = [
    {
        view: {
            target: {
                type: 'surface',
                uuid: 's1'
            }
        },
        committedAt: 0,
        // tool: 'tool:hand',
        tool: 'tool:hand',
        selection: new Set([]),
        locked: new Set([]),
        parked: new Set([]),
        facets: {
            // Example of sharding facets figures
            "Position": [
                {"j4i432jio43": {x: 0, y: 0}, "j4i432jio42": {x: 0, y: 0}, "j4i432jio45": {x: 0, y: 0}, "j4i432jio46": {x: 0, y: 0}}, // Shard 1
                {"j4i432jio47": {x: 0, y: 0}, "j4i432jio48": {x: 0, y: 0}, "j4i432jio49": {x: 0, y: 0}, "j4i432jio50": {x: 0, y: 0}}, // Shard 2
            ],
            "Fill": {
                "j4i432jio43": "red"
            },
            "Stroke": {
                "j4i432jio43": "blue"
            },
            "Path": {
                "j4i432jio43": [{x: 0, y: 0}]
            }
        },
        boundary: {
            minX: -1,
            minY: 25,
            maxX: 925,
            maxY: 1175
        },
        entities: [
            {
                type: 'layer:line',
                uuid: 'NiIc8f6UlzmPyFBdn3ko6',
                x1: 848,
                y1: 296,
                x2: 864,
                y2: 264
            },
        ]
    },

]


const designMockState = {
    resource: {
        designs: {
            errors: {},
            list: {ids: []},
            requestedAt: {"1": 123},
            receivedAt: {"1": 123},
            alias: {
                [RESOURCE_ALIAS.ACTIVE_DESIGN]: 0
            },
            byId: {
                "0": {
                    id: "0",
                    build_version: "0.1",
                    at: 0,
                    units: 'px',
                    overlay: [
                        // The overlay is independent of history and next, but can be selected?
                        // The overlay includes guides, inspectors, panels, etc
                        // Perhaps They aren't "selected" they are just clicked and dragged around
                        {
                            type: "guide:ruler",
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 0,
                            uuid: "gr1"
                        }
                    ],
                    history: historyModelState
                }
            }
        }
    }
}

export default designMockState