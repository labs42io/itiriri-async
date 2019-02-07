import * as WebRequest from 'web-request';
import { queryAsync } from '../lib';

async function* generator() {
  let id = 1;
  while (true) {
    yield WebRequest.json<any>(`https://jsonplaceholder.typicode.com/todos/${id++}`);
  }
}

async function first2Uncompleted() {
  const q = await queryAsync(generator()).filter(x => x.completed === false).take(2).awaitAll();
  console.log(q.toArray());
}

first2Uncompleted();

/*
[ { userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false },
  { userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false }]
*/

async function forAllCompleted() {
  queryAsync(generator()).filter(e => e.completed === true).forEach(e => console.log(e));
}

forAllCompleted();

/*
{ userId: 1, id: 4, title: 'et porro tempora', completed: true }
{ userId: 1,
  id: 8,
  title: 'quo adipisci enim quam ut ab',
  completed: true }
{ userId: 1,
  id: 10,
  title: 'illo est ratione doloremque quia maiores aut',
  completed: true }
{ userId: 1,
  id: 11,
  title: 'vero rerum temporibus dolor',
  completed: true }
...
...
...
*/
