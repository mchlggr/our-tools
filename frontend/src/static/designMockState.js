import {RESOURCE_ALIAS} from "../constants/resource";

const modelMockState = {
    // pointer: {
    //     down: {x: 0, y: 0},
    //     up: {x: 0, y: 0},
    //     drag: {x: 0, y: 0}
    // },
    view: {
        target: {
            type: "surface",
            uuid: "s1"
        }
    },
    committedAt: 0,
    tool: "tool:select",
    selection: new Set([]),
    entities: [
        {
            type: "layer:rectangle", // is a type of Layer
            uuid: "lr1",
            name: "red rect",
            group_uuid: "lg1",
            surface_uuid: "s1",
            x: 50,
            y: 50,
            width: 100,
            height: 100,
            fill: "#f00",
            stroke: 'red'
        },
        {
            type: "layer:ellipse", // is a type of Layer
            uuid: "le1",
            name: "blue ellipse",
            group_uuid: "lg1",
            surface_uuid: "s1",
            cx: 20,
            cy: 20,
            rx: 100,
            ry: 100,
            fill: "#00f",
            stroke: "#000"
        },
        {
            type: "layer:line", // is a type of Layer
            uuid: "ll1",
            name: "green line",
            group_uuid: "lg1",
            surface_uuid: "s1",
            x1: 1280,
            y1: 1070,
            x2: 930,
            y2: 1200,
            stroke: 'red'
        },
        // {
        //     type: "layer:text", // is a type of Layer
        //     uuid: "lt1",
        //     group_uuid: undefined,
        //     surface_uuid: "s1",
        //     x: 0,
        //     y: 0,
        //     width: 66,
        //     height: 98,
        //     content: "scream!",
        //     alignment: "left"
        // },
        {
            type: "surface",
            uuid: "s1",
            x: 50,
            y: 50,
            width: 850,
            height: 1100,
        },
        // {
        //     type: "layer:group",
        //     uuid: "lg1",
        //     name: "mock group",
        //     surface_uuid: "s1",
        //     // TODO: cache x, y, width, height on update
        // }
    ]
}

const designMockState = {
    resource: {
        designs: {
            errors: {},
            lists: {ids: []},
            requestedAt: {"1": 123},
            receivedAt: {"1": 123},
            alias: {
                [RESOURCE_ALIAS.ACTIVE_DESIGN]: 1
            },
            byId: {
                "1": {
                    id: "1",
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
                    history: [
                        modelMockState,
                        // modelMockState,
                        // modelMockState,
                        // modelMockState
                    ]
                }
            }
        }
    }
}

export default designMockState