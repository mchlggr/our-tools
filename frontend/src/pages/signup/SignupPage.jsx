import React, {memo} from 'react';


const SignupPage = (props) => {
    return (
        <div>SignupPage</div>
    );
}

SignupPage.propTypes = {

};

const SignupPageMemo = memo(SignupPage)
SignupPageMemo.displayName = "SignupPage"

export default SignupPageMemo;