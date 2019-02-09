import * as WebRequest from 'web-request';
import { default as itiririAsync } from '../lib';

type ToDo = {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
};

async function* todosAsync(): AsyncIterableIterator<ToDo> {
  let id = 1;
  while (true) {
    yield await WebRequest.json<ToDo>(`https://jsonplaceholder.typicode.com/todos/${id++}`);
  }
}

async function showTop2ToDos(): Promise<void> {
  const todos = await itiririAsync(todosAsync())
    .filter(x => !x.completed)
    .take(2)
    .awaitAll();

  console.log(todos.toArray());
}

console.log('Next 2 TODOs:');
showTop2ToDos();

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

async function showCompletedToDos() {
  const completed = itiririAsync(todosAsync())
    .filter(e => e.completed === true);

  for await (const todo of completed) {
    console.log(todo);
  }
}

console.log('All completed TODOs:');
showCompletedToDos();

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
