import {multi, method} from '@arrows/multimethod'
import classNames from 'classnames'
import TextDisplay from "../components/layers/TextDisplay";

export const typePattenSuffix = /(?<=\:).*/

export const layerClassNames = (layer, selected, className = undefined) => {
    const {type} = layer
    const [suffix] = type.match(typePattenSuffix)
    return classNames('design-layer', {
        "design-layer--selected": selected,
        [`design-layer-${suffix}`]: suffix
    }, className)
}

const renderRectangle = (layer, selected, key) => {
    const {x, y, width, height, fill, stroke} = layer
    return <rect key={key}
                 x={x}
                 y={y}
                 width={width}
                 height={height}
                 fill={fill}
                 stroke={stroke}
                 className={layerClassNames(layer, selected)}
    />
}

const renderEllipse = (layer, selected, key) => {
    const {cx, cy, rx, ry} = layer

    return <ellipse key={key}
                    cx={cx}
                    cy={cy}
                    rx={rx}
                    ry={ry}
                    className={layerClassNames(layer, selected)}
    />

}

const renderLine = (layer, selected, key) => {
    const {x1, y1, x2, y2, stroke} = layer
    return <line key={key}
                 x1={x1}
                 y1={y1}
                 x2={x2}
                 y2={y2}
                 stroke={stroke}
                 className={layerClassNames(layer, selected)}
    />
}

const renderText = (layer, selected, key) => {

    return <TextDisplay key={key} layer={layer} selected={selected} />
}

const renderGroup = (layer, selected, key) => {
    const {fill, stroke, strokeWidth} = layer
    return <g key={key}/>
}

const renderPath = (layer, selected, key) => {
    const {d, stroke, fill} = layer
    return <path key={key} d={d} stroke={stroke} fill={fill} className={layerClassNames(layer, selected)}/>
}

const renderSurface = (layer, selected, key) => {
    const {x, y, width, height} = layer
    return <rect key={key}
                 x={x}
                 y={y}
                 width={width}
                 height={height}
                 fill={"white"}
                 stroke={"black"}
                 // className={layerClassNames(layer, selected)}
    />
}

const renderLayer = multi(
    ({type}) => type,
    method('layer:rectangle', renderRectangle),
    method('layer:ellipse', renderEllipse),
    method('layer:line', renderLine),
    method('layer:text', renderText),
    method('layer:group', renderGroup),
    method('layer:path', renderPath),
    method('surface', renderSurface),
)

export default renderLayer