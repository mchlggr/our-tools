import {multi, method} from "@arrows/multimethod";
import {chain, find, some} from "lodash";
import {SELECTION_TRESHOLD} from "../constants/design";
import {emptyObject} from "../utils/empty";

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

const overlapText = (layer, point) => {
    const {x, y} = point
    const {boundary} = layer
    const {minX, minY, maxX, maxY} = boundary || emptyObject

    if (minX <= x &&
        maxX >= x &&
        minY <= y &&
        maxY >= y) {
        debugger
        return true
    }
}

const overlapGroup = (layer, point) => {

}

const overlapPath = (layer, point) => {
    const {x, y} = point
    const {path, boundary} = layer
    const {minX, minY, maxX, maxY} = boundary || emptyObject

    // debugger

    if (minX <= x &&
        maxX >= x &&
        minY <= y &&
        maxY >= y) {

        const inside = chain(path)
            .chunk(2)
            .some(([{x: x1, y: y1}, {x: x2, y: y2}]) => insideLine({x1, y1, x2, y2}, point))
            .value()

        // if(inside) {
        //     debugger
        // }

        return inside
    }
}

const overlapLayer = multi(
    ({type}) => type,
    method('layer:rectangle', overlapRectangle),
    method('layer:ellipse', overlapEllipse),
    method('layer:line', overlapLine),
    method('layer:text', overlapText),
    method('layer:group', overlapGroup),
    method('layer:path', overlapPath),
    method(() => {
        return false
    }),
)


export const findSelected = (layers, point) => {
    return find(layers, (layer) => overlapLayer(layer, point))
}


export default overlapLayer