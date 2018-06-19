import { combineReducers } from 'redux';
import { reducer as formReducer } from "redux-form";
import TodosReducer from "./todos_reducer";
import { CREATE_TODO } from '../actions';
const rootReducer = combineReducers({
  todos: TodosReducer,
  form: formReducer.plugin({
    TodoForm: (state, action) => {
      switch (action.type) {
        case CREATE_TODO:
          return undefined;
        default:
          return state;
      }
    }
  })
});

export default rootReducer;
