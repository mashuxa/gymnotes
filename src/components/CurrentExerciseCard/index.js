import React, {useState} from 'react';
import {TYPES} from "../../constants";
import Button from "../../components/Button";
import './style.scss';

export default function (props) {
  const {data, exercise} = props;
  const {type} = data;
  const [values, setValues] = useState(exercise.values);
  const update = (e) => {
    const {name, value} = e.currentTarget;

    setValues({...values, [name]: value});
  };
  const deleteExercise = () => {
    props.deleteExercise(exercise.id);
  };

  return (
    <form className="exercise">
      <h4>{data.name}</h4>
      {Object.keys(values).map((valueName) => {
        return <label key={valueName}>
          {TYPES[type].params[valueName].name}
          <input type="number" value={values[valueName]} name={valueName} onChange={update}/>
        </label>
      })}
      <Button type="delete" onClick={deleteExercise} />
      <hr/>
    </form>
  );
}
