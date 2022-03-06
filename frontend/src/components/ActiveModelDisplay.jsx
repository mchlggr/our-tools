import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {selectActiveEntities, selectActiveSelection} from "../selectors/design";
import ModelDisplay from "./ModelDisplay";
import {useSelector} from "react-redux";


const ActiveModelDisplay = (props) => {

    const entities = useSelector(selectActiveEntities)
    const selection = useSelector(selectActiveSelection)

    return (
        <>
            <ModelDisplay entities={entities} selection={selection}/>
        </>
    );
}

ActiveModelDisplay.propTypes = {};

const ActiveModelDisplayMemo = memo(ActiveModelDisplay)
ActiveModelDisplayMemo.displayName = "ActiveModelDisplay"

export default ActiveModelDisplayMemo;