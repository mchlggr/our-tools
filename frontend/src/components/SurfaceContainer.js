// Conceptually this is the Top Level Convas Logic

import React, {memo} from 'react';
import PropTypes from 'prop-types';


const SurfaceContainer = (props) => {
    const {designId, children} = props


    return (
        <>{children}</>
    );
}

SurfaceContainer.propTypes = {

};

const SurfaceContainerMemo = memo(SurfaceContainer)
SurfaceContainerMemo.displayName = "SurfaceContainer"

export default SurfaceContainerMemo;