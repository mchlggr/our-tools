export const calculateTextBoundary = (layer) => {
    const {x, y, content, fontSize} = layer

    return {
        minX: x,
        minY: y - fontSize,
        maxX: x + (content.length * (fontSize / 2)),
        maxY: y
    }

}