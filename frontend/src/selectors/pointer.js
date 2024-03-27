// Dependencies
import {get} from 'lodash'

// ---

export const getPointer = (pointer) => pointer

export const getPointerDown = (pointer) => get(pointer, "down")
export const getPointerDownX = (pointer) => get(pointer, ["down", "x"])
export const getPointerDownY = (pointer) => get(pointer, ["down", "y"])

export const getPointerUp = (pointer) => get(pointer, "up")
export const getPointerUpX = (pointer) => get(pointer, ["up", "x"])
export const getPointerUpY = (pointer) => get(pointer, ["up", "y"])

export const getPointerDrag = (pointer) => get(pointer, "drag")
export const getPointerDragX = (pointer) => get(pointer, ["drag", "x"])
export const getPointerDragY = (pointer) => get(pointer, ["drag", "y"])

export const getPointerPath = (pointer) => get(pointer, "path")

export const getMousePos = (e, {offset, center}) => {
    e.preventDefault() // Skip if selection exempt "design-layer"
    // const offset = e.target.getBoundingClientRect()
    const x = e.clientX - offset.x //- offset.left
    const y = e.clientY - offset.y //- offset.top
    return {
        x: 8 * Math.round(x / 8),
        y: 8 * Math.round(y / 8)
    }
}


export const getOnPointerDown = (pointer) => get(pointer, "onPointerDown")
export const getOnPointerMove = (pointer) => get(pointer, "onPointerMove")
export const getOnPointerWheel = (pointer) => get(pointer, "onPointerWheel")
export const getOnPointerPinch = (pointer) => get(pointer, "onPointerPinch")
export const getOnPointerUp = (pointer) => get(pointer, "onPointerUp")