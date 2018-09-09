import React, { Component } from "react";
import Utils from "../utils/utils";
import classNames from "classnames";
import { Link } from "react-router-dom";

export default class Footer extends Component {
  componentDidMount() {
    const { filters } = this.props;

    switch (this.props.match.url) {
      case "/active":
        this.props.onFilterChange(filters.ACTIVE_TODOS);
        break;
      case "/completed":
        this.props.onFilterChange(filters.COMPLETED_TODOS);
        break;
      default:
        return true;
    }
  }

  render() {
    const { nowShowing, filters, count } = this.props;
    const activeTodoWord = Utils.pluralize(count, "item");

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{count}</strong> {activeTodoWord} left
        </span>
        <ul className="filters">
          <li>
            <Link
              to="/"
              className={classNames({
                selected: nowShowing === filters.ALL_TODOS
              })}
              onClick={() => this.props.onFilterChange(filters.ALL_TODOS)}
            >
              All
            </Link>
          </li>{" "}
          <li>
            <Link
              to="/active"
              className={classNames({
                selected: nowShowing === filters.ACTIVE_TODOS
              })}
              onClick={() => this.props.onFilterChange(filters.ACTIVE_TODOS)}
            >
              Active
            </Link>
          </li>{" "}
          <li>
            <Link
              to="/completed"
              className={classNames({
                selected: nowShowing === filters.COMPLETED_TODOS
              })}
              onClick={() => this.props.onFilterChange(filters.COMPLETED_TODOS)}
            >
              Completed
            </Link>
          </li>
        </ul>
        {this.props.completedCount ? (
          <button
            className="clear-completed"
            onClick={this.props.onClearCompleted}
          >
            Clear completed
          </button>
        ) : (
          ""
        )}
      </footer>
    );
  }
}
