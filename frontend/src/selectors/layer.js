import {filter, groupBy, keyBy} from "lodash";

export const typePatternLayer = /layer:/

export const filterLayers = (entities) => entities.filter(({type}) => typePatternLayer.test(type))

export const filterSelectionLayers = ({entities, selection}) => {
    const layers = filterLayers(entities)
    return filter(layers, ({uuid}) => selection.has(uuid))
}

export const groupLayersBySurface = (layers) => groupBy(layers, 'surface_uuid')