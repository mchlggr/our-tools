import React, {memo, useMemo} from 'react';
import PropTypes from 'prop-types';
import {map} from 'lodash'
import {emptyArray, emptySet} from "../utils/empty";
import renderLayer from "../methods/renderLayer";
import SurfaceContainer from "./SurfaceContainer";
import {filterLayers, groupLayersBySurface} from "../selectors/layer";



const ModelDisplay = (props) => {
    const {
        selection,
        entities
    } = props

    const layers = useMemo(() => filterLayers(entities), [entities])
    const layersBySurface = useMemo(() => groupLayersBySurface(layers), [layers])

    return (
        <>
            {map(layersBySurface, (layers, surfaceUuid) => {
                return <SurfaceContainer key={surfaceUuid} surfaceUuid={surfaceUuid}>
                    {map(layers, (layer, index) => {
                        const {uuid} = layer
                        const selected = selection.has(uuid)
                        return renderLayer(layer, selected, index)
                    })}
                </SurfaceContainer>
            })}
        </>
    );
}

ModelDisplay.defaultProps = {
    entities: emptyArray,
    selection: emptySet
}

ModelDisplay.propTypes = {
    entities: PropTypes.array,
    selection: PropTypes.any
};

const StageDisplayMemo = memo(ModelDisplay)
StageDisplayMemo.displayName = "ModelDisplay"

export default StageDisplayMemo;
