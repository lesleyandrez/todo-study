import todoListPresenter from '../presenter/todoListPresenter'
import templateTodoList from '../view/todoList.html'

const containerTodos = document.getElementById('container-todos');

export default function todoPage(idTodoList) {

  let idTodoListEncoded = idTodoList.replace(/ /ig, '-');
  let currentTodo = containerTodos.querySelector(`[data-todolist-id="${idTodoListEncoded}"]`);

  for (let containerTodo of containerTodos.children) {
    containerTodo.classList.add('hide');
  }

  if (currentTodo){
    console.info('Enter Todo Page (for the secondy time)');
    currentTodo.classList.remove('hide');
    return;
  }

  console.info('Enter Todo Page (for the first time)');
  containerTodos.insertAdjacentHTML('beforeend', templateTodoList({idTodoListEncoded}));

  let todo = new todoListPresenter({
    elementBase: document.querySelector(`[data-todolist-id=${idTodoListEncoded}]`),
    idTodoList: idTodoList,
    startWithFocus:  true
  });

  todo.renderAllItens();

}
