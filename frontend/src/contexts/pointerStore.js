import {useCallback} from "react";

// Dependencies
import createContext from 'zustand/context'
import create from 'zustand'
import {devtools} from 'zustand/middleware'
import produce from "immer";
import {isEmpty, isEqual, last} from "lodash";

// Methods
import dragTool from "../methods/dragTool";
import clickTool from "../methods/clickTool";
import nudgeTool from "../methods/nudgeTool";

// Selectors
import {
    getViewCenter,
    getViewCenterX,
    getViewCenterY,
    getViewMaxZoom,
    getViewMinZoom,
    getViewOffset,
    getViewOffsetX,
    getViewOffsetY,
    getViewport,
    getViewportX,
    getViewportY,
    getViewScale,
    getViewZoom
} from "../selectors/view";
import {
    getMousePos,
    getOnPointerDown,
    getOnPointerMove, getOnPointerPinch,
    getOnPointerUp, getOnPointerWheel,
    getPointerDown, getPointerDownX, getPointerDownY, getPointerDrag, getPointerDragX, getPointerDragY, getPointerPath,
    getPointerUp, getPointerUpX, getPointerUpY
} from "../selectors/pointer";

// Utils
import {getMovement} from "../utils/pointUtils";

// Constants
import {DIRECTION_EAST, DIRECTION_NORTH, DIRECTION_SOUTH} from "../constants/direction";

// ---

const {Provider: PointerStoreProvider, useStore: usePointer} = createContext()

const onPointerDownRecipe = (e, tool, baseModel, transactModel, draftStage) => {
    draftStage.down = getMousePos(e, draftStage)
    draftStage.path = []
    draftStage.time = [] // Used for calculating velocity when needed
}

const onPointerMoveRecipe = (e, tool, baseModel, transactModel, draftStage) => {
    const {down, drag, path, offset} = draftStage
    const pos = getMousePos(e, draftStage)
    if (!!down && (!!drag || !isEqual(down, pos))) {
        draftStage.drag = pos

        if (!isEmpty(path)) {
            const m = getMovement(last(path), pos)
            console.log("d/m", m)
            draftStage.movement = m
        }

        //TODO: Check for drag distance threshold before updating path
        draftStage.path.push(pos)
        draftStage.time.push(Date.now()) // Used for calculating velocity when needed

        const newModel = dragTool(tool, baseModel, e, draftStage)

        if (!!newModel && newModel !== baseModel) {
            transactModel(newModel)
        }
    }
}

const onPointerWheelRecipe = (e, tool, baseModel, transactModel, draftStage) => {
    console.log("onPointerWheelRecipe/onPointerWheel/s", e)
    const {delta, last} = e
    const [deltaX, deltaY] = delta

    const {scale, wheelStep = 200} = draftStage

    draftStage.scale = scale - deltaY / wheelStep

    console.log("draftStage.scale/", draftStage.scale)
}

const onPointerPinchRecipe = (e, tool, baseModel, transactModel, draftStage) => {
    const {delta, origin} = e
    const {scale, wheelStep = 200} = draftStage

    const [originX, originY] = origin

    draftStage.origin.x = originX
    draftStage.origin.y = originY

    // draftStage.scale = scale + delta.y / wheelStep
}

const onPointerUpRecipe = (e, tool, baseModel, transactModel, draftStage) => {
    const {down, drag, path, offset} = draftStage
    const pos = getMousePos(e, draftStage)

    draftStage.up = pos

    // Poor man's pattern matching
    switch (true) {
        case !!down && !!drag: {
            // Then drag has ended
            const newModel = dragTool(tool, baseModel, e, draftStage)
            if (!!newModel && newModel !== baseModel) {
                transactModel(newModel)
            }
            break;
        }
        case !!down: {
            // Then pointer was clicked / tapped
            const newModel = clickTool(tool, baseModel, e, draftStage)
            if (!!newModel && newModel !== baseModel) {
                transactModel(newModel)
            }
            break;
        }
    }

    // Reset other pointer coordinates
    draftStage.down = undefined
    draftStage.drag = undefined
    draftStage.path = []
}

const onDirectionRecipe = (e, tool, baseModel, transactModel, draftStage, direction) => {
    e.preventDefault()
    const newModel = nudgeTool(tool, baseModel, direction, e, draftStage)
    if (!!newModel && newModel !== baseModel) {
        transactModel(newModel)
    }
}

//TODO: refactor to StageStore
const createPointerStore = () => create(devtools((set, get) => ({
    // ----------------------------
    // Pointer
    down: undefined,
    up: undefined,
    drag: undefined,
    movement: {x: 0, y: 0},
    time: [],
    path: [],
    // ----------------------------
    // Events
    onPointerDown: (e, tool, model, transact) => set(produce((pointer) => onPointerDownRecipe(e, tool, model, transact, pointer))),
    onPointerMove: (e, tool, model, transact) => set(produce((pointer) => onPointerMoveRecipe(e, tool, model, transact, pointer))),
    onPointerWheel: (e, tool, model, transact) => set(produce((pointer) => onPointerWheelRecipe(e, tool, model, transact, pointer))),
    onPointerPinch: (e, tool, model, transact) => set(produce((pointer) => onPointerPinchRecipe(e, tool, model, transact, pointer))),
    onPointerUp: (e, tool, model, transact) => set(produce((pointer) => onPointerUpRecipe(e, tool, model, transact, pointer))),
    //
    onDirection: (e, tool, model, transact, direction) => set(produce((stage) => onDirectionRecipe(e, tool, model, transact, stage, direction))),
    // ----------------------------
    // View
    viewport: {width: 0, height: 0},
    setViewport: (target) => set(produce((stage) => {
        const width = target.clientWidth;
        const height = target.clientHeight;
        console.log("num/height", height)
        console.log("num/width", width)
        stage.viewport = {width, height}
        stage.center = {x: width / 2, y: height / 2}
    })),
    boundary: {},
    // initialW: 1062, // Move to Model or Design metadata
    // initialH: 1018, // Move to Model or Design metadata
    // Scale
    minZoom: 0.85, // Move to Model Metadata
    maxZoom: 2, // Move to Model Metadata
    // wheelStep: 200,
    zoom: 1,
    //
    // cx: 120 / 2,
    // cy: 80 / 2,
    //center: {x: 0, y: 0},
    scale: 1,
    offset: {x: 0, y: 0}, // Point2D
    origin: {x: 0, y: 0}, // Pinch Origin
    wheel: 0,
    // ----------------------------
    viewZoomInc: (inc) => set(produce((draftStage) => {
        draftStage.zoom += inc
    })),
    viewZoomTo: (v) => set(produce((draftStage) => {
        draftStage.zoom = v
    })),
    viewMove: ({x, y}) => set(produce((draftStage) => {
        draftStage.center.x -= x
        draftStage.center.y -= y
    })),
    viewMoveTo: ({x, y}) => set(produce((draftStage) => {
        draftStage.center.x = x
        draftStage.center.y = y
    }))
})))

const useOnPointerDown = (tool, model, transact) => {
    const onPointerDown = usePointer(getOnPointerDown)
    return useCallback((e) => onPointerDown(e, tool, model, transact), [tool, model, transact])

}

const useOnPointerMove = (tool, model, transact) => {
    const onPointerMove = usePointer(getOnPointerMove)
    return useCallback((e) => onPointerMove(e, tool, model, transact), [tool, model, transact])
}

const useOnPointerWheel = (tool, model, transact) => {
    const onPointerWheel = usePointer(getOnPointerWheel)
    return useCallback((e) => onPointerWheel(e, tool, model, transact), [tool, model, transact])

}

const useOnPointerPinch = (tool, model, transact) => {
    const onPointerPinch = usePointer(getOnPointerPinch)
    return useCallback((e) => onPointerPinch(e, tool, model, transact), [tool, model, transact])

}

const useOnPointerUp = (tool, model, transact) => {
    const onPointerUp = usePointer(getOnPointerUp)
    return useCallback((e) => onPointerUp(e, tool, model, transact), [tool, model, transact])

}

const usePointerDown = () => usePointer(getPointerDown)
const usePointerDownX = () => usePointer(getPointerDownX)
const usePointerDownY = () => usePointer(getPointerDownY)

const usePointerUp = () => usePointer(getPointerUp)
const usePointerUpX = () => usePointer(getPointerUpX)
const usePointerUpY = () => usePointer(getPointerUpY)

const usePointerDrag = () => usePointer(getPointerDrag)
const usePointerDragX = () => usePointer(getPointerDragX)
const usePointerDragY = () => usePointer(getPointerDragY)

const useViewCenter = () => usePointer(getViewCenter)
const useViewCenterX = () => usePointer(getViewCenterX)
const useViewCenterY = () => usePointer(getViewCenterY)

const useViewMaxZoom = () => usePointer(getViewMaxZoom)
const useViewMinZoom = () => usePointer(getViewMinZoom)
const useViewZoom = () => usePointer(getViewZoom)

const useViewOffset = () => usePointer(getViewOffset)
const useViewOffsetX = () => usePointer(getViewOffsetX)
const useViewOffsetY = () => usePointer(getViewOffsetY)

const useViewport = () => usePointer(getViewport)
const useViewportX = () => usePointer(getViewportX)
const useViewportY = () => usePointer(getViewportY)

const useViewScale = () => usePointer(getViewScale)

const usePointerPath = () => usePointer(getPointerPath)

const useSetViewport = () => usePointer(({setViewport}) => setViewport)

const useViewZoomInc = () => usePointer(({viewZoomInc}) => viewZoomInc)
const useViewZoomTo = () => usePointer(({viewZoomTo}) => viewZoomTo)
const useViewMove = () => usePointer(({viewMove}) => viewMove)
const useViewMoveTo = () => usePointer(({viewMoveTo}) => viewMoveTo)

export {
    PointerStoreProvider,
    usePointer,
    createPointerStore,
    // Helper Hooks
    useOnPointerDown,
    useOnPointerMove,
    useOnPointerWheel,
    useOnPointerPinch,
    useOnPointerUp,
    // More Selector Hooks
    usePointerDown,
    usePointerDownX,
    usePointerDownY,
    // --
    usePointerUp,
    usePointerUpX,
    usePointerUpY,
    // --
    usePointerDrag,
    usePointerDragX,
    usePointerDragY,
    // --
    usePointerPath,
    // --
    useViewCenter,
    useViewCenterX,
    useViewCenterY,
    // --
    useViewMaxZoom,
    useViewMinZoom,
    useViewZoom,
    // --
    useViewOffset,
    useViewOffsetX,
    useViewOffsetY,
    //
    useViewScale,
    //
    useSetViewport,
    //
    useViewZoomInc,
    useViewZoomTo,
    //
    useViewMove,
    useViewMoveTo,
}

//TODO: thunk pointer callbacks to improve performance and avoid USE-LESS RE-RENDERING
//TODO: spanTo: "10px",
