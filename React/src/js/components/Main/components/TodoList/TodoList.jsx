import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import TodoView from './components/TodoView';

import { filters } from '~/js/constants';

import {
  leaveOnlyActive,
  leaveOnlyCompleted } from '~/js/utils/filters';


class TodoList extends Component {

  onEdit = (id) => {
    const { setEditingTodo } = this.props;
    setEditingTodo(id);
  }
  onCancel = () => {
    const { setEditingTodo } = this.props;
    setEditingTodo(null);
  } 

  render() {
    const { 
      editingTodo,
      todosList,
      filter,
      updateTodo,
      removeTodo } = this.props;

    let filterOut;
    switch(filter){

      case filters.ACTIVE: {
        filterOut = leaveOnlyActive;
        break;
      }

      case filters.COMPLETED: {
        filterOut = leaveOnlyCompleted;
        break;
      }
    }

    const listOfTodoView = todosList.map((todo) => {
      todo = todo.toObject();
      if (filter === filters.ALL) {
        return (
          <TodoView
            key={todo.id}
            model={todo}
            editingIsAllowed={todo.id === editingTodo}
            onEdit={this.onEdit}
            onCancel={this.onCancel}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
        );
      } else if (filterOut(todo)) {
        return (
          <TodoView
            key={todo.id}
            model={todo}
            editingIsAllowed={todo.id === editingTodo}
            onEdit={this.onEdit}
            onCancel={this.onCancel}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
        );
      }
    });

    return (
      <div className="todos-list">
        {listOfTodoView}
      </div>
    );
  }
}

TodoList.propTypes = {
  todosList: PropTypes.array.isRequired,
  updateTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  setEditingTodo: PropTypes.func.isRequired,
  filter: PropTypes.number.isRequired,
  editingTodo: PropTypes.number,
};

export default TodoList;
