import template from '../templates/Template';
import TodoModel from '../models/TodoModel';
import { modifiers } from '../constants';

export default class TodoView  {
  constructor(data, controller){
    this.model = new TodoModel(data);
    this.controller = controller;
    this.elements = template.listItem(data);

    this.elements.readyMarker.addEventListener('click', () => {
      this.model.set('isReady', !this.model.get('isReady'));
      if (this.model.get('isReady')) {
        this.getRoot().classList.add(modifiers.COMPLETED_MODIFIER);
      } else {
        this.getRoot().classList.remove(modifiers.COMPLETED_MODIFIER);
      }

      this.controller.stopEditingAllTodos();
      this.controller.editTodo(this.model);
    });

    this.elements.removeBtn.addEventListener('click', () => this.controller.removeTodo(this.model));

    this.elements.viewText.addEventListener('dblclick', () => this.startEditingTodo());

    this.elements.textInput.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        const newText = this.elements.textInput.value.trim();
        if (newText !== '') {
          this.model.set('text', newText);
          this.updateText(newText);
          this.controller.editTodo(this.model);
        }
      }
    });
  }

  markAsReady = (isReady) => {
    this.model.set('isReady', isReady);
    const checkbox = this.elements.readyMarker.querySelector('.custom-checkbox_target');
    checkbox.checked = isReady;
    if (isReady) {
      this.getRoot().classList.add(modifiers.COMPLETED_MODIFIER);
    } else {
      this.getRoot().classList.remove(modifiers.COMPLETED_MODIFIER);
    }
  }

  updateText = (newText) => {
      this.elements.viewText.textContent = '';
      this.elements.viewText.appendChild(document.createTextNode(newText || ''));
      this.elements.textInput.value = newText;

      this.getRoot().classList.remove(modifiers.EDIT_TODO_MODIFIER);
  }

  startEditingTodo = () => {
    this.controller.stopEditingAllTodos();
    this.getRoot().classList.add(modifiers.EDIT_TODO_MODIFIER);
    this.elements.textInput.focus();
  }

  getRoot = () => this.elements.root;

  removeFromList = () => {
    this.getRoot().parentNode.removeChild(this.getRoot())
  }

}
