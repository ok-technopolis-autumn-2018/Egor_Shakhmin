import { todoConstants } from '../constants';

export {
  markAllTodoAs,
  createTodo,
  updateTodo,
  removeTodo,
  changeFilter,
  removeCompletedTodos,
  setEditingTodo,
};

function markAllTodoAs(isReady) { return { type: todoConstants.MARK_ALL_TODO_AS, isReady }; }
function createTodo(text) { return { type: todoConstants.CREATE_TODO, text }; }
function updateTodo(todo) { return { type: todoConstants.UPDATE_TODO, todo }; }
function removeTodo(todo) { return { type: todoConstants.REMOVE_TODO, todo }; }
function setEditingTodo(id) { return { type: todoConstants.SET_EDITING_TODO, id }; }
function changeFilter(filter) { return { type: todoConstants.CHANGE_FILTER, filter }; }
function removeCompletedTodos() { return { type: todoConstants.REMOVE_COMPLETED_TODOS }; }
