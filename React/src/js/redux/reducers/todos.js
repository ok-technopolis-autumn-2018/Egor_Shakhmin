import { Map, List } from 'immutable';
import { todoConstants } from '../constants';

import { filters } from '~/js/constants';

const todos = JSON.parse(localStorage.getItem('todosReact'));

const initialState = todos 
  ? 
    {
      currentId: todos.currentId,
      todosList: List(todos.todosList.map(todo => Map(todo))),
      filter: todos.filter,
      numActive: todos.numActive,
      editingTodo: todos.editingTodo,
    }
  : 
    {
      currentId: 0,
      todosList: List(),
      filter: filters.ALL,
      numActive: 0,
      editingTodo: null,
    };

function saveToLocalStorage(state) {
  const savedState = state.toObject();
  savedState.todosList = savedState.todosList.toArray();
  localStorage.setItem('todosReact', JSON.stringify(savedState));
}

export default function reducer(state = Map(initialState), action) {
  switch (action.type) {
    case todoConstants.MARK_ALL_TODO_AS: {
      const todosList = state.get('todosList').map((todo) => todo.set('isReady', action.isReady));
      const numActive = (action.isReady) ? 0 : todosList.size;

      state = state.set('todosList', todosList);
      state = state.set('numActive', numActive );
      saveToLocalStorage(state);
      return state;
    }

    case todoConstants.CREATE_TODO: {
      let currentId = state.get('currentId');
      let todosList = state.get('todosList');
      currentId = todosList.size === 0 ? 0 : currentId;
      const numActive = state.get('numActive') + 1;

      todosList = todosList.push(
        Map(
          {
            id: currentId++,
            isReady: false,
            text: action.text,
          }
        )
      );

      state = state.set('todosList', todosList);
      state = state.set('numActive', numActive );
      state = state.set('currentId', currentId );
      saveToLocalStorage(state);
      return state;
    }

    case todoConstants.UPDATE_TODO: {
      let numActive = state.get('numActive');
      const oldTodosList = state.get('todosList');
      const updatedIndex = oldTodosList.findIndex((todo) => todo.get('id') === action.todo.id );

      if (oldTodosList.get(updatedIndex).get('isReady') !== action.todo.isReady) {
        numActive = (action.todo.isReady) ? numActive - 1 : numActive + 1;
      }
      
      const todosList = oldTodosList.update(updatedIndex, (todo) => todo = Map(action.todo) );

      state = state.set('todosList', todosList);
      state = state.set('numActive', numActive );
      saveToLocalStorage(state);
      return state;
    }

    case todoConstants.REMOVE_TODO: {
      let numActive = state.get('numActive');
      const removedIndex = state.get('todosList').findIndex((todo) => todo.get('id') === action.todo.id );
      if (!state.get('todosList').get(removedIndex).get('isReady')) {
        numActive = numActive - 1;
      }
      const todosList = state.get('todosList').delete(removedIndex);

      state = state.set('todosList', todosList);
      state = state.set('numActive', numActive );
      saveToLocalStorage(state);
      return state;
    }

    case todoConstants.CHANGE_FILTER: {
      state = state.set('filter', action.filter);
      saveToLocalStorage(state);
      return state;
    }

    case todoConstants.REMOVE_COMPLETED_TODOS: {
      const todosList = state.get('todosList').filter(todo => !todo.get('isReady'));
      state = state.set('todosList', todosList);
      saveToLocalStorage(state);
      return state;
    }

    case todoConstants.SET_EDITING_TODO: {
      state = state.set('editingTodo', action.id);
      saveToLocalStorage(state);
      return state;
    }

    default: {
      return state;
    }
  }
}
