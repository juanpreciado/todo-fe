import axios from "axios";

const TODOS_URL = 'http://localhost:8008/todos';

export const FETCH_TODOS = "FETCH_TODOS";
export const CREATE_TODO = "CREATE_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const UPDATE_TODO = "UPDATE_TODO";

export function fetchTodos() {
  const request = axios.get(TODOS_URL);

  return {
    type: FETCH_TODOS,
    payload: request
  };
}

export function createTodo(value, callback) {
  const request = axios.post(TODOS_URL, value)
    .then(() => callback());

  return {
    type: CREATE_TODO,
    payload: request
  };
}

export function deleteTodo(id) {
  const request = axios.delete(`${TODOS_URL}/${id}`);

  return {
    type: DELETE_TODO,
    payload: id
  };
}

export function updateTodo(id, newValues, callback) {
  const request = axios.patch(`${TODOS_URL}/${id}`, newValues)


  return {
    type: UPDATE_TODO,
    payload: request
  };
}