import page from 'page'
import homePage from './homePage'
import todoPage from './todoPage'

export default function router () {

  page('/', homePage);
  page('/todo/:id', (ctx, next) => {
    todoPage(ctx.params.id);
  });
  page('*', (ctx, next) => {
    console.log('Pagina não encontrada!');
  });

  page({
    hashbang: true
  });

}
