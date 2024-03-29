// Dependencies
import {filter, groupBy, keyBy} from "lodash";
import { Entity, EntitySelection } from './types';
import { LayerEntity } from './layer-types';
import { WorldModel } from './world-types';

// ---

export const typePatternLayer = /layer:/

export const filterLayers = (entities: Entity[]) : LayerEntity[] => entities.filter(({type}) => typePatternLayer.test(type))

export const filterSelectionLayers = ({entities, selection}: WorldModel) => {
    const layers = filterLayers(entities)
    return filter(layers, ({ uuid }) => selection.has(uuid))
}

//TODO: export const groupLayersBySurface = (layers: LayerEntity[]) => groupBy(layers, 'surface_uuid')
