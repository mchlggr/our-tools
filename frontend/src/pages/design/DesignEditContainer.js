import React, {memo, useCallback, useMemo} from 'react';

// Dependencies
import * as PropTypes from "prop-types";

// Constants
import {RESOURCE_ALIAS} from "../../constants/resource";

// Hooks
import useResource from "../../hooks/useResource";
import useMount from "../../hooks/useMount";

// Components
import StageContainer from "../../components/StageContainer";
import HistoryContainer from "../../components/HistoryContainer";
import ToolbarContainer from "../../components/ToolbarContainer";
import DesignEditDisplay from "./DesignEditDisplay";

// ---

const DesignEditContainer = (props) => {

    const resourceMeta = useMemo(() => {
        return {
            alias: RESOURCE_ALIAS.ACTIVE_DESIGN
        }
    }, [])

    const {resource, resourceId} = useResource('designs', resourceMeta)

    useMount(()=>{
        //TODO: fetch design from server
    })

    return <DesignEditDisplay designId={resourceId} />
}

DesignEditContainer.propTypes = {};

const DesignEditMemo = memo(DesignEditContainer)
DesignEditMemo.displayName = "DesignEditContainer"

export default DesignEditMemo;