import React from 'react';
import PropTypes from 'prop-types';


function SvgStoryDecorator(Story: React.ComponentType) {
  return (
    <svg viewBox="0 0 100 100"  xmlns="http://www.w3.org/2000/svg">
     <Story/>
    </svg>
  );
}

export default SvgStoryDecorator;
