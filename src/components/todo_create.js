import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import TodoForm from "./todo_form";
import {createTodo} from "../actions";


class TodoCreate extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    this.props.createTodo(values, () => {
      alert('Success');
    })

  }

  render() {
    return (
      <div>
        <Link to="/">Back To Index</Link>
        <TodoForm
          onSubmit={this.onSubmit}

        />
      </div>
    );
  }
}

export default connect(null, {createTodo})(TodoCreate);