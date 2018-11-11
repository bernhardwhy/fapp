import React, { Component } from 'react';
import logo from './logo.svg';
import classes from './App.css';
import { Route, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Home from './Home/Home';
import Login from './Login/Login';
// import ExecuteTraining from './ExecuteTraining/ExecuteTraining';
import TrainingOverview from './TrainingOverview/TrainingOverview';
import ExecuteTraining from './ExecuteTraining/ExecuteTraining';

import Swipeable from 'react-swipeable'

class App extends Component {
  state = {
    isAuthenticated: false,
  }

  componentDidMount() {
    if (this.state.isAuthenticated) {
      this.props.history.push('Home');
    } else {
      this.props.history.push('/');
    }
  }

  swiped = (e, deltaX, deltaY, isFlick, velocity) => {
    if (deltaX < 0) {
      this.props.history.goBack();
    }
  }

  render() {
    return (
        <div className={ classes.App }>
            <Swipeable
          style={ { height: '100%' } }
          onSwiped={ this.swiped } >
                <Route path='/' exact component={ Login } />
                <Route path='/home' exact component={ Home } />
                <Route path='/training-overview/:id' exact component={ TrainingOverview } />
                <Route path='/execute-training' exact component={ ExecuteTraining } />
            </Swipeable>
        </div>
    );
  }
}

export default withRouter(App);
