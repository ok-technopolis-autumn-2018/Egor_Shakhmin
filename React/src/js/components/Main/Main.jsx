import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import TodoCreator from './components/TodoCreator';
import TodoList from './components/TodoList';
import ToolBar from './components/ToolBar';

import {
  markAllTodoAs,
  createTodo,
  updateTodo,
  removeTodo,
  changeFilter,
  removeCompletedTodos,
  setEditingTodo } from '~/js/redux/actions';

class Main extends Component {
  markAllTodoAs = (isReady) => {
    const { dispatch } = this.props;
    dispatch(markAllTodoAs(isReady));
  }

  createTodo = (text) => {
    const { dispatch } = this.props;
    dispatch(createTodo(text));
  }

  updateTodo = (todo) => {
    const { dispatch } = this.props;
    dispatch(updateTodo(todo));
  }

  removeTodo = (todo) => {
    const { dispatch } = this.props;
    dispatch(removeTodo(todo));
  }

  changeFilter = (filter) => {
    const { dispatch } = this.props;
    dispatch(changeFilter(filter));
  }

  removeCompletedTodos = () => {
    const { dispatch } = this.props;
    dispatch(removeCompletedTodos());
  }

  setEditingTodo = (id) => {
    const { dispatch } = this.props;
    dispatch(setEditingTodo(id));
  }

  render() {
    const {
      todosList,
      numActive,
      editingTodo,
      filter } = this.props;

    return (
      <div>
        <TodoCreator
          numActive={numActive}
          markAllTodoAs={this.markAllTodoAs}
          createTodo={this.createTodo}
          onChange={() => this.setEditingTodo(null)}
        />

        <TodoList 
          todosList={todosList.toArray()}
          filter={filter}
          editingTodo={editingTodo}
          setEditingTodo={this.setEditingTodo}
          updateTodo={this.updateTodo}
          removeTodo={this.removeTodo}
        />

        {todosList.size > 0 && 
          <ToolBar
            numActive={numActive}
            numTodos={todosList.size}
            filter={filter}
            changeFilter={this.changeFilter}
            onChange={() => this.setEditingTodo(null)}
            removeCompletedTodos={this.removeCompletedTodos}
          />
        }
      </div>
    );
  }
}

Main.propTypes = {
  todosList: PropTypes.instanceOf(List).isRequired,
  numActive: PropTypes.number.isRequired,
  filter: PropTypes.number.isRequired,
  editingTodo: PropTypes.number,
};

function mapStateToProps(state) {
  return {
    todosList: state.todos.get('todosList'),
    filter: state.todos.get('filter'),
    numActive: state.todos.get('numActive'),
    editingTodo: state.todos.get('editingTodo'),
  };
}

export default connect(mapStateToProps)(Main);
