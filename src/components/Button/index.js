import React from 'react';
import './style.scss';

export default (props) => {
  switch(props.type) {
    case 'add':
      return <button type="button" className="button button--add" onClick={props.handleClick}>+</button>;
    case 'cancel':
      return <button type="button" className="button button--regular" onClick={props.handleClick}>Cancel</button>;
    case 'apply':
      return <button type="button" className="button button--primary" onClick={props.handleClick}>Apply</button>;
    default:
      return <button type="button" className="button" onClick={props.handleClick}>Button</button>;
  }
}
