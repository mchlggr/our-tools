const {RESOURCE_ALIAS} = require("../constants/resource");
const designReferenceState = {
    resource: {
        designs: {
            errors: {},
            lists: {ids: []},
            requestedAt: {"1": 123},
            receivedAt: {"1": 123},
            alias: {
                [RESOURCE_ALIAS.ACTIVE_DESIGN]: 0
            },
            byId: {
                "0": {
                    id: "0",
                    build_version: "0.1",
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
                    at: 0,
                    history: [
                        {
                        view: {
                            target: {
                                type: 'surface',
                                uuid: 's1'
                            }
                        },
                        committedAt: 0,
                        tool: 'tool:select',
                        selection: new Set([]),
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
                            {
                                type: 'layer:rectangle',
                                uuid: '39edDG_XEBj4q3QCEC8PP',
                                x: 72,
                                y: 80,
                                width: 800,
                                height: 480
                            }
                        ]
                    }
                    ]
                }
            }
        }
    }
}

export default designReferenceState