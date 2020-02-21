import React from 'react';
import Button from "../../components/Button";
import {TYPES} from "../../constants";
import './style.scss';

export default function (props) {
  const {type, name, id} = props.data;
  const {params} = TYPES[type];
  const {values} = props;

  return (
    <article className="exercise">
      <div className="exercise__column">
        <h1>{name}</h1>
        <span>{TYPES[type].name}</span>
      </div>
      <div>
        {Object.keys(params).map((param) => {
          const {name, unit} = params[param];
          const value = (values && values[param]) || 0;

          return <p>{`${name}: ${value} ${unit}`}</p>
        })}
      </div>
      <div className="exercise__column">
        <i><b>{props.date}</b></i>
        <Button type="add" onClick={() => {
          console.warn("add to current workout");
        }}/>
      </div>
    </article>
  );
}
