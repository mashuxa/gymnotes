import React, {useState} from 'react';
import {TYPES} from "../../constants";
import Button from "../../components/Button";
import './style.scss';

export default function (props) {
  const [exerciseName, setExerciseName] = useState('');
  const options = Object.keys(TYPES).map((propName) => {
    return <option value={propName} key={propName}>{TYPES[propName].name}</option>
  });
  const resetAndHideConfigurator = () => {
    setExerciseName('');
    props.hideConfigurator();
  };

  const addToIndexDB = () => {
    console.warn('Добавить логику для index db');
  };

  const updateStateFromIndexDB = () => {
    console.warn('Обновить данные с indexDB, во время загрузки показывать прелоудер');
  };

  const handleAddNewExercise = () => {
    addToIndexDB();
    resetAndHideConfigurator();
    updateStateFromIndexDB();
  };

  return (
    <form className="exercise-configurator">
      <fieldset>
        <label htmlFor="">Название упражнения</label>
        <input type="text" value={exerciseName} onChange={(e)=>{setExerciseName(e.currentTarget.value)}}/>
      </fieldset>
      <fieldset>
        <label htmlFor="">Тип упражнения</label>
        <select name="" id="">
          {options}
        </select>
      </fieldset>
      <Button type="cancel" handleClick={resetAndHideConfigurator}/>
      <Button type="apply" handleClick={handleAddNewExercise}/>
    </form>
  );
}
