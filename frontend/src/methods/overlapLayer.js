import {multi, method} from "@arrows/multimethod";
import {chain, filter, find, isEmpty, size, some} from "lodash";
import {SELECTION_TRESHOLD} from "../constants/design";
import {emptyObject} from "../utils/empty";
import pointInPolygon from "point-in-polygon"


// -- RECTANGLE ------------
const overlapRectangle = (layer, point) => {
    const {x: x1, y: y1, width, height} = layer
    const x2 = x1 + width
    const y2 = y1 + height

    const {x, y} = point

    const t = SELECTION_TRESHOLD;

    return (y1 - t <= y && y <= y2 + t &&
            ((x1 - t <= x && x <= x1 + t) ||
                (x2 - t <= x && x <= x2 + t))) ||
        (x1 - t <= x && x <= x2 + t &&
            ((y1 - t <= y && y <= y1 + t) ||
                (y2 - t <= y && y <= y2 + t)));
}

const lassoRectangle = (layer, point, lasso) => {
    // if (overlapRectangle(layer, point)) {
    //     return true
    // }
    const {x: x1, y: y1, width, height} = layer
    const x2 = x1 + width
    const y2 = y1 + height

    const points = [[x1, y1], [x2, y2], [x1, y2], [x2, y1]] // All four corners
    return some(points, (p) => pointInPolygon(p, lasso))
}


// -- ELLIPSE ------------
function insideEllipse(x, y, cx, cy, rx, ry) {
    return (x - cx) * (x - cx) / (rx * rx) + (y - cy) * (y - cy) / (ry * ry) <= 1;
}

const overlapEllipse = (layer, point) => {
    const {
        cx,
        cy,
        rx,
        ry
    } = layer

    const t = SELECTION_TRESHOLD;

    const {x, y} = point

    return insideEllipse(x, y, cx, cy, rx + t, ry + t) && (rx <= t || ry <= t || !insideEllipse(x, y, cx, cy, rx - t, ry - t));
}

const lassoEllipse = (layer, point, lasso) => {
    // if (overlapEllipse(layer, point)) {
    //     return true
    // }

    const {cx, cy, rx, ry} = layer

    // Bounding Rectangle
    const points = [[cx - rx, cy - ry], [cx + rx, cy + ry], [cx + rx, cy - ry], [cx - rx, cy + ry]]
    return some(points, (p) => pointInPolygon(p, lasso))
}

// -- LINE ------------

const insideLine = ({x1, y1, x2, y2}, {x, y}) =>
    Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1) / Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1)) <= SELECTION_TRESHOLD;

const overlapLine = (layer, point) => {
    const {
        x1,
        y1,
        x2,
        y2
    } = layer

    const {x, y} = point

    if (Math.min(x1, x2) <= x &&
        Math.max(x1, x2) >= x &&
        Math.min(y1, y2) <= y &&
        Math.max(y1, y2) >= y) {

        return insideLine(layer, point)
    }
}

const lassoLine = (layer, point, lasso) => {
    if (overlapLine(layer, point)) {
        return true
    }
    const {
        x1,
        y1,
        x2,
        y2
    } = layer
    const points = [[x1, y1], [x2, y2]]
    return some(points, (p) => pointInPolygon(p, lasso))
}

// -- TEXT ------------
const overlapText = (layer, point) => {
    const {x, y} = point
    const {boundary} = layer
    const {minX, minY, maxX, maxY} = boundary || emptyObject

    if (minX <= x &&
        maxX >= x &&
        minY <= y &&
        maxY >= y) {

        return true
    }
}


const lassoText = (layer, point, lasso) => {
    // if (overlapText(layer, point)) {
    //     return true
    // }

    const {boundary} = layer
    const {minX, minY, maxX, maxY} = boundary || emptyObject
    const points = [[minX, minY], [maxX, maxY]]
    return some(points, (p) => pointInPolygon(p, lasso))
}
// -- GROUP ------------
const overlapGroup = (layer, point) => {

}

const lassoGroup = (layer, point, lasso) => {
    if (overlapGroup(layer, point)) {
        return true
    }
}

// -- PATH ------------
const overlapPath = (layer, point) => {
    // const {x, y} = point
    // console.log("json/layer", JSON.parse(JSON.stringify(layer)))
    // const {path, boundary} = layer
    // const {minX, minY, maxX, maxY} = boundary || emptyObject
    //
    //
    // if (minX <= x &&
    //     maxX >= x &&
    //     minY <= y &&
    //     maxY >= y) {
    //
    //     console.log("odd/path", JSON.parse(JSON.stringify(size(path))))
    //
    //     // const inside = chain(path)
    //     //     .chunk(2)
    //     //     .some(([{x: x1, y: y1}, {x: x2, y: y2}]) => insideLine({x1, y1, x2, y2}, point))
    //     //     .value()
    //     //
    //     //
    //     // return inside
    // }
}

const lassoPath = (layer, point, lasso) => {
    //debugger
    // if (overlapPath(layer, point)) {
    //     return true
    // }
    //
    //
    // const {path, boundary} = layer
    // const {minX, minY, maxX, maxY} = boundary || emptyObject
    // const points = path.map(({x, y}) => [x, y])
    // return some(points, (p) => pointInPolygon(p, lasso))
}


// -- LAYER ------------
const overlapLayer = multi(
    ({type}, point, lasso) => size(lasso) > 1 ? `${type}:lasso` : type,
    // --
    method('layer:rectangle', overlapRectangle),
    method('layer:rectangle:lasso', lassoRectangle),
    // --
    method('layer:ellipse', overlapEllipse),
    method('layer:ellipse:lasso', lassoEllipse),
    // --
    method('layer:line', overlapLine),
    method('layer:line:lasso', lassoLine),
    // --
    method('layer:text', overlapText),
    method('layer:text:lasso', lassoText),
    // --
    method('layer:group', overlapGroup),
    method('layer:group:lasso', lassoGroup),
    // --
    method('layer:path', overlapPath),
    method('layer:path:lasso', lassoPath),
    // --
    method((layer, point, lasso) => {
        return false
    }),
)


export const findSelected = (layers, point, lasso) => {
    return find(layers, (layer) => overlapLayer(layer, point, lasso))
}

export const filterSelected = (layers, point, lasso) => {
    return filter(layers, (layer) => overlapLayer(layer, point, lasso))
}


export default overlapLayer