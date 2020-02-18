import React from 'react';
import classnames from 'classnames';
import './style.scss';

export default (props) => {
  const baseClassName = classnames(props.className, "button", `button--${props.type}`);
  let text;

  switch(props.type) {
    case 'add':
      text = "+";
      break;

    default:
      text = props.type;
  }

  return <button type="button" className={baseClassName} onClick={props.onClick}>{text}</button>;
}
