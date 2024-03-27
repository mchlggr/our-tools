import React, {Fragment, memo} from 'react';
import {Link} from "react-router-dom";
import pageRoutes from "../pageRoutes";
import Layout from "../../components/Layout";
import DesignLibrary from "./components/DesignLibrary";
import useResource from "../../hooks/useResource";
import useMount from "../../hooks/useMount";
import useResourceList from "../../hooks/useResourceList";
import Heading from "../../components/Heading";
import {emptyArray, emptyObject} from "../../utils/empty";
import DesignIndexHeading from "./DesignIndexHeading";
import classNames from 'classnames'
import {Disclosure, Menu, Transition} from "@headlessui/react";
import {XIcon, BellIcon, MenuIcon} from "@heroicons/react/outline";
import MainNavigation from "../../components/MainNavigation";

const DesignIndex = (props) => {
    const {fetchResourceList, resourceList = emptyObject, createResource} = useResourceList('designs')

    useMount(() => {
        fetchResourceList({
            include: ["user", "team"]
        })
    })

    const designIds = []

    return (<>
            <MainNavigation/>
            <div className="min-h-full">
                <div className="py-10">
                    <DesignIndexHeading createDesign={createResource}/>
                    <main>
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            {/* Replace with your content */}
                            <div className="px-4 py-8 sm:px-0">
                                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"/>
                            </div>
                            {/* /End replace */}
                        </div>
                    </main>
                </div>
            </div>
            {/*<Layout.Container>*/}
            {/*    <Layout.Header>*/}
            {/*        <DesignIndexHeading/>*/}
            {/*    </Layout.Header>*/}
            {/*    <Layout.Content>*/}
            {/*        <Link to={pageRoutes.design.edit(1)}>Mock Design</Link>*/}
            {/*        <DesignLibrary designList={resourceList}/>*/}
            {/*    </Layout.Content>*/}
            {/*</Layout.Container>*/}
        </>
    );
}

DesignIndex.propTypes = {};

const DesignIndexMemo = memo(DesignIndex)
DesignIndexMemo.displayName = "DesignIndex"

export default DesignIndexMemo;