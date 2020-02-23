import React from 'react';
import {connect} from "react-redux";

class CurrentTraining extends React.Component {
    render() {
        const {currentTraining, exercisesList} = this.props;
        return <React.Fragment>
            {/*{console.warn(exercisesList)}*/}
            <h1>{`Текущих упражнений: ${currentTraining.length}`}</h1>
            {/*{console.warn(currentTraining)}*/}
            {currentTraining.map((exercise) => {
                const data = exercisesList[exercise.id];
                console.warn(data);
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
