import React, {memo, useMemo} from 'react';

// Dependencies
import PropTypes from 'prop-types';
import {map} from 'lodash'

// Utils
import {emptyArray, emptySet} from "../utils/empty";


// Helpers
import {filterLayers, groupLayersBySurface} from "../selectors/layer";

// Methods
import renderLayer from "../methods/renderLayer";

// Components
import LayerDisplay from "./layers/LayerDisplay";
import SurfaceContainer from "./SurfaceContainer";

// ---

const ModelDisplay = (props) => {
    const {
        selection,
        entities
    } = props

    const layers = useMemo(() => filterLayers(entities), [entities])
    //const layersBySurface = useMemo(() => groupLayersBySurface(layers), [layers])

    return (
        <>
            {/*{map(layersBySurface, (layers, surfaceUuid) => {*/}
            {/*    return <SurfaceContainer key={surfaceUuid} surfaceUuid={surfaceUuid}>*/}
            {map(layers, (layer, index) => {
                const {uuid} = layer
                const selected = selection.has(uuid)
                return <LayerDisplay key={uuid} layer={layer} selected={selected}/>
            })}
            {/*</SurfaceContainer>*/}
            {/*})}*/}
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
