import React, {memo, useCallback, useEffect} from 'react';

// Components
import ToolbarContainer from "../../components/ToolbarContainer";
import StageContainer from "../../components/StageContainer";
import HistoryContainer from "../../components/HistoryContainer";
import Layout from "../../components/Layout";
import useScrollBlock from "../../hooks/useScrollBlock";
import ModelProvider from "../../providers/ModelProvider";
import PointerProvider from "../../providers/PointerProvider";


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
                <Layout.Content // className={"design-stage-wrapper"}
                    // contentEditable={"true"}
                    // suppressContentEditableWarning={true}
                >
                    <ModelProvider designId={designId}>
                        <PointerProvider designId={designId}>
                            <StageContainer designId={designId}/>
                            <HistoryContainer designId={designId}/>
                        </PointerProvider>
                    </ModelProvider>
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