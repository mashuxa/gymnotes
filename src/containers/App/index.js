import React from 'react';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import {fetchCurrentTraining, fetchExercises} from '../../actions/application';
import './normalize.scss';
import './grid.scss';
import './utilities.scss';

const App = (props) => {
  props.fetchExercises();
  props.fetchCurrentTraining();

  return (
    <React.Fragment>
      <Header/>
      <div className="page-wrapper">
        {props.children}
      </div>
      <Navigation/>
      <Footer/>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchExercises: () => dispatch(fetchExercises()),
    fetchCurrentTraining: () => dispatch(fetchCurrentTraining())
  }
};

export default connect(null, mapDispatchToProps)(App);
