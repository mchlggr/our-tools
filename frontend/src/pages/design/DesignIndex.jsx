import React, {memo} from 'react';
import {Link} from "react-router-dom";
import pageRoutes from "../pageRoutes";
import Layout from "../../components/Layout";
import DesignLibrary from "./components/DesignLibrary";
import useResource from "../../hooks/useResource";
import useMount from "../../hooks/useMount";
import useResourceList from "../../hooks/useResourceList";
import Heading from "../../components/Heading";
import {emptyArray, emptyObject} from "../../utils/empty";


const DesignIndex = (props) => {
    const {fetchResourceList, resourceList = emptyObject} = useResourceList('designs')

    useMount(() => {
        fetchResourceList({
            include: ["user", "team"]
        })
    })

    const designIds = []

    return (
        <Layout.Container>
            <Layout.Header>
                <Heading>
                    My Designs
                </Heading>
            </Layout.Header>
            <Layout.Content>
                <Link to={pageRoutes.design.edit(1)}>Mock Design</Link>
                <DesignLibrary designList={resourceList} />
            </Layout.Content>
        </Layout.Container>
    );
}

DesignIndex.propTypes = {};

const DesignIndexMemo = memo(DesignIndex)
DesignIndexMemo.displayName = "DesignIndex"

export default DesignIndexMemo;