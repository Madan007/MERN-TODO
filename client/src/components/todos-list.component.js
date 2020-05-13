import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { APP_CONFIG } from '../config/app-config';

const Todo = (props) => (
  <tr>
    <td className={props.todo.completed ? 'completed' : ''}>
      {props.todo.description}
    </td>
    <td className={props.todo.completed ? 'completed' : ''}>
      {props.todo.responsible}
    </td>
    <td className={props.todo.completed ? 'completed' : ''}>
      {props.todo.priority}
    </td>
    <td>
      <Link to={'/edit/' + props.todo._id}>Edit</Link> <span /> <span />{' '}
      <span />
      <Link to={'/delete/' + props.todo._id}>Delete</Link>
    </td>
  </tr>
);

export default class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    console.log('component mounted....');
    setTimeout(
      axios
        .get(`${APP_CONFIG.API_URL}`)
        .then((res) => {
          this.setState({
            todos: res.data.payload,
          });
        })
        .catch((err) => console.log(err)),
      1000
    );
  }

  todoList = () =>
    this.state.todos.map((todo, index) => <Todo todo={todo} key={index} />);

  render() {
    return (
      <div>
        <h3>Todos List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.todoList()}</tbody>
        </table>
      </div>
    );
  }
}
