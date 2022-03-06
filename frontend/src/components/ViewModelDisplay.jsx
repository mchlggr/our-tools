import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {useContextSelector} from "use-context-selector";
import ModelContext from "../contexts/ModelContext";
import {getViewEntities, getViewSelection} from "../selectors/model";
import ModelDisplay from "./ModelDisplay";


const ViewModelDisplay = (props) => {

    const entities = useContextSelector(ModelContext, getViewEntities)
    const selection = useContextSelector(ModelContext, getViewSelection)

    console.log("v/entities",entities)

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