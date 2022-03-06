import React, {memo, useCallback} from 'react';
import PropTypes from 'prop-types';
import ToolbarContainer from "../../components/ToolbarContainer";
import StageContainer from "../../components/StageContainer";
import HistoryContainer from "../../components/HistoryContainer";
import Layout from "../../components/Layout";
import PointerProvider from "../../providers/PointerProvider";
import ModelProvider from "../../providers/ModelProvider";
import StageHotkeys from "../../components/StageHotkeys";


const DesignEditDisplay = (props) => {
    const {designId} = props

    return (
        <>
            <Layout.Container>
                <Layout.Header>
                    <ToolbarContainer designId={designId}/>
                </Layout.Header>
                <Layout.Content>
                    <ModelProvider designId={designId}>
                        <PointerProvider designId={designId}>
                            <StageHotkeys designId={designId}>
                                <StageContainer designId={designId}/>
                            </StageHotkeys>
                        </PointerProvider>
                    </ModelProvider>
                </Layout.Content>
                <Layout.Footer>
                    <HistoryContainer designId={designId}/>
                </Layout.Footer>
            </Layout.Container>
        </>
    );
}

DesignEditDisplay.propTypes = {};

const DesignEditDisplayMemo = memo(DesignEditDisplay)
DesignEditDisplayMemo.displayName = "DesignEditDisplay"

export default DesignEditDisplayMemo;