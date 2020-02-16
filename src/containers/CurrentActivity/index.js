import React from 'react';
import {connect} from "react-redux";

class CurrentActivity extends React.Component {
    render() {
        return <h1>Current Activity</h1>;
    }
}

const mapStateToProps = state => {
    return {
        state: state
    };
};

export default connect(mapStateToProps)(CurrentActivity);
