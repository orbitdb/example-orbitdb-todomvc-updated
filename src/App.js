import React, { Component } from "react";
import AddTodo from "./components/AddTodo";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Utils from "./utils/utils";
import { Route } from "react-router-dom";

import "./App.css";

class App extends Component {
  constructor(state) {
    super(state);

    this.filters = {
      ALL_TODOS: "all",
      ACTIVE_TODOS: "active",
      COMPLETED_TODOS: "completed"
    };

    this.state = {
      nowShowing: this.filters.ALL_TODOS,
      editing: null,
      newTodo: "",
      todos: []
    };
    this.changeShowingTodos = this.changeShowingTodos.bind(this);
  }

  clearCompleted = () => {
    this.props.model.clearCompleted();
  };

  componentDidMount() {
    this.getTodos();
  }

  changeShowingTodos = newFilter => {
    this.setState({ nowShowing: newFilter });
  };

  addTodo = async newTodo => {
    await this.props.model.addTodo(newTodo);
  };

  handleChange(event) {
    this.setState({ newTodo: event.target.value });
  }

  getTodos = async () => {
    const { model } = this.props;
    const todos = await Utils.store(model.db, model.key);
    this.setState({ todos });
  };

  render() {
    const { todos } = this.props.model;
    const { editing, nowShowing } = this.state;
    const activeTodoCount = todos.reduce(function(accum, todo) {
      return todo.completed ? accum : accum + 1;
    }, 0);

    const completedCount = todos.length - activeTodoCount;

    return (
      <div className="todoapp">
        <AddTodo newTodo="" addTodo={this.addTodo} model={this.props.model} />
        <Main
          activeTodoCount={activeTodoCount}
          model={this.props.model}
          editing={editing}
          nowShowing={nowShowing}
          filters={this.filters}
        />
        <Route
          exact
          path={["/", "/active", "/completed"]}
          render={props => (
            <Footer
              {...props}
              nowShowing={this.state.nowShowing}
              filters={this.filters}
              count={activeTodoCount}
              completedCount={completedCount}
              onClearCompleted={this.clearCompleted}
              onFilterChange={this.changeShowingTodos}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
