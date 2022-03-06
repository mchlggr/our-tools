import React, {memo} from 'react';
import PropTypes from 'prop-types';


const ToolbarDisplay = (props) => {
    return (
        <div></div>
    );
}

ToolbarDisplay.propTypes = {

};

const ToolbarDisplayMemo = memo(ToolbarDisplay)
ToolbarDisplayMemo.displayName = "ToolbarDisplay"

export default ToolbarDisplayMemo;