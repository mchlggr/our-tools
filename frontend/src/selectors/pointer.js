import {get} from 'lodash'
import produce from "immer";

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


export const getMousePos = (e) => {
    e.preventDefault()
    // const offset = e.target.getBoundingClientRect()
    const x = e.clientX //- offset.left
    const y = e.clientY //- offset.top
    return {
        x: 10 * Math.round(x / 10),
        y: 10 * Math.round(y / 10)
    }
}
