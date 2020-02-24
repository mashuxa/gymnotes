import React from 'react';
import {TYPES} from "../../constants";
import Button from "../../components/Button";
import './style.scss';

export default function (props) {
  const {type, name, id} = props.data;
  const params = Object.keys(TYPES[type].params);
  const values = props.values ? props.values : params.reduce((accum, param)=> {
    accum[param] = 0;
    return accum;
  }, {});
  const addToCurrentTraining = () => {
    props.addToCurrentTraining({id: Date.now(), values, typeId: id});
  };

  return (
    <article className="exercise">
      <div className="exercise__column">
        <h1>{name}</h1>
        <span>{TYPES[type].name}</span>
      </div>
      <div>
        {params.map((param) => {
          const {name, unit} = TYPES[type].params[param];

          return <p key={param}>{`${name}: ${values[param]} ${unit}`}</p>
        })}
      </div>
      <div className="exercise__column">
        <b>{props.date}</b>
        <Button type="add" onClick={addToCurrentTraining}/>
      </div>
    </article>
  );
}
