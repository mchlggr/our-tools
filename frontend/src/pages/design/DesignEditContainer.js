import React, {memo, useCallback, useMemo} from 'react';
import useResource from "../../hooks/useResource";
import {RESOURCE_ALIAS} from "../../constants/resource";
import useMount from "../../hooks/useMount";
import StageContainer from "../../components/StageContainer";
import * as PropTypes from "prop-types";
import HistoryContainer from "../../components/HistoryContainer";
import ToolbarContainer from "../../components/ToolbarContainer";
import DesignEditDisplay from "./DesignEditDisplay";



HistoryContainer.propTypes = {};


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