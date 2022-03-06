import {multi, method} from "@arrows/multimethod";
import {find} from "lodash";
import {SELECTION_TRESHOLD} from "../constants/design";

const overlapRectangle = (layer, point) => {
    const {x: x1, y: y1, width, height} = layer
    const x2 = x1 + width
    const y2 = y1 + height

    const {x, y} = point

    const t = SELECTION_TRESHOLD;

    // debugger

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
    // debugger

    const t = SELECTION_TRESHOLD;

    const {x, y} = point


    // debugger
    return insideEllipse(x, y, cx, cy, rx + t, ry + t) && (rx <= t || ry <= t || !insideEllipse(x, y, cx, cy, rx - t, ry - t));
}

const overlapLine = (layer, point) => {
    const {
        x1,
        y1,
        x2,
        y2
    } = layer
    // debugger

    const {x, y} = point

    if (Math.min(x1, x2) <= x &&
        Math.max(x1, x2) >= x &&
        Math.min(y1, y2) <= y &&
        Math.max(y1, y2) >= y) {

        return Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1) /
            Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1)) <= SELECTION_TRESHOLD;
    }
}

const overlapText = (layer, point) => {

}

const overlapGroup = (layer, point) => {

}

const overlapPath = (layer, point) => {

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
        debugger
        return false
    }),
)


export const findSelected = (layers, point) => {
    return find(layers, (layer) => overlapLayer(layer, point))
}


export default overlapLayer