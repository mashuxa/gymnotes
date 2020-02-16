import React from 'react';
import {connect} from "react-redux";

class History extends React.Component {
    render() {
        return <React.Fragment>
            <h1>History</h1>
          </React.Fragment>
    }
}

const mapStateToProps = state => {
    return {
        state: state
    };
};

export default connect(mapStateToProps)(History);
