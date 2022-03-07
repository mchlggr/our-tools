// Used for selecting and moving layers (rects, ellipse, line, paths, etc)

import {multi, method} from "@arrows/multimethod";
import produce from "immer";
import {nanoid} from "@reduxjs/toolkit";
import {calculatePathBoundary, roughPathD} from "../utils/pathUtils";
import {calculateTextBoundary} from "../utils/textUtils";
import {getHello} from "../utils/helloUtils";

const newRectangle = produce((type, p1, p2) => {
    const {x: x1, y: y1} = p1
    const {x: x2, y: y2} = p2

    return {
        type: "layer:rectangle",
        uuid: nanoid(),
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        width: Math.abs(x1 - x2),
        height: Math.abs(y1 - y2)
    }
})

const newEllipse = produce((type, p1, p2) => {
    const {x: x1, y: y1} = p1
    const {x: x2, y: y2} = p2

    return {
        type: "layer:ellipse",
        uuid: nanoid(),
        cx: (x1 + x2) / 2,
        cy: (y1 + y2) / 2,
        rx: Math.abs(x1 - x2) / 2,
        ry: Math.abs(y1 - y2) / 2
    }
})

const newLine = produce((type, p1, p2) => {
    const {x: x1, y: y1} = p1
    const {x: x2, y: y2} = p2

    return {
        type: "layer:line",
        uuid: nanoid(),
        x1,
        y1,
        x2,
        y2
    }
})




const newText = produce((type, p1, p2) => {

    const fontSize = 100
    const {x, y} = p1
    const content = getHello()

    return {
        type: "layer:text",
        uuid: nanoid(),
        x,
        y,
        fontSize,
        content,
        boundary: calculateTextBoundary({x, y, fontSize, content})
    }
})

const newGroup = produce((type, p1, p2) => {

})

const newPath = produce((type, p1, p2, path) => {

    return {
        type: "layer:path", // is a type of Layer
        uuid: nanoid(),
        path,
        d: roughPathD(path),
        fill: "none",
        boundary: calculatePathBoundary(path) // Use for better selection performance
    }
})

const newLayer = multi(
    (tool) => tool,
    method('tool:rectangle', newRectangle),
    method('tool:ellipse', newEllipse),
    method('tool:line', newLine),
    method('tool:text', newText),
    method('tool:group', newGroup),
    method('tool:path', newPath),
    method(() => null)
)

export default newLayer