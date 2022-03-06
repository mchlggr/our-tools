import React, {memo} from 'react';
import {Link} from "react-router-dom";
import pageRoutes from "../pageRoutes";


const DesignIndex = (props) => {
    return (
        <div>
            <Link to={pageRoutes.design.edit(1)} >Mock Design</Link>
        </div>
    );
}

DesignIndex.propTypes = {

};

const DesignIndexMemo = memo(DesignIndex)
DesignIndexMemo.displayName = "DesignIndex"

export default DesignIndexMemo;