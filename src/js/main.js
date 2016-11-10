import TodoListPresenter from './presenter/todoListPresenter'

const firstTodo = new TodoListPresenter({
  itens: [
    { id: '1', name: 'Item pre carregado' },
    { id: '2', name: 'Mais um item pre carregado' }
  ],
  elementBase: document.getElementById('lista'),
  startWithFocus: true
});

const secondyTodo = new TodoListPresenter({
  itens: [
    { id: '3', name: 'Secondy Item pre carregado' },
    { id: '4', name: 'Secondy Mais um item pre carregado' }
  ],
  elementBase: document.getElementById('lista2')
});
