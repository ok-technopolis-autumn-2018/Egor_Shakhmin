import '../styles/default.scss';
import TodosListModel from './models/TodosListModel';
import TodosController from './controllers/TodosController';
import { TodoCreatorView } from './views/TodoCreatorView';

window.addEventListener("load", function(event) {
  const todoListModel = new TodosListModel();
  const controller = new TodosController(todoListModel);

  const todoCreatorView = new TodoCreatorView(todoListModel, controller);
});