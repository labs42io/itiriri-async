import * as WebRequest from 'web-request';
import { queryAsync } from '../lib';

async function* generator() {
  let id = 1;
  while (true) {
    var url = 'https://jsonplaceholder.typicode.com/todos/' + id++;
    yield WebRequest.json<any>(url);
  }
}

async function todos() {
  const q = await queryAsync(generator()).filter(x => x.completed === false).take(2).awaitAll();
  console.log(q.toArray());
}

todos();

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