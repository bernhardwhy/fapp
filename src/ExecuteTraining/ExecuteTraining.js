import React, { Component } from 'react';;
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getOffers,
  setBreadCrumbs,
  postWorkout
} from '../store/actions/actions';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import Input from '@material-ui/core/Input';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = {
	root: {
		flexGrow: 1,
	},
  grow: {
		flexGrow: 1,
	},
  menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
};

class ExecuteTraining extends Component {
  state = {
    activeStep: 0,
    exerciseData: null,
    activeExercise: 0,
    exercises: this.props.actualTraining ? this.props.actualTraining.exercises : null,
    sliderValue: 50,
    weightData: null,
  };
  
  componentDidMount() {
    this.props.onGetOffers();
    this.updateBreadCrumbs();
  }

  updateBreadCrumbs = () => {
    	this.props.actualTraining ?
      this.props.onSetBreadCrumbs({
    			route: '/execute-training',
    			routeLabel: this.props.actualTraining.exercises[ this.state.activeExercise ].name
    		}) : null;
  };

handleWeightInput = (event, index) => {
    const updatedExercise = { ...this.state.exercises };
    updatedExercise[ this.state.activeExercise ].volume[ index ].weight = event.target.value
    
    this.setState({ exercises: updatedExercise  });
};

  handleNext = () => {
if (this.state.activeExercise + 1 < this.props.actualTraining.exercises.length) {
    this.setState(state => ({
  activeExercise: state.activeExercise + 1,
        activeStep: 0,
    }), () => {
    this.updateBreadCrumbs();
    });
} else {
    const newFinishedWorkout = this.props.actualTraining;
    const dateTime = new Date();
    const date = dateTime.toDateString();
    newFinishedWorkout.finishedDate = date;
    this.props.onPostWorkout(newFinishedWorkout);
        this.props.history.push('/home');
    }
  };

  render() {
    const { classes, theme } = this.props;
    const activeExercise = this.props.actualTraining ? this.state.exercises[ this.state.activeExercise ].volume : null;

    return (
        <div>
            {activeExercise && activeExercise.map((exercise, index) => {
                return (
                    <Card>
                        <div>
                            <CardContent className={ classes.content }>
                                <Typography component="h5" variant="h5">
                                    Set {index + 1}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {exercise.rep + 'wdh, ' + exercise.weight + 'Kg'}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    <FormControl aria-describedby="weight-helper-text">
                                        <Input
                                type="number"
                                name="txtNumber"
                                id="adornment-weight"
                                value={ exercise.weight }
                                onChange={ (event) => this.handleWeightInput(event, index) }
                                endAdornment={ <InputAdornment position="end">Kg</InputAdornment> }
                                inputProps={ {
                                    'aria-label': 'Weight',
                                } }
                                />
                                        <FormHelperText id="weight-helper-text">Weight</FormHelperText>
                                    </FormControl>
                                </Typography>
                            </CardContent>
                        </div>
                    </Card>)
            }) 
    		}
            {this.props.actualTraining ?
                <MobileStepper
    					variant="progress"
    					steps={ this.state.exercises.length + 1 }
    					position="static"
                        activeStep={ this.state.activeStep }
    					className={ classes.root }
    					nextButton={
        <Button size="small" onClick={ this.handleNext }>
                                                        Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </Button>
    					}
    					backButton={
        <Button
                        size="small"
                        onClick={ this.handleBack }
                        disabled={ this.state.activeStep === 0 }>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Back
        </Button>
            }
    				/> : null
    			}
        </div>
    	);
  }
}

const mapStateToProps = state => {
	return {
    trainings: state.trainings,
    breadCrumbs: state.breadCrumbs,
		actualTraining: state.exerciseData,
  };
};

const mapDispatchToProps = dispatch => {
	return {
    onGetOffers: () => dispatch(getOffers()),
		onSetBreadCrumbs: (breadCrumbs) => dispatch(setBreadCrumbs(breadCrumbs)),
		onPostWorkout: (finishedWorkout) => dispatch(postWorkout(finishedWorkout)),
  };
};

ExecuteTraining.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(ExecuteTraining));
