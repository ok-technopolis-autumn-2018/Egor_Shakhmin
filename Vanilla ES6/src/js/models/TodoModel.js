export default class TodoModel {
  constructor(todoData){
    const { id, text, isReady } = todoData;
    this.id = id;
    this.text = text;
    this.isReady = isReady;
  }

  set = (field, value) => this[field] = value;
  get = field => this[field];

}