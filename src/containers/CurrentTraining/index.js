import React from 'react';
import {connect} from "react-redux";

class CurrentTraining extends React.Component {
    render() {
        const {currentTraining, exercisesList} = this.props;
        return <React.Fragment>
            <h1>{`Текущих упражнений: ${currentTraining.length}`}</h1>
            {currentTraining.map((exercise) => {
                const data = exercisesList[exercise.id];

                return <div>{data.name}</div>
            })}
        </React.Fragment>;
    }
}

const mapStateToProps = state => {
    return {
        currentTraining: state.training.currentTraining,
        exercisesList: state.exercise.exercises,
    };
};


export default connect(mapStateToProps)(CurrentTraining);
