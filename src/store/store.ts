import { applyMiddleware, compose, createStore } from 'redux';
import { reducer } from './reducers';

const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware()));
