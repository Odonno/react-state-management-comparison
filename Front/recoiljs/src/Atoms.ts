import { atom } from 'recoil';
import { Todo } from './Models';

export const todoListState = atom<Todo[]>({
    key: 'todolist',
    default: [],
});