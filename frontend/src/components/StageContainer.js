import React, {memo, useMemo} from 'react';
import {useSelector} from "react-redux";
import {selectActiveEntities, selectActiveSelection} from "../selectors/design";
import ModelDisplay from "./ModelDisplay";
import ModelProvider from "../providers/ModelProvider";
import PointerDisplay from "./PointerDisplay";
import PointerContext from "../contexts/PointerContext";
import PointerProvider from "../providers/PointerProvider";
import {useContextSelector} from "use-context-selector";
import ActiveModelDisplay from "./ActiveModelDisplay";
import ViewModelDisplay from "./ViewModelDisplay";

const StageContainer = (props) => {
    const {designId} = props

    const onPointerDown = useContextSelector(PointerContext, ({onPointerDown}) => onPointerDown)
    const onPointerMove = useContextSelector(PointerContext, ({onPointerMove}) => onPointerMove)
    const onPointerUp = useContextSelector(PointerContext, ({onPointerUp}) => onPointerUp)

    return <svg className={"penumbra__design-stage"}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
    >
            <ViewModelDisplay/>
            <PointerDisplay/>
    </svg>
}


StageContainer.propTypes = {};

const StageContainerMemo = memo(StageContainer)
StageContainerMemo.displayName = "StageContainer"

export default StageContainerMemo;