import React, { Component } from 'react';
import axios from 'axios';
import { APP_CONFIG } from '../config/app-config';

export default class EditTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo_description: '',
      todo_responsible: '',
      todo_priority: '',
      todo_completed: false,
    };
  }

  componentDidMount() {
    axios
      .get(`${APP_CONFIG.API_URL}${this.props.match.params.id}`)
      .then((res) => {
        this.setState({
          todo_description: res.data.payload.description,
          todo_responsible: res.data.payload.responsible,
          todo_priority: res.data.payload.priority,
          todo_completed: res.data.payload.completed,
        });
      })
      .catch((err) => console.log(err));
  }

  onChangeTodoDescription = (e) => {
    this.setState({
      todo_description: e.target.value,
    });
  };

  onChangeTodoResponsible = (e) => {
    this.setState({
      todo_responsible: e.target.value,
    });
  };

  onChangeTodoPriority = (e) => {
    this.setState({
      todo_priority: e.target.value,
    });
  };

  onChangeTodoCompleted = (e) => {
    this.setState({
      todo_completed: !this.state.todo_completed,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const obj = {
      description: this.state.todo_description,
      responsible: this.state.todo_responsible,
      priority: this.state.todo_priority,
      completed: this.state.todo_completed,
    };
    axios
      .put(`${APP_CONFIG.API_URL}${this.props.match.params.id}`, obj)
      .then((res) => console.log(res.data));

    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <h3>Update Todo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.todo_description}
              onChange={this.onChangeTodoDescription}
            />
          </div>
          <div className="form-group">
            <label>Responsible: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.todo_responsible}
              onChange={this.onChangeTodoResponsible}
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityLow"
                value="Low"
                checked={this.state.todo_priority === 'Low'}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">Low</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityMedium"
                value="Medium"
                checked={this.state.todo_priority === 'Medium'}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">Medium</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityHigh"
                value="High"
                checked={this.state.todo_priority === 'High'}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">High</label>
            </div>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="completedCheckbox"
              name="completedCheckbox"
              onChange={this.onChangeTodoCompleted}
              checked={this.state.todo_completed}
              value={this.state.todo_completed}
            />
            <label className="form-check-label" htmlFor="completedCheckbox">
              Completed
            </label>
          </div>
          <br />
          <div className="form-group">
            <input
              type="submit"
              value="Update Todo"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
