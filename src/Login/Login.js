import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setBreadCrumbs } from '../store/actions/actions';
import Button from '@material-ui/core/Button';


class Login extends Component {

    handleLogin = () => {
        this.props.onSetBreadCrumbs({
            route: '/Home',
            routeLabel: 'Overview'
        });
        this.props.history.push('/Home');
    }

    render() {
        return (
            <div style={{ display: 'flex', width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center' }}>
                <div>
                    <Button onClick={this.handleLogin} color="primary" variant="contained">
                        Login
                </Button>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state.products
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSetBreadCrumbs: (breadCrumbs) => dispatch(setBreadCrumbs(breadCrumbs)),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
