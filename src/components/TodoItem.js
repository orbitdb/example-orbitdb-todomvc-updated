import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editText: ""
    };
  }

  handleSubmit = event => {
    var val = this.state.editText.trim();
    if (val) {
      this.props.onSave(this.props.todo, val);
      this.setState({ editText: val });
    } else {
      this.props.onDestroy();
    }
  };

  handleEdit = () => {
    this.props.onEdit();
    this.setState({ editText: this.props.todo.title });
  };

  handleKeyDown = event => {
    const ESCAPE_KEY = 27;
    const ENTER_KEY = 13;

    if (event.which === ESCAPE_KEY) {
      this.setState({ editText: this.props.todo.title });
      this.props.onCancel(event);
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  };

  handleChange = event => {
    if (this.props.editing) {
      this.setState({ editText: event.target.value });
    }
  };

  getInitialState = () => {
    return { editText: this.props.todo.title };
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    return (
      nextProps.todo !== this.props.todo ||
      nextProps.editing !== this.props.editing ||
      nextState.editText !== this.state.editText
    );
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.editing && this.props.editing) {
      var node = ReactDOM.findDOMNode(this.refs.editField);
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  }

  removeTodo(id) {
    this.props.removeTodo(id);
  }

  render() {
    const { todo } = this.props;
    return (
      <li
        key={this.props.todo.id}
        className={classNames({
          completed: this.props.todo.completed,
          editing: this.props.editing
        })}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={this.props.onToggle}
          />
          <label onDoubleClick={this.handleEdit}>{todo.title}</label>
          <button className="destroy" onClick={this.props.onDestroy} />
        </div>
        <input
          ref="editField"
          className="edit"
          value={this.state.editText}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    );
  }
}
