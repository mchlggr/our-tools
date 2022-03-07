// Used for selecting and moving layers (rects, ellipse, line, paths, etc)

import {multi, method} from "@arrows/multimethod";
import produce from "immer";
import {calculatePathBoundary, roughPathD} from "../utils/pathUtils";
import {each, map} from "lodash";
import {calculateTextBoundary} from "../utils/textUtils";

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

    layer.x += x
    layer.y += y
    layer.boundary = calculateTextBoundary(layer)
}

const moveGroup = (layer, delta) => {
    const {x, y} = delta
}

const movePath = (layer, delta) => {
    const {path} = layer
    const {x, y} = delta

    const newPath = map(path, (p) => {
        p.x += x
        p.y += y
        return p
    })

    layer.path = newPath
    layer.d = roughPathD(newPath)
    layer.boundary = calculatePathBoundary(newPath)
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