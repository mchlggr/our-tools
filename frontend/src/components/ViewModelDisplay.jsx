import React, {memo, useCallback} from 'react';
import PropTypes from 'prop-types';
import {getViewEntities, getViewSelection} from "../selectors/model";
import ModelDisplay from "./ModelDisplay";
import { useModel } from "../contexts/modelStore";


const ViewModelDisplay = (props) => {
    const entities = useModel(getViewEntities)
    const selection = useModel(getViewSelection)

    return (
        <>
            <ModelDisplay entities={entities}
                          selection={selection}/>
        </>
    );
}

ViewModelDisplay.propTypes = {

};

const ViewModelDisplayMemo = memo(ViewModelDisplay)
ViewModelDisplayMemo.displayName = "ViewModelDisplay"

export default ViewModelDisplayMemo;