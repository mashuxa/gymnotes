import React from 'react';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import {fetchExercises} from '../../actions/application';
import './normalize.scss';
import './grid.scss';
import './utilities.scss';

const App = (props) => {
  props.fetchExercises();

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
    fetchExercises: () => dispatch(fetchExercises())
  }
};

export default connect(null, mapDispatchToProps)(App);
