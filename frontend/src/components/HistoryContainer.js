// Logic for Design History

// Deps
import React from 'react';
import {connect} from "react-redux";

// Selectors
import {selectActiveAt, selectActiveHistory} from "../selectors/design";

// Components
import HistoryDisplay from "./HistoryDisplay";

// ---

const mapStateToProps = (state) => {
    const history = selectActiveHistory(state)
    const at = selectActiveAt(state)
    return {history, at}
}

export default connect(mapStateToProps)(HistoryDisplay);