import React from 'react';
import {connect} from "react-redux";
import ExerciseCard from "../../components/ExerciseCard";
import Button from "../../components/Button";
import {deleteCurrentTrainingExercise} from "../../actions/application";

class CurrentTraining extends React.Component {
  render() {
    const {currentTraining, exercisesList} = this.props;
    return <React.Fragment>
      <h1>{`Текущих упражнений: ${currentTraining.length}`}</h1>
      {currentTraining.map((exercise) => {
        const data = exercisesList[exercise.typeId];
        const removeFromTraining = () => {
          this.props.deleteCurrentTrainingExercise(exercise.id);
        };

        return <ExerciseCard key={exercise.id} data={data} isEditable={true} removeFromTraining={removeFromTraining}/>;
      })}
      <Button type="save" onClick={() => {
        console.warn('save data in current training')
      }}/>
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
    deleteCurrentTrainingExercise: (id) => dispatch(deleteCurrentTrainingExercise(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentTraining);
