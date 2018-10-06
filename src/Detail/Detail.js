import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getOffers } from '../store/actions/actions';


class Detail extends Component {

    componentDidMount() {
        this.props.onGetOffers();
    }

    render() {
        return (
            <div>
                {this.props.products ? <h2>{this.props.products.title}</h2> : <h2>no data laoded</h2>}
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
        onGetOffers: () => dispatch(getOffers()),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Detail);
