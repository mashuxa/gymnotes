import React from 'react';
import {connect} from "react-redux";
import ExerciseCard from "../../components/ExerciseCard";

class ExercisesHistory extends React.Component {
  constructor(props) {
    super(props);
  }

  renderEmptyExercise(id){
      return <ExerciseCard data={this.props.types.find(el => el.id === id)}  date={'11-11-2020'} />;
  }

  renderExercisesSlider(exercises){
    return exercises.map(exercise => {
      return <ExerciseCard data={exercise} date={new Date()}
                           // values={}
      />;
    });
  }

  render() {
    return <React.Fragment>
      <h1>History of exercises</h1>
      {
        this.props.types.map(type => {
            const exercisesByType = this.props.exercises[type.id];

            return exercisesByType ? this.renderExercisesSlider(exercisesByType) : this.renderEmptyExercise(type.id);
        })
      }
    </React.Fragment>
  }
}

const mapStateToProps = state => {
  return {
    types: state.application.exercises,
    exercises: state.application.exercisesHistory,
  };
};

export default connect(mapStateToProps)(ExercisesHistory);
