import { observable, action, runInAction } from 'mobx';
import { apiUrl } from './constants';
import { usePromise } from './Promise';

export class Todo {
    id: number;
    @observable content: string;

    constructor(id: number, content: string) {
        this.id = id;
        this.content = content;
    }
};

export class TodoList {
    @observable.shallow list: Todo[] = [];

    @action
    async load() {
        const [err, getTodosResponse] = await usePromise(
            fetch(`${apiUrl}/todos`)
        );
        if (err || !getTodosResponse) {
            return;
        }

        const [err2, todosJson] = await usePromise(
            getTodosResponse.json()
        );
        if (err2 || !todosJson) {
            return;
        }

        const todos = todosJson.map((t: any) => new Todo(t.id, t.content));

        runInAction(() => {
            this.list = todos;
        });
    }

    @action
    async create(content: string) {
        const payload = {
            content
        };

        const [err, createTodoResponse] = await usePromise(
            fetch(`${apiUrl}/todos`, {
                method: 'POST',
                body: JSON.stringify(payload)
            })
        );
        if (err || !createTodoResponse) {
            return;
        }

        const [err2, todoCreated] = await usePromise(
            createTodoResponse.json()
        );
        if (err2 || !todoCreated) {
            return;
        }

        const todo = new Todo(todoCreated.id, todoCreated.content);

        runInAction(() => {
            this.list = this.list.concat(todo);
        });
    }

    @action
    async updateTodo(id: number, content: string) {
        const payload = {
            id,
            content
        };

        const [err, updateTodoResponse] = await usePromise(
            fetch(`${apiUrl}/todos`, {
                method: 'PUT',
                body: JSON.stringify(payload)
            })
        );
        if (err || !updateTodoResponse) {
            return;
        }

        const [err2, todoUpdated] = await usePromise(
            updateTodoResponse.json()
        );
        if (err2 || !todoUpdated) {
            return;
        }

        const todo = new Todo(todoUpdated.id, todoUpdated.content);

        runInAction(() => {
            this.list = this.list.map(t => {
                if (t.id === todo.id) {
                    return todo;
                }
                return t;
            });
        });
    }

    @action
    async delete(id: number) {
        const [err, deleteTodoResponse] = await usePromise(
            fetch(`${apiUrl}/todos/${id}`, {
                method: 'DELETE'
            })
        );
        if (err || !deleteTodoResponse) {
            return;
        }

        runInAction(() => {
            this.list = this.list.filter(t => t.id !== id);
        });
    }
}