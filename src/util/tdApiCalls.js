import * as methods from './methods';
import callApi from './callApi';

const TD = '/td';
const TD_API = TD + '/api';
const TODOS_URI = TD_API + '/todos';

export function createTodo(newTodoReq) {
  return callApi({
    uri: TODOS_URI,
    method: methods.POST,
    body: newTodoReq
  });
}

export function getTodoById(todoId) {
  return callApi({
    uri: TODOS_URI + '/' + todoId,
    method: methods.GET
  });
}

export function getCurrentUserTodos() {
  return callApi({
    uri: TODOS_URI,
    method: methods.GET
  });
}
