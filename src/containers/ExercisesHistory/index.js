import React from 'react';
import {connect} from "react-redux";
import {TYPES} from "../../constants";
import ExerciseCard from "../../components/ExerciseCard";
import {putCurrentTraining} from "../../actions/application";

class ExercisesHistory extends React.Component {
  renderEmptyExercise(data) {
    return <ExerciseCard key={data.id} data={data} values={null} date={null} addToCurrentTraining={this.props.addToCurrentTraining} />;
  }

  renderExercisesSlider(data) {
    return <ExerciseCard key={data.id} data={data} date={null} />;
  }

  render() {
    const {types, exercisesHistory} = this.props;

    return <React.Fragment>
      <main className="main">
        <h1>История упражнений:</h1>
        {Object.keys(types).map((id) => exercisesHistory[id] ? this.renderExercisesSlider(types[id]) : this.renderEmptyExercise(types[id]))}
      </main>
    </React.Fragment>
  }
}

const mapStateToProps = state => {
  return {
    types: state.exercise.exercises,
    exercisesHistory: state.exercise.exercisesHistory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCurrentTraining: (data) => dispatch(putCurrentTraining(data))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesHistory);
