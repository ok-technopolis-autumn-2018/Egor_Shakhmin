import Dispatcher from './Dispatcher';

export default class TodosListModel extends Dispatcher {
  constructor(){
    super();
    const localStorage = window.localStorage;
    const name = 'todos';

    this.getList = () => {
      const todos = JSON.parse(localStorage.getItem(name));
      return todos === null ? [] : todos.todosList;
    }

    this.getNewId = () => {
      const todos = JSON.parse(localStorage.getItem(name));
      const id = todos.currentId;
      const newTodos = {
        currentId: id + 1,
        todosList: todos.todosList,
      }
      localStorage.setItem(name, JSON.stringify(newTodos));

      return id;
    }

    this.setList = (todosList) => {
      const todos = JSON.parse(localStorage.getItem(name));
      const newTodos = {
        currentId: todos.currentId,
        todosList,
      }
      localStorage.setItem(name, JSON.stringify(newTodos));
    }

    this.setNewData = (data) => {
      localStorage.setItem(name, JSON.stringify(data));
    }

    if (this.getList().length === 0) {
      const data = {
        currentId: 0,
        todosList: [],
      }
      this.setNewData(data);
    }
  }

  addTodo = (text) => {
    let list = this.getList();
    const todo = {
      id: this.getNewId(),
      text,
      isReady: false,
    }
    list.push(todo);

    this.setList(list);
    this.dispatch('newTodo', todo);
  }

  editTodo = (todo) => {
    let todos = this.getList();
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === todo.id) {
        todos[i] = todo;
        this.setList(todos);
        this.dispatch('editTodo', todo);
        break;
      }
    } 
  }

  removeTodo = (removedTodo) => {
    let todos = this.getList();
    todos = todos.filter(todo => todo.id !== removedTodo.id );

    if (todos.length === 0) {
      this.setNewData({currentId: 0, todosList: []})
    } else {
      this.setList(todos);
    }
    this.dispatch('removeTodo', removedTodo);
  }

  markAllAs = (isReady) => {
    let todos = this.getList();
    todos.forEach(todo => todo.isReady = isReady);

    this.setList(todos);
    this.dispatch('markAllAs', isReady);
  }

  stopEditingAllTodos = (todo) => {
    this.dispatch('stopEditingAllTodos');
  }

  clearCompleted = () => {
    let todos = this.getList();
    todos = todos.filter(todo => !todo.isReady);

    if (todos.length === 0) {
      this.setNewData({currentId: 0, todosList: []})
    } else {
      this.setList(todos);
    }
    this.dispatch('clearCompleted');
  }

  countActive = () => {
    let cnt = 0;
    const todos = this.getList();
    
    todos.forEach((todo) => {
      if(!todo.isReady){
        cnt++;
      }
    });

    return cnt;
  }
}