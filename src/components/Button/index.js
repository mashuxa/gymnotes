import React from 'react';
import classnames from 'classnames';
import './style.scss';

export default (props) => {
  const baseClassName = classnames(props.className, "button", `button--${props.type}`);
  const getText = () => {
    switch(props.type) {
      case 'add':
        return "+";

      default:
        return props.type;
    }
  };

  return <button title={props.title} type="button" className={baseClassName} onClick={props.onClick}>{getText()}</button>;
}
