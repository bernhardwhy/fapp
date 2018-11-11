import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOffers, setBreadCrumbs } from '../store/actions/actions';

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
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

const listStyles = theme => ({
listRoot: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
}
});

const styles = {
  root: {
    flexGrow: 1
	},
  grow: {
    flexGrow: 1
	},
  menuButton: {
		marginLeft: -12,
    marginRight: 20
  }
};

class Home extends Component {
	componentDidMount() {
		this.props.onGetOffers();
  }

  handleListItemClick = selectedTraining => {
    this.props.onSetBreadCrumbs({
      route: '/training-overview/' + selectedTraining.name,
      routeLabel: 'Training'
    });
    this.props.history.push('/training-overview/' + selectedTraining.name);
  };

  render() {
  	const { classes } = this.props;
    const trainingList = this.props.trainings
      ? this.props.trainings.map(training => (
          <ListItem
  				key={ training.name }
            button
            onClick={ () => this.handleListItemClick(training) }
          >
              <Avatar>
                  <ImageIcon />
              </Avatar>
              <ListItemText primary={ training.name } secondary={ training.desc } />
          </ListItem>
  		))
      : null;
    return (
        <div>
            <div className={ classes.root }>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                        className={ classes.menuButton }
                        color="inherit"
                        aria-label={ this.props.match.pathname }
                      >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={ classes.grow }>
                            {this.props.breadCrumbs.routeLabel}
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>

            <div className={ classes.listRoot }>
                <List>{trainingList}</List>
            </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
		trainings: state.trainings,
		breadCrumbs: state.breadCrumbs
  };
};

const mapDispatchToProps = dispatch => {
  return {
		onGetOffers: () => dispatch(getOffers()),
    onSetBreadCrumbs: breadCrumbs => dispatch(setBreadCrumbs(breadCrumbs))
  };
};

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles, listStyles)(Home));
