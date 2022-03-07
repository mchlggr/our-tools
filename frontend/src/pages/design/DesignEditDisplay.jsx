import React, {memo, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import ToolbarContainer from "../../components/ToolbarContainer";
import StageContainer from "../../components/StageContainer";
import HistoryContainer from "../../components/HistoryContainer";
import Layout from "../../components/Layout";
import PointerProvider from "../../providers/PointerProvider";
import ModelProvider from "../../providers/ModelProvider";
import StageHotkeys from "../../components/StageHotkeys";
import useScrollBlock from "../../hooks/useScrollBlock";
import useMount from "../../hooks/useMount";


const DesignEditDisplay = (props) => {
    const {designId} = props
    const [blockScroll, allowScroll] = useScrollBlock()
    useEffect(() => {
        blockScroll()
        return () => {
            allowScroll()
        }
    }, [])

    // TODO: put contentEditable into context
    return (
        <>
            <Layout.Container>
                <Layout.Header>
                    <ToolbarContainer designId={designId}/>
                </Layout.Header>
                <Layout.Content className={"design-stage-wrapper"}
                    // contentEditable={"true"}
                    // suppressContentEditableWarning={true}
                >
                    <ModelProvider designId={designId}>
                        <PointerProvider designId={designId}>
                            <StageHotkeys designId={designId}>
                                <StageContainer designId={designId}/>
                            </StageHotkeys>
                        </PointerProvider>
                    </ModelProvider>
                    <HistoryContainer designId={designId}/>
                </Layout.Content>
                {/*<Layout.Footer>*/}
                {/*    Go Back to All Designs | Save Design*/}
                {/*</Layout.Footer>*/}
            </Layout.Container>
        </>
    );
}

DesignEditDisplay.propTypes = {};

const DesignEditDisplayMemo = memo(DesignEditDisplay)
DesignEditDisplayMemo.displayName = "DesignEditDisplay"

export default DesignEditDisplayMemo;