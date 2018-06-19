import React from "react";
import _ from "lodash";
import {connect} from "react-redux";
import {fetchTodos, deleteTodo, updateTodo} from "../actions";
import TodoForm from "./todo_form";
import moment from "moment";
import { Link } from "react-router-dom";

// import { Table, TableHead, TableCell, TableRow, TableBody} from '@material-ui/core';


class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      chosenId: null
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    this.props.fetchTodos();
    this.interval = setInterval(
      () => this.checkAlarmClock(),
      1000)
  }

  checkAlarmClock() {
    const current = moment().unix();
    let title = "";
    const match = _.values(this.props.todos).find((todo) => {
      const isMatch =  todo.reminder && current === moment(todo.reminder).unix()
      if (isMatch) {
        title = todo.title;
        return true;
      }
    });


    if (match) {
      alert(`REMINDER: ${title}`)
    }
  }

  handleDelete(event) {

    if (confirm('Are you sure you wnt to delete it ?')) {
      this.props.deleteTodo(event.target.value);
    }

  }

  handleEdit(event) {
    this.setState({
      editing: true,
      chosenId: event.target.value
    });
  }

  renderEditForm() {
    return <TodoForm
      onSubmit={(values) => {
        this.props.updateTodo(this.state.chosenId, values);
        this.setState({
          editing: false
        });
      }
      }
      chosenTodo={this.props.todos[this.state.chosenId]}
    />
  }

  renderTodos() {
    return _.map(this.props.todos, todo => {
      return (
        <div>

          <li className="list-group-item" key={todo._id}>
            <div>
              <h6>Title</h6>
              {todo.title}
            </div>
            <div>
              <h6>Description</h6>
              {todo.description}
            </div>
            <div>
              <h6>Reminder</h6>
              {todo.reminder}
            </div>
            <button className="btn btn-danger" value={todo._id} onClick={this.handleDelete}>Delete</button>
            <button className="btn btn-edit" value={todo._id} onClick={this.handleEdit}>Edit</button>
          </li>
        </div>
      );
    });
  }


  render() {
    return (
      <div>
        { this.state.editing && this.renderEditForm() }
        <h3>TODOs</h3>
        <Link to="/todos/new">Create New TODO</Link>

        <ul className="list-group">
          {this.renderTodos()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  }
}

export default connect(
  mapStateToProps,
  {fetchTodos, deleteTodo, updateTodo})(TodoList)