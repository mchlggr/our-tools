import React, {memo, useCallback} from 'react';
import PropTypes from 'prop-types';


const LoginForm = (props) => {
    const {handleSubmit} = props
    const loading = false

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        const values = {};
        const form = new FormData(e.target);
        form.forEach((val, key) => (values[key] = val));
        handleSubmit({...values, grant_type: "password"})
    }, [handleSubmit])

    return (
        <form onSubmit={onSubmit}>
            <input placeholder={'email'} name={'email'}/><br/>
            <input placeholder={'password'} name={'password'}/><br/>
            <button type={'submit'} disabled={loading}>
                Login
            </button>
        </form>
    );
}

LoginForm.propTypes = {};

const LoginFormMemo = memo(LoginForm)
LoginFormMemo.displayName = "LoginForm"

export default LoginFormMemo;

// enctype="multipart/form-data"