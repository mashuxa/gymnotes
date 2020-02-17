import React, {useState} from 'react';
import {INDEXED_DB_TABLES, TYPES} from "../../constants";
import Button from "../../components/Button";
import './style.scss';
import IndexedDB from "../../api/indexedDB";

export default function (props) {
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseType, setExerciseType] = useState('strength');
  const options = Object.keys(TYPES).map((propName) => {
    return <option value={propName} key={propName}>{TYPES[propName].name}</option>
  });
  const resetAndHideConfigurator = () => {
    setExerciseName('');
    props.hideConfigurator();
  };

  const addAndUpdateIndexDB = async () => {
    try {
      await IndexedDB.addData(INDEXED_DB_TABLES.exercises, {type: exerciseType, name: exerciseName});
      resetAndHideConfigurator();
      props.updateExercises(await IndexedDB.getData(INDEXED_DB_TABLES.exercises));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form className="exercise-configurator">
      <fieldset>
        <label htmlFor="">Название упражнения</label>
        <input type="text" value={exerciseName} onChange={(e) => {
          setExerciseName(e.currentTarget.value)
        }}/>
      </fieldset>
      <fieldset>
        <label htmlFor="">Тип упражнения</label>
        <select onChange={(e) => {
          setExerciseType(e.currentTarget.value)
        }} value={exerciseType}>
          {options}
        </select>
      </fieldset>
      <Button type="cancel" handleClick={resetAndHideConfigurator}/>
      <Button type="apply" handleClick={addAndUpdateIndexDB}/>
    </form>
  );
}
