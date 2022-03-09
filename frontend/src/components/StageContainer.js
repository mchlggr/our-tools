import React, {memo, useMemo} from 'react';
import {useSelector} from "react-redux";
import {selectActiveEntities, selectActiveSelection} from "../selectors/design";
import ModelDisplay from "./ModelDisplay";
import ModelProvider from "../providers/ModelProvider";
import PointerDisplay from "./PointerDisplay";
import PointerContext from "../contexts/PointerContext";
import PointerProvider from "../providers/PointerProvider";
import {useContextSelector} from "use-context-selector";
import StageDisplay from "./StageDisplay";
import StageHotkeys from "./StageHotkeys";


const StageContainer = (props) => {
    const {designId} = props

    const onPointerDown = useContextSelector(PointerContext, ({onPointerDown}) => onPointerDown)
    const onPointerMove = useContextSelector(PointerContext, ({onPointerMove}) => onPointerMove)
    const onPointerUp = useContextSelector(PointerContext, ({onPointerUp}) => onPointerUp)

    return <>
                <StageHotkeys designId={designId}>
                    <StageDisplay
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                        designId={designId}
                    />
                </StageHotkeys>
    </>
}


StageContainer.propTypes = {};

const StageContainerMemo = memo(StageContainer)
StageContainerMemo.displayName = "StageContainer"

export default StageContainerMemo;