import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classes from './App.css';
import { Route, withRouter } from 'react-router';
import Home from './Home/Home';
import Login from './Login/Login';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';

import TrainingOverview from './TrainingOverview/TrainingOverview';
import ExecuteTraining from './ExecuteTraining/ExecuteTraining';

class App extends Component {
  state = {
    isAuthenticated: false,
  }

  // componentDidMount() {
  //   if (this.state.isAuthenticated) {
  //     this.props.history.push('Home');
  //   } else {
  //     this.props.history.push('/');
  //   }
  // }

  swiped = (e, deltaX, deltaY, isFlick, velocity) => {
    if (deltaX < 0) {
      this.props.history.goBack();
    }
  }

  render() {
    return (
        <div className={ classes.App }>
            <div className={ classes.root }>
                <AppBar position="static">
                    <Toolbar>
                        {this.props.location.pathname !== '/Home' && 
                        <IconButton onClick={ this.props.history.goBack } className={ classes.menuButton } color="inherit" aria-label={ this.props.match.pathname }>
                            <BackIcon />
                        </IconButton>
                        }
                        <Typography variant="h6" color="inherit" className={ classes.grow }>
                            {this.props.breadCrumbs.routeLabel}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
            <Route path='/' exact component={ Login } />
            <Route path='/home' exact component={ Home } />
            <Route path='/training-overview/:id' exact component={ TrainingOverview } />
            <Route path='/execute-training' exact component={ ExecuteTraining } />
        </div>
    );
  }
}

const mapStateToProps = state => {
	return {
    breadCrumbs: state.breadCrumbs,
  };
};

export default withRouter(connect(mapStateToProps)(App));
