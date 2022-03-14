import React, {memo} from 'react';
import PropTypes from 'prop-types';


const Heading = (props) => {
    const {children} = props
    return (
        <h1 className={"text-3xl font-bold underline"}>{children}</h1>
    );
}

Heading.propTypes = {

};

const HeadingMemo = memo(Heading)
HeadingMemo.displayName = "Heading"

export default HeadingMemo;