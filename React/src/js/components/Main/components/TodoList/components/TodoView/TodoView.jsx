import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { keyCodes } from '~/js/constants';

class TodoView extends Component {
  state = {
    model: this.props.model,
    isEditing: false,
  }

  componentDidUpdate(prevProps, prevState) {
    this.inputEditing.focus();
  }

  componentWillReceiveProps(nextProps){
    if (this.state.model.isReady !== nextProps.model.isReady){
      this.setState({ model: nextProps.model });
    }
    if(this.state.isEditing && !nextProps.editingIsAllowed){
      this.setState({ isEditing: !this.state.isEditing });
    }
  }

  startEditing = () => {
    const { onEdit, onCancel } = this.props;
    onCancel();
    onEdit(this.state.model.id);
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleMarkReady = () => {
    const { updateTodo, onCancel } = this.props;
    let { model } = this.state;
    model.isReady = !model.isReady;

    updateTodo(model);
    onCancel();
    this.setState({ model });
  }

  removeTodo = () => {
    const { model } = this.state;
    const { removeTodo, onCancel } = this.props;
    removeTodo(model);
    onCancel();
  }

  handleUserInput = (event) => {
    const { value } = event.target;
    const { model } = this.state;
    this.setState({
      model: {
        ...model,
        text: value,
      },
    });
  }

  handleKeyDown = (event) => {
    if (event.which === keyCodes.ENTER_KEY) {
      this.handleSubmit(event);
    }
  }

  handleSubmit = () => {
    const { updateTodo, onCancel } = this.props;
    let { model } = this.state;
    model = {...model, text: model.text.trim()};
    if (model.text !== '') {
      onCancel();
      updateTodo(model);
      this.setState({ model, isEditing: false });
    }
  }

  render() {
    const { model, isEditing } = this.state;
    return (
      <div className={`todos-list_item ${model.isReady ? '__completed' : ''} ${isEditing ? '__editing' : ''}`}>

        <div className="todos-list_item_view">

          <div className="custom-checkbox todos-list_item_view_ready-marker">
            <input
              className={`custom-checkbox_target ${model.isReady ? '__checked' : ''}`}
              type="checkbox"
              aria-label="Mark todo as ready"
              onChange={this.handleMarkReady}
            />
            <div className="custom-checkbox_visual">
              <div className="custom-checkbox_visual_icon"></div>
            </div>
          </div>

          <div className="remove-btn todos-list_item_view_remove">
            <button
              className="remove-btn_target"
              aria-label="Delete todo"
              onClick={this.removeTodo}
            />
            <div className="remove-btn_visual">
              <div className="remove-btn_visual_icon"></div>
            </div>
          </div>

          <div className="todos-list_item_view_text-w">
            <label
              className="todos-list_item_view_text"
              onDoubleClick = {this.startEditing}
            >
              {model.text}
            </label>
          </div>

        </div>

        <input
          className="todos-list_item_todo-edit"
          type="text"
          value={model.text}
          aria-label="Edit todo"
          ref={input => this.inputEditing = input}
          onChange={this.handleUserInput}
          onKeyDown={this.handleKeyDown}
        />

      </div>
    );
  }
}

TodoView.propTypes = {
  model: PropTypes.instanceOf(Object).isRequired,
  editingIsAllowed: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
};

export default TodoView;
