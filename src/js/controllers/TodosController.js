export default class TodosController {
  constructor(model) {
    this.model = model;
  }

  addTodo = (text) => {
    this.model.addTodo(text);
  }

  removeTodo = (todo) => {
    this.model.removeTodo(todo);
  }

  editTodo = (todo) => {
    this.model.editTodo(todo);
  }

  clearCompleted = () => {
    this.model.clearCompleted();
  }

  markAllAs = (isReady) => {
    this.model.markAllAs(isReady);
  }

  stopEditingAllTodos = () => {
    this.model.stopEditingAllTodos();
  }

  countActive = () => {
    return this.model.countActive();
  }
}