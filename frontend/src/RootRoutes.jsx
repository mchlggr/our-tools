import React, {memo} from 'react';
import {Routes, Route, Navigate} from "react-router";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import pageRoutes from "./pages/pageRoutes";
import DesignIndex from "./pages/design/DesignIndex";
import DesignEditContainer from "./pages/design/DesignEditContainer";


const RootRoutes = (props) => {
    return (<>
        <Routes>
            <Route path={pageRoutes.auth.login()}  element={<LoginPage/>} />
            <Route path={pageRoutes.auth.signup()}  element={<SignupPage/>} />
            <Route path={pageRoutes.design.index()}  element={<DesignIndex/>} />
            <Route path={pageRoutes.design.edit()}  element={<DesignEditContainer/>} />
        </Routes>
        </>
    );
}

RootRoutes.propTypes = {

};

const RootRoutesMemo = memo(RootRoutes)
RootRoutesMemo.displayName = "RootRoutes"

export default RootRoutesMemo;