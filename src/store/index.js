import { persistStore } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import persistedReducers from './models/reduxPersist';

import rootReducer from './models/rootReducer';
import rootSaga from './models/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  persistedReducers(rootReducer),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
export default store;
