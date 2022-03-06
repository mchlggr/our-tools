import React, {memo} from 'react';
import {Navigate} from "react-router-dom";
import pageRoutes from "../pageRoutes";


const LoginPage = (props) => {
    return (
        <div>
            LoginPage
            <Navigate to={pageRoutes.design.index()} />
        </div>
    );
}

LoginPage.propTypes = {

};

const LoginPageMemo = memo(LoginPage)
LoginPageMemo.displayName = "LoginPage"

export default LoginPageMemo;