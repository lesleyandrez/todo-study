import TodoListPresenter from './presenter/todoListPresenter'
import router from './router/index'
import * as categoryTodoListPresenter from './presenter/categoryTodoListPresenter'

categoryTodoListPresenter.renderListCategories('blablaibi');
categoryTodoListPresenter.listeners({
  $form: document.querySelector('#form-new-list'),
  $list: document.querySelector('#categorias .itens')
});

router();
