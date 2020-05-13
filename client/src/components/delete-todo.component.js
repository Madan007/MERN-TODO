import React, { Component } from 'react';
import axios from 'axios';
import { APP_CONFIG } from '../config/app-config';

export default class DeleteTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
    };
  }

  componentDidMount() {
    axios
      .delete(`${APP_CONFIG.API_URL}${this.props.match.params.id}`)
      .then((res) => console.log(res.data));
    this.props.history.push('/');
  }

  render() {
    return null;
  }
}
