import React, { Component } from "react";
import TodoItem from "./TodoItem";

export default class Main extends Component {
  constructor(state) {
    super(state);

    this.state = {
      editing: null
    };
  }

  toggleAll = async event => {
    var checked = event.target.checked;
    await this.props.model.toggleAll(checked);
  };

  toggle = async todoToToggle => {
    await this.props.model.toggle(todoToToggle);
  };

  destroy = async todo => {
    await this.props.model.destroy(todo);
  };

  edit = todo => {
    this.setState({ editing: todo.id });
  };

  save = async (todoToSave, text) => {
    await this.props.model.save(todoToSave, text);
    this.setState({ editing: null });
  };

  cancel = () => {
    this.setState({ editing: null });
  };

  render() {
    const { todos } = this.props.model;

    const shownTodos = todos.filter(todo => {
      switch (this.props.nowShowing) {
        case this.props.filters.ACTIVE_TODOS:
          return !todo.completed;
        case this.props.filters.COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    });

    return (
      <section className="main">
        <input
          className="toggle-all"
          type="checkbox"
          onChange={this.toggleAll}
          defaultChecked={this.props.activeTodoCount === 0}
        />
        <ul className="todo-list" key="todo-list">
          {shownTodos.map(todo => {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={() => this.toggle(todo)}
                onDestroy={() => this.destroy(todo)}
                onEdit={() => this.edit(todo)}
                editing={this.state.editing === todo.id}
                onSave={this.save}
                onCancel={this.cancel}
              />
            );
          })}
        </ul>
      </section>
    );
  }
}
