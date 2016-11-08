import TodoRender from './todoRender'

const firstTodo = new TodoRender({
  itens: [
    { id: '1', name: 'Item pre carregado' },
    { id: '2', name: 'Mais um item pre carregado' }
  ],
  elementBase: document.getElementById('lista')
});
