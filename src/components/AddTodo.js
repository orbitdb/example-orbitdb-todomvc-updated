import React from "react";

export default class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleNewTodoKeyDown = async event => {
    const ENTER_KEY = 13;
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    const val = this.state.newTodo.trim();

    if (val) {
      await this.props.addTodo(val);
      this.setState({ newTodo: "" });
    }
  };

  handleChange(e) {
    this.setState({ newTodo: e.target.value });
  }

  render() {
    const loadPercentage = Math.round(
      (this.props.model.status.loaded / this.props.model.status.total) * 100
    );
    return (
      <header className="header">
        <h1>todos</h1>
        {!this.props.model.ready ? (
          <p className="loadingText">
            {this.props.model.ready
              ? null
              : "Loading... " + loadPercentage + "%"}
          </p>
        ) : null}
        {this.props.model.ready ? (
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.newTodo}
            onKeyDown={this.handleNewTodoKeyDown}
            onChange={this.handleChange}
            autoFocus={true}
          />
        ) : null}
      </header>
    );
  }
}
