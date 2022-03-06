import React, {memo} from 'react';
import PropTypes from 'prop-types';


const ToolbarContainer = (props) => {
    return (
        <div>
            V
        </div>
    );
}

ToolbarContainer.propTypes = {

};

const ToolbarContainerMemo = memo(ToolbarContainer)
ToolbarContainerMemo.displayName = "ToolbarContainer"

export default ToolbarContainerMemo;