import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { keyCodes } from '~/js/constants';

class TodoCreator extends Component {
  state={
    isReadyAll: this.props.numActive === 0,
    text: '',
  }

  componentWillReceiveProps(nextProps){
    this.setState({ isReadyAll: nextProps.numActive === 0 })
  }

  markAllTodoAs = (e) => {
    e.preventDefault();
    const { isReadyAll } = this.state;
    const { markAllTodoAs, onChange } = this.props;

    markAllTodoAs(!isReadyAll);
    this.setState({
      isReadyAll: !isReadyAll,
    });

    onChange();
  }

  handleUserInput = (event) => {
    const { value } = event.target;
    this.setState({
      text: value,
    });

    const { onChange } = this.props;
    onChange();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const text = this.state.text.trim();

    if (text !== '') {
      const { text } = this.state;
      const { createTodo } = this.props;

      createTodo(text);
      this.setState({ text: '' });
    }
  }

  handleKeyDown = (event) => {
    if (event.which === keyCodes.ENTER_KEY) {
      this.handleSubmit(event);
    }
  }


  render() {
    const { text } = this.state;

    return (
      <form className="todo-creator">
        <button
          className="todo-creator_check-all"
          aria-label="Check all items as done"
          onClick={this.markAllTodoAs}
        />
        <div className="todo-creator_text-input-w">
          <input
            className="todo-creator_text-input"
            type="text"
            placeholder="What needs to be done?"
            aria-label="Input new todo text"
            value={text}
            onChange={this.handleUserInput}
            onKeyDown={this.handleKeyDown}
          />
        </div>
      </form>
    );
  }
}

TodoCreator.propTypes = {
  markAllTodoAs: PropTypes.func.isRequired,
  createTodo: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  numActive: PropTypes.number.isRequired,
};

export default TodoCreator;
