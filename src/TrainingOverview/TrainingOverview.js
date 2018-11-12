import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOffers, setBreadCrumbs, setActualTraining, getWorkouts } from '../store/actions/actions';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

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

class TrainingOverview extends Component {

    state = {
        activeStep: 0,
    };

    componentDidMount() {
        this.props.getWorkouts(this.props.match.params.id);
        // this.props.onGetOffers();
        // this.getSelectedTraining();
    }

    handleStartClick = (selectedTraining) => {
        this.props.onSetBreadCrumbs({
            route: '/execute-training',
            routeLabel: 'Training Execution'
        });
        this.props.history.push('/execute-training')
    }

    getSelectedTraining = () => {
        const exerciseData = this.props.trainings ? this.props.trainings.find((exercises) => {
            return exercises.id === this.props.match.params.id
        }) : null;

        this.props.setActualTraining(exerciseData);
    }

    render() {
        const { classes } = this.props;

        const trainingList = this.props.actualTraining ? this.props.actualTraining.exercises.map(exercise => (
            <ListItem
                key={ exercise.name }>
                <Avatar>
                    <ImageIcon />
                </Avatar>
                <ListItemText primary={ exercise.name } secondary={ exercise.volume.length + ' Sets' } />
            </ListItem>
        )) : null;

        return (
            <div>
                <div className={ classes.listRoot }>
                    <List>
                        {trainingList}
                    </List>
                </div>
                <Button variant="contained" color="primary" onClick={ this.handleStartClick }>LET'S GET CRACK'IN</Button>
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
        setActualTraining: (exerciseData) => dispatch(setActualTraining(exerciseData)),
        getWorkouts: (training) => dispatch(getWorkouts(training)),
    };
}

TrainingOverview.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TrainingOverview));
