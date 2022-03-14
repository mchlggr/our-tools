import React, {memo} from 'react';
import {Link} from "react-router-dom";
import pageRoutes from "../pageRoutes";
import Layout from "../../components/Layout";
import DesignLibrary from "./components/DesignLibrary";


const DesignIndex = (props) => {


    const designIds = []

    return (
        <Layout.Container>
            <Layout.Header>
                My Designs
            </Layout.Header>
            <Layout.Content>
                <Link to={pageRoutes.design.edit(1)}>Mock Design</Link>
                <DesignLibrary designIds={designIds} />
            </Layout.Content>
        </Layout.Container>
    );
}

DesignIndex.propTypes = {};

const DesignIndexMemo = memo(DesignIndex)
DesignIndexMemo.displayName = "DesignIndex"

export default DesignIndexMemo;