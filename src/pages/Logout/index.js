import { Component } from 'react';

export default class Logout extends Component {

    componentWillMount() {
        localStorage.removeItem('_id');
        localStorage.removeItem('nome');
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        this.props.history.push('/');
    }

    render() {
        return null;
    }
}