import React, {memo} from 'react';
import PropTypes from 'prop-types';

// Methods
import renderLayer from "../../methods/renderLayer";

// ---

const LayerDisplay = (props) => {
    const {layer, selected} = props
    const {uuid} = layer
    return renderLayer(layer, selected, uuid)
}

LayerDisplay.propTypes = {
    layer: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired
};

const LayerDisplayMemo = memo(LayerDisplay)
LayerDisplayMemo.displayName = "LayerDisplay"

export default LayerDisplayMemo;