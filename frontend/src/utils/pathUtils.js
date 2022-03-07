export const roughPathD = (path) => path.reduce((acc, curr) => {
    const {x, y} = curr
    acc += `${x} ${y} `
    return acc
}, "M")

// Uses boundary for better selection performance
export const calculatePathBoundary = (path) => {
    const latitudes = path.map(({x}) => x)
    const longitudes = path.map(({y}) => y)

    const minX = Math.min(...latitudes)
    const minY = Math.min(...latitudes)
    const maxX = Math.max(...longitudes)
    const maxY = Math.max(...longitudes)

    return {
        minX,
        minY,
        maxX,
        maxY
    }
}