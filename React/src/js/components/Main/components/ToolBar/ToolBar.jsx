import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { filters } from '~/js/constants';

class ToolBar extends Component {
  state = {
    filter: this.props.filter,
  }

  changeFilter = (filter) => {
    const { changeFilter, onChange } = this.props;

    switch(filter) {
      case filters.ALL: {
        changeFilter(filters.ALL);
        this.setState({filter: filters.ALL});
        break;
      }

      case filters.ACTIVE: {
        changeFilter(filters.ACTIVE);
        this.setState({filter: filters.ACTIVE});
        break;
      }

      case filters.COMPLETED: {
        changeFilter(filters.COMPLETED);
        this.setState({filter: filters.COMPLETED});
        break;
      }
    }

    onChange();
  }

  removeCompletedTodos = () => {
    const { removeCompletedTodos, onChange } = this.props;
    removeCompletedTodos();
    onChange();
  }

  render() {
    const { numActive, numTodos } = this.props;
    const { filter } = this.state;

    return (
      <div className="todos-toolbar">
        <div className="todos-toolbar_unready-counter">{`${numActive} items left`}</div>
        <button
          className={`todos-toolbar_clear-completed ${numActive === numTodos ? '__hidden' : '' }`}
          onClick={this.removeCompletedTodos}
        >
          Clear completed
        </button>

        <div className="filters todos-toolbar_filters">
          <button
            className={`todos-toolbar_filter ${filter === filters.ALL ? '__selected' : ''}`}
            aria-label="Filter: All, is selected"
            onClick={() => this.changeFilter(filters.ALL)}
          >
            All
          </button>
          <button
            className={`todos-toolbar_filter ${filter === filters.ACTIVE ? '__selected' : ''}`}
            aria-label="Filter: Active"
            onClick={() => this.changeFilter(filters.ACTIVE)}
          >
            Active
          </button>
          <button
            className={`todos-toolbar_filter ${filter === filters.COMPLETED ? '__selected' : ''}`}
            aria-label="Filter: Completed"
            onClick={() => this.changeFilter(filters.COMPLETED)}
          >
            Completed
          </button>
        </div>

      </div>
    );
  }
}

ToolBar.propTypes = {
  numActive: PropTypes.number.isRequired,
  numTodos: PropTypes.number.isRequired,
  changeFilter: PropTypes.func.isRequired,
  removeCompletedTodos: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ToolBar;
