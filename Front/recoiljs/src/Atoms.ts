const { atom } = require('recoil');

export const todoListState = atom({
    key: 'todolist',
    default: [],
});