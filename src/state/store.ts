import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store,
} from 'redux';
import { enableBatching } from 'redux-batched-actions';
import createSagaMiddleware from 'redux-saga';

import { IApplicationState } from './interfaces';
import { reducers } from './reducers';
import sagas from './sagas';

const composeEnhancers = typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
  })
  : compose;

export const prepareStore = (): Store<IApplicationState> => {
  const allReducers = enableBatching(combineReducers({
      ...reducers,
  }));

  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];

  const enhancer = composeEnhancers(applyMiddleware(...middleware));

  const store: Store<IApplicationState> = createStore(
      allReducers,
      undefined,
      enhancer,
  );

  sagaMiddleware.run(sagas);

  return store;
};

export const store: Store<IApplicationState> = prepareStore();

export const dispatch = store.dispatch;
