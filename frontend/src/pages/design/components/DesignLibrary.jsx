import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {emptyArray, emptyObject} from "../../../utils/empty";


const DesignLibrary = (props) => {
    const {designList} = props
    const { data = emptyArray} = designList || emptyObject

    return (
        <div></div>
    );
}

DesignLibrary.propTypes = {

};

const DesignLibraryMemo = memo(DesignLibrary)
DesignLibraryMemo.displayName = "DesignLibrary"

export default DesignLibraryMemo;