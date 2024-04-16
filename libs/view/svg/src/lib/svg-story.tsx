import React from 'react';
import PropTypes from 'prop-types';


function SvgStoryDecorator(Story: React.ComponentType) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <svg
           height={'100%'}
           width={'100%'}
           viewBox="0 0 100 100"
           xmlns="http://www.w3.org/2000/svg">
        <Story />
      </svg>
    </div>
  );
}

export default SvgStoryDecorator;
