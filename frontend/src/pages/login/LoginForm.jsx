import React, {memo, useCallback} from 'react';
import PropTypes from 'prop-types';


const LoginForm = (props) => {
    const {handleSubmit} = props
    const loading = false

    const onSubmit = useCallback( (values)=>{
        //TODO: validate form values
        handleSubmit(values)
    }, [handleSubmit])

    return (
        <form onSubmit={onSubmit}>
            <input name={'email'} />
            <input name={'password'} />
            <button type={'submit'} disabled={loading} >
                Login
            </button>
        </form>
    );
}

LoginForm.propTypes = {

};

const LoginFormMemo = memo(LoginForm)
LoginFormMemo.displayName = "LoginForm"

export default LoginFormMemo;