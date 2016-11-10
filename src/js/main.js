import TodoListPresenter from './presenter/todoListPresenter'

const firstTodo = new TodoListPresenter({
  idStore: 'firstTodo',
  elementBase: document.getElementById('lista'),
  startWithFocus: true
});

const secondyTodo = new TodoListPresenter({
  idStore: 'secondyTodo',
  elementBase: document.getElementById('lista2')
});
