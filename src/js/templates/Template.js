import { modifiers } from '../constants';

class Template {

  todoCreator = () => {
    const main = document.getElementsByClassName('todo-board')[0];

    const todoCreator = document.createElement('form');
    todoCreator.className = 'todo-creator';
    main.appendChild(todoCreator);

    const checkAllBtn = document.createElement('button');
    checkAllBtn.className = 'todo-creator_check-all';
    checkAllBtn.setAttribute('aria-label', 'Check all items as done');
    todoCreator.appendChild(checkAllBtn);

    const textInputW = document.createElement('div');
    textInputW.className = 'todo-creator_text-input-w';

    const textInput = document.createElement('input');
    textInput.className = 'todo-creator_text-input';
    textInput.type = 'text';
    textInput.placeholder = 'What needs to be done?';
    textInput.setAttribute('aria-label', 'Input new todo text');

    textInputW.appendChild(textInput);
    todoCreator.appendChild(textInputW);

    return { root: todoCreator, checkAllBtn, textInput };
  }

  listOf = (items) => {
    const list = document.createElement('div');
    list.className = 'todos-list';
    items.forEach(item => list.appendChild(item.getRoot()));

    const toolBar = this.toolBar(items.length);
    list.appendChild(toolBar);

    return { root: list, toolBar: toolBar };
  }

  toolBar = (itemsLeft) => {
    const toolBar = document.createElement('div');
    toolBar.className = 'todos-toolbar';

    const unreadyCounter = document.createElement('div');
    unreadyCounter.className = 'todos-toolbar_unready-counter';
    unreadyCounter.appendChild(document.createTextNode(`${itemsLeft} items left`));
    toolBar.appendChild(unreadyCounter);

    const clearCompletedBtn = document.createElement('button');
    clearCompletedBtn.className = 'todos-toolbar_clear-completed';
    clearCompletedBtn.setAttribute('aria-label', 'Clear completed');
    clearCompletedBtn.appendChild(document.createTextNode('Clear completed'));
    toolBar.appendChild(clearCompletedBtn);

    const filters = this.filters();
    toolBar.appendChild(filters);

    return toolBar;
  }

  filters = () => {
    const filters = document.createElement('div');
    filters.className = 'filters todos-toolbar_filters';
    
    const filterAllBtn = document.createElement('button');
    filterAllBtn.className = 'filters_all todos-toolbar_filter __selected';
    filterAllBtn.setAttribute('aria-label', 'Filter: All, is selected');
    filterAllBtn.appendChild(document.createTextNode('All'));
    filters.appendChild(filterAllBtn);

    const filterActiveBtn = document.createElement('button');
    filterActiveBtn.className = 'filters_active todos-toolbar_filter';
    filterActiveBtn.setAttribute('aria-label', 'Filter: Active');
    filterActiveBtn.appendChild(document.createTextNode('Active'));
    filters.appendChild(filterActiveBtn);

    const filterCompletedBtn = document.createElement('button');
    filterCompletedBtn.className = 'filters_completed todos-toolbar_filter';
    filterCompletedBtn.setAttribute('aria-label', 'Filter: Completed');
    filterCompletedBtn.appendChild(document.createTextNode('Completed'));
    filters.appendChild(filterCompletedBtn);

    return filters;
  }

  listItem = (data) => {
    const listItem = document.createElement('div');
    listItem.className = `todos-list_item ${data.isReady ? modifiers.COMPLETED_MODIFIER : ''}`;

    const listItemView = document.createElement('div');
    listItemView.className = `todos-list_item_view`;

    const readyMarker = this.readyMarker(data.isReady);
    listItemView.appendChild(readyMarker);

    const removeBtn = this.removeBtn();
    listItemView.appendChild(removeBtn);

    const viewText = this.viewText(data.text);
    listItemView.appendChild(viewText);
    listItem.appendChild(listItemView);

    const textInput = this.textInput(data.text);
    listItem.appendChild(textInput);

    return {
      root: listItem,
      readyMarker: readyMarker,
      removeBtn: removeBtn,
      viewText: viewText,
      textInput: textInput,
    };    
  }

  readyMarker = (isReady) => {
    const readyMarker = document.createElement('div');
    readyMarker.className = 'custom-checkbox todos-list_item_view_ready-marker';

    const checkbox = document.createElement('input');
    checkbox.className = 'custom-checkbox_target';
    checkbox.type = 'checkbox';
    checkbox.checked = isReady;
    checkbox.setAttribute('aria-label', 'Mark todo as ready');
    readyMarker.appendChild(checkbox);

    const checkboxVisual = document.createElement('div');
    checkboxVisual.className = 'custom-checkbox_visual';
    const checkboxVisualIcon = document.createElement('div');
    checkboxVisualIcon.className = 'custom-checkbox_visual_icon';
    checkboxVisual.appendChild(checkboxVisualIcon);

    readyMarker.appendChild(checkboxVisual);

    return readyMarker;
  }

  removeBtn = () => {
    const removeBtn = document.createElement('div');
    removeBtn.className = 'remove-btn todos-list_item_view_remove';

    const btnTarget = document.createElement('button');
    btnTarget.className = 'remove-btn_target';
    btnTarget.setAttribute('aria-label', 'Delete todo');
    removeBtn.appendChild(btnTarget);

    const removeBtnVisual = document.createElement('div');
    removeBtnVisual.className = 'remove-btn_visual';
    const removeBtnVisualIcon = document.createElement('div');
    removeBtnVisualIcon.className = 'remove-btn_visual_icon';
    removeBtnVisual.appendChild(removeBtnVisualIcon);

    removeBtn.appendChild(removeBtnVisual);

    return removeBtn;
  }

  viewText = (text) => {
    const viewTextW = document.createElement('div');
    viewTextW.className = 'todos-list_item_view_text-w';

    const viewText = document.createElement('label');
    viewText.className = 'todos-list_item_view_text';
    viewText.appendChild(document.createTextNode(text || ''));

    viewTextW.appendChild(viewText);

    return viewText;
  }

  textInput = (text) => {
    const textInput = document.createElement('input');
    textInput.className = 'todos-list_item_todo-edit';
    textInput.type = 'text';
    textInput.value = text;
    textInput.setAttribute('aria-label', 'Edit todo');

    return textInput;
  }
}

const template = new Template();
export default template;
