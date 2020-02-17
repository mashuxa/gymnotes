import React, {useState, useEffect} from 'react';
import ExerciseConfigurator from "../../components/ExerciseConfigurator";
import Button from "../../components/Button";
import IndexedDB from "../../api/indexedDB";
import {INDEXED_DB_TABLES} from "../../constants";

export default () => {
  const [isVisibleConfigurator, toggleConfigurator] = useState(false);
  const [exercises, updateExercises] = useState([]);
  const getExercises = async () => {
    updateExercises(await IndexedDB.getData(INDEXED_DB_TABLES.exercises));
  };

  useEffect(() => {
    getExercises();
  }, []);

  return <React.Fragment>
    <h1>Exercise List</h1>
    <Button type="add" handleClick={() => toggleConfigurator(true)}/>
    {isVisibleConfigurator &&
    <ExerciseConfigurator updateExercises={updateExercises} hideConfigurator={() => toggleConfigurator(false)}/>}
    <section>{exercises.map((el) => <div key={el.id}>{`${el.id} ${el.name} ${el.type}`}</div>)}</section>
  </React.Fragment>
}
