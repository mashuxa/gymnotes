import React, {useState} from 'react';
import {connect} from "react-redux";
import {TYPES} from "../../constants";
import ExerciseConfigurator from "../../components/ExerciseConfigurator";
import Button from "../../components/Button";
import Exercise from "../../components/Exercise";
import {deleteExercise, putExercise} from "../../actions/application";

const ExerciseList = (props) => {
  const initialExerciseValues = {
    type: Object.keys(TYPES)[0],
    name: "",
    id: null
  };
  const [isVisibleConfigurator, toggleConfigurator] = useState(false);
  const [exerciseData, changeExerciseData] = useState(initialExerciseValues);

  const showConfigurator = () => {
    toggleConfigurator(true);
  };
  const hideConfigurator = () => {
    toggleConfigurator(false);
    changeExerciseData(initialExerciseValues);
  };
  const onChangeConfigurator = (e) => {
    const {name, value} = e.currentTarget;
    changeExerciseData({...exerciseData, [name]: value});
  };
  const editExercise = (data) => {
    changeExerciseData(data);
    showConfigurator();
  };
  const deleteExercise = (id) => props.deleteExercise(id);
  const putExercise = () => {
    props.putExercise(exerciseData);
    hideConfigurator();
  };

  return <React.Fragment>
    <main className="main">
      <h1>Exercises List</h1>
      {isVisibleConfigurator &&
      <ExerciseConfigurator
        data={exerciseData}
        onChangeConfigurator={onChangeConfigurator}
        hideConfigurator={hideConfigurator}
        putExercise={putExercise}
      />}
      <section>
        {props.exercises.map(exercise =>
          <Exercise key={exercise.id}
                    data={exercise}
                    editExercise={editExercise}
                    deleteExercise={deleteExercise}
          />)}
      </section>
    </main>
    <Button type="add" onClick={showConfigurator}/>
  </React.Fragment>
};

const mapStateToProps = (state) => {
  return {
    exercises: state.application.exercises
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteExercise: (id) => dispatch(deleteExercise(id)),
    putExercise: (data) => dispatch(putExercise(data)),
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(ExerciseList);
