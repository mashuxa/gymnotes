import React from 'react';
import {connect} from "react-redux";
import ExerciseCard from "../../components/ExerciseCard";
import {putCurrentTraining} from "../../actions/application";

class ExercisesHistory extends React.Component {
  renderExercisesSlider(data) {
    return <ExerciseCard key={data.id} data={data} date={null} />;
  }

  render() {
    const {types, exercisesHistory} = this.props;

    return <React.Fragment>
      <main className="main">
        <h1>История упражнений:</h1>
        {
          Object.keys(types).map((id) => {
            const {type, name} = types[id];
            const data = {type, name, typeId: id};
            const addToTraining = () => {
              this.props.addToTraining(data);
            };
            return exercisesHistory[id] ? this.renderExercisesSlider(types[id]) :
              <ExerciseCard key={id} data={data} addToTraining={addToTraining} isEditable={false} />
          })
        }
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
    addToTraining: (data) => dispatch(putCurrentTraining(data))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesHistory);
