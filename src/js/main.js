import TodoRender from './presenter/todoPresenter'

const firstTodo = new TodoRender({
  itens: [
    { id: '1', name: 'Item pre carregado' },
    { id: '2', name: 'Mais um item pre carregado' }
  ],
  elementBase: document.getElementById('lista')
});

const secondyTodo = new TodoRender({
  itens: [
    { id: '3', name: 'Secondy Item pre carregado' },
    { id: '4', name: 'Secondy Mais um item pre carregado' }
  ],
  elementBase: document.getElementById('lista2'),
  startWithFocus: false
});
