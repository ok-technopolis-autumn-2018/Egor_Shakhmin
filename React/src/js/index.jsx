import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import Main from './components/Main';
import DevTools from './components/DevTools';
import initializeStore from './redux/store';

import '../styles/default.scss';

const store = initializeStore();

const renderApp = (Component) => {
  render(
    <AppContainer>
      <Provider store={store}>
        <div>
          <Component />
          <DevTools />
        </div>
      </Provider>
    </AppContainer>,
    document.querySelector('.todo-board'),
  );
};

renderApp(Main);

if (module && module.hot) {
  module.hot.accept('./components/Main', () => renderApp(Main));
}
