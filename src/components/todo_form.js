import React from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { SubmissionError } from 'redux-form'

class TodoForm extends React.Component {

  componentDidMount() {
    this.props.initialize({
      title: this.props.chosenTodo && this.props.chosenTodo.title ? this.props.chosenTodo.title : '',
      description: this.props.chosenTodo && this.props.chosenTodo.description ? this.props.chosenTodo.description : '',
      reminder: this.props.chosenTodo && this.props.chosenTodo.reminder ? this.props.chosenTodo.reminder : '',
    });
  }
  renderField(field) {
    const { meta: { touched, error }, type, value } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type={type} value={value} {...field.input} />
        {touched && error && <span>{error}</span>}
      </div>
    );
  }

  onSubmit(values) {
    if (!values.title) {
      throw new SubmissionError({
        title: 'please add a title',
        _error: 'fail!'
      });
    }
    if (!values.description) {
      throw new SubmissionError({
        description: 'Please add some description',
        _error: 'fail!'
      })
    }
    this.props.onSubmit(values);
  }

  render() {
    const { handleSubmit, load } = this.props;

    return(
      <form onLoad={() => load(this.props.data)} onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title For Todo"
          name="title"
          type="text"
          component={this.renderField}
        />
        <Field
          label="Description For Todo"
          name="description"
          type="textarea"
          component={this.renderField}
        />
        <Field
          label="Reminder For Todo"
          name="reminder"
          type="datetime-local"
          component={this.renderField}
        />

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Enter a title";
  }
  if (!values.description) {
    errors.categories = "Enter some description";
  }

  return errors;
}

export default reduxForm({

  form: "TodoForm"
})(TodoForm);