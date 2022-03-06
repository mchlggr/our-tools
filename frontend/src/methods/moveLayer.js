// Used for selecting and moving layers (rects, ellipse, line, paths, etc)

import {multi, method} from "@arrows/multimethod";
import produce from "immer";

const moveRectangle = (layer, delta) => {
    const {x, y} = delta
    layer.x += x
    layer.y += y
}

const moveEllipse = (layer, delta) => {
    const {x, y} = delta
    layer.cx += x
    layer.cy += y
}

const moveLine = (layer, delta) => {
    const {x, y} = delta
    layer.x1 += x
    layer.y1 += y
    layer.x2 += x
    layer.y2 += y
}

const moveText = (layer, delta) => {
    const {x, y} = delta
}

const moveGroup = (layer, delta) => {
    const {x, y} = delta
}

const movePath = (layer, delta) => {
    const {x, y} = delta
}

const moveLayer = multi(
    ({type}) => type,
    method('layer:rectangle', moveRectangle),
    method('layer:ellipse', moveEllipse),
    method('layer:line', moveLine),
    method('layer:text', moveText),
    method('layer:group', moveGroup),
    method('layer:path', movePath),
    method(() => null)
)

export default moveLayer