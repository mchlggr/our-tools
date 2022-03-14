import React, {memo, useCallback} from 'react';
import {Navigate} from "react-router-dom";
import pageRoutes from "../pageRoutes";
import Layout from "../../components/Layout";
import {useDispatch} from "react-redux";


const LoginPage = (props) => {

    const displatch = useDispatch()
    //TODO: const onSubmit = useCallback((values)=>{
    //     const payload = values
    //     displatch(login('auth', payload))
    // },[displatch])

    return (
        <>
            <Layout.Container>
                <Layout.Header>
                    Login
                </Layout.Header>
                <Layout.Content>
                    LoginPage
                </Layout.Content>e
            </Layout.Container>

        </>
    );
}

LoginPage.propTypes = {};

const LoginPageMemo = memo(LoginPage)
LoginPageMemo.displayName = "LoginPage"

export default LoginPageMemo;

<Navigate to={pageRoutes.design.index()}/>