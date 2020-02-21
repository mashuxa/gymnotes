import React from 'react';
import {TYPES} from "../../constants";
import Button from "../../components/Button";
import './style.scss';

export default function (props) {
  const {name, type} = props.data;
  const options = Object.keys(TYPES).map((propName) => {
    return <option value={propName} key={propName}>
      {TYPES[propName].name}
    </option>
  });

  return (
    <form className="exercise-configurator">
      <fieldset>
        <label htmlFor="">Название упражнения:</label><br/>
        <input value={name} onChange={props.onChangeConfigurator} name="name" type="text"/>
      </fieldset>
      <fieldset>
        <label htmlFor="">Тип упражнения:</label><br/>
        <select value={type} onChange={props.onChangeConfigurator} name="type">{options}</select>
      </fieldset>
      <Button type="cancel" onClick={props.hideConfigurator}/>
      <Button type="apply" onClick={props.putExercise}/>
    </form>
  );
}
