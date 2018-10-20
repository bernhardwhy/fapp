import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOffers, setBreadCrumbs, postWorkout } from '../store/actions/actions';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import Slider from '@material-ui/lab/Slider';

import Input from '@material-ui/core/Input';

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
                routeLabel: this.props.actualTraining.exercises[this.state.activeExercise].name
            }) : null
    }

    handleWeightInput = (event) => {
        console.log(event.target.value);
        this.setState({ weightData: event.target.value })
    }

    handleNext = () => {
        if (this.state.weightData) {
            this.props.actualTraining.exercises[this.state.activeExercise].volume[this.state.activeStep].weight = this.state.weightData
        }
        this.setState(state => ({
            activeStep: state.activeStep + 1,
            weightData: null,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    finishExercise = () => {
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
            this.props.history.push('/home')
        }
    };

    render() {
        const { classes, theme } = this.props;
        const activeExercise = this.props.actualTraining ? this.props.actualTraining.exercises[this.state.activeExercise].volume : null;

        return (
            <div>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton className={classes.menuButton} color="inherit" aria-label={this.props.match.pathname}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.grow}>
                                {this.props.breadCrumbs.routeLabel}
                            </Typography>
                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>
                </div>

                {this.props.actualTraining ?
                    <div className={classes.listRoot}>
                        <List>
                            {this.state.activeStep}
                            <ListItem
                                key={activeExercise[this.state.activeStep].set}>
                                <Avatar>
                                    <ImageIcon />
                                </Avatar>
                                <ListItemText primary={'set:' + activeExercise[this.state.activeStep].set} secondary={activeExercise[this.state.activeStep].rep + 'wdh, ' + activeExercise[this.state.activeStep].weight + 'Kg'} />
                                <Input
                                    onChange={this.handleWeightInput}
                                    placeholder={activeExercise[this.state.activeStep].weight}
                                    value={this.state.weightData}
                                    className={classes.input}
                                    inputProps={{
                                        'aria-label': 'Description',
                                    }}
                                />
                            </ListItem>
                        </List>
                    </div> : null
                }
                {this.props.actualTraining ?
                    <MobileStepper
                        variant="progress"
                        steps={activeExercise.length}
                        position="static"
                        activeStep={this.state.activeStep}
                        className={classes.root}
                        nextButton={this.state.activeStep === activeExercise.length - 1 ?
                            <Button size="small" onClick={this.finishExercise}>
                                Finish
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                            </Button> :
                            <Button size="small" onClick={this.handleNext}>
                                Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
                                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                Back
          </Button>
                        }
                    /> : null
                }

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        trainings: state.trainings,
        breadCrumbs: state.breadCrumbs,
        actualTraining: state.exerciseData,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGetOffers: () => dispatch(getOffers()),
        onSetBreadCrumbs: (breadCrumbs) => dispatch(setBreadCrumbs(breadCrumbs)),
        onPostWorkout: (finishedWorkout) => dispatch(postWorkout(finishedWorkout)),
    };
}

ExecuteTraining.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ExecuteTraining));
