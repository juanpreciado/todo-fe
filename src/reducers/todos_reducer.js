import _ from "lodash";
import { FETCH_TODOS, DELETE_TODO, UPDATE_TODO } from "../actions";

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_TODOS:
        return _.mapKeys(action.payload.data, "_id");
    case DELETE_TODO:
      return _.omit(state, action.payload);
    case UPDATE_TODO:
      let newState =  Object.assign({}, state);
      newState[action.payload.data._id] = action.payload.data;
      return newState;
    default:
      return state;
  }
}