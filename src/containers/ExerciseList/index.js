import React, {useState, useEffect} from 'react';
import ExerciseConfigurator from "../../components/ExerciseConfigurator";
import Button from "../../components/Button";
import Exercise from "../../components/Exercise";
import IndexedDB from "../../api/indexedDB";
import {INDEXED_DB_TABLES} from "../../constants";

export default () => {
  const [isVisibleConfigurator, toggleConfigurator] = useState(false);
  const [configuratorData, changeConfiguratorData] = useState({
    type: "strength",
    name: ""
  });
  const [exercises, updateExercises] = useState([]);
  const getExercises = async () => {
    updateExercises(await IndexedDB.getData(INDEXED_DB_TABLES.exercises));
  };

  useEffect(() => {
    getExercises();
  }, []);

  const showConfigurator = () => {
    toggleConfigurator(true);
  };
  const hideConfigurator = () => {
    toggleConfigurator(false);
  };
  const deleteExercise = async (id) => {
    try {
      await IndexedDB.deleteData(INDEXED_DB_TABLES.exercises, id);
      updateExercises(await IndexedDB.getData(INDEXED_DB_TABLES.exercises));
    } catch (e) {
      console.warn(e);
    }
  };

  const editExercise = (id, type, name) => {
    changeConfiguratorData({id, type, name});
    showConfigurator();
  };

  return <React.Fragment>
    <main className="main">
      <h1>Exercise List</h1>
      {isVisibleConfigurator &&
      <ExerciseConfigurator data={configuratorData} updateExercises={updateExercises} hideConfigurator={hideConfigurator} />}
      <section>{exercises.map(exercise =>
        <Exercise key={exercise.id} data={exercise} deleteExercise={deleteExercise} editExercise={editExercise} />)}
      </section>
    </main>
    <Button type="add" onClick={showConfigurator} />
  </React.Fragment>
}
