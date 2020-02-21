import React from 'react';
import Button from "../../components/Button";
import {TYPES} from "../../constants";
import './style.scss';

export default function (props) {
  const {id, type, name} = props.data;
  const deleteExercise = () => {
    props.deleteExercise(id);
  };
  const editExercise = () => {
    props.editExercise({type, name, id});
  };

  return (
    <article className="exercise">
      <div className="exercise__column">
        <h1>{name}</h1>
        <span>{TYPES[type].name}</span>
      </div>
      <div className="exercise__column">
        <Button type="edit" onClick={editExercise}/>
        <Button type="delete" onClick={deleteExercise} />
      </div>
    </article>
  );
}
