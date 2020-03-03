import React from 'react';
import {connect} from "react-redux";
import ExerciseCard from "../../components/ExerciseCard";
import Button from "../../components/Button";
import {setExercisesToTraining, deleteCurrentTrainingExercise, putCurrentTraining} from "../../actions/application";

class CurrentTraining extends React.Component {
  render() {
    const {currentTraining} = this.props;

    return <React.Fragment>
      <h1>{`Текущих упражнений: ${currentTraining.length}`}</h1>
      {currentTraining.map((exercise, index) => {
        const removeFromTraining = () => {
          this.props.deleteCurrentTrainingExercise(exercise.id);
        };
        const updateExercises = (values) => {
          const updatedExercises = [...this.props.currentTraining];

          updatedExercises[index].values = values;
          this.props.setExercisesToTraining(updatedExercises);
          updatedExercises.forEach(exercise => this.props.saveTraining(exercise));
        };

        return <ExerciseCard key={exercise.id} data={exercise} isEditable={true} removeFromTraining={removeFromTraining} onChange={updateExercises}/>;
      })}
      <Button type="end" onClick={() => {
        console.warn('finish training and save')
      }}/>
    </React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    currentTraining: state.training.currentTraining,
    exercisesList: state.exercise.exercises,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCurrentTrainingExercise: (id) => dispatch(deleteCurrentTrainingExercise(id)),
    setExercisesToTraining: (exercises) => dispatch(setExercisesToTraining(exercises)),
    saveTraining: (exercises) => dispatch(putCurrentTraining(exercises)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentTraining);
