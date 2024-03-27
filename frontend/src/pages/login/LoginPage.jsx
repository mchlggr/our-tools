import React, {memo, useCallback} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import pageRoutes from "../pageRoutes";
import Layout from "../../components/Layout";
import {useDispatch} from "react-redux";
import LoginForm from "./LoginForm";
import {login} from "../../actions/auth";


const LoginPage = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = useCallback((values) => {
        dispatch(login('auth', values)).then(() => navigate(pageRoutes.design.index()))
    }, [dispatch, navigate])

    return (
        <>
            <Layout.Container>
                <Layout.Header>
                    Login
                </Layout.Header>
                <Layout.Content>
                    LoginPage
                    <LoginForm handleSubmit={onSubmit}/>
                </Layout.Content>
            </Layout.Container>

        </>
    );
}

LoginPage.propTypes = {};

const LoginPageMemo = memo(LoginPage)
LoginPageMemo.displayName = "LoginPage"

export default LoginPageMemo;

<Navigate to={pageRoutes.design.index()}/>