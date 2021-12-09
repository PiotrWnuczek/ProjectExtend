import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector, Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { getFirestore, createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { getFirebase, isLoaded } from 'react-redux-firebase';
import rootReducer from 'store/rootReducer';
import thunk from 'redux-thunk';
import databaseConfig from 'store/databaseConfig';
import App from 'App';
import 'index.css';

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
));

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  attachAuthIsReady: true,
};

const rrfProps = {
  firebase: databaseConfig,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

const AuthIsLoaded = ({ children }) => {
  const auth = useSelector(state => state.firebase.auth);
  return isLoaded(auth) ? children : <p>loading...</p>;
};

ReactDOM.render(
  <ReactReduxFirebaseProvider {...rrfProps}>
    <Provider store={store}>
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </Provider>
  </ReactReduxFirebaseProvider>,
  document.getElementById('root'),
);
