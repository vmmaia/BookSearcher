import React from 'react';

import './box.css';

const Box = (props) => {
  return <div className="box-wrapper">{props.children}</div>;
};

export default Box;
