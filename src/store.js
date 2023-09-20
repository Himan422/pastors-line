import { legacy_createStore as createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import modalReducer from './reducers/modalReducer';

const rootReducer = combineReducers({
  modal: modalReducer,
});

const store = createStore(rootReducer);

export default store;
