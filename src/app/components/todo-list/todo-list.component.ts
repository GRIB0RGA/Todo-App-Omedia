import { Component, OnInit } from '@angular/core';

import { Todo } from '../../interfaces/todo';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  constructor() {}
  id: number = 0;
  title: string = '';
  selectedOption: string = '';

  todos!: Todo[];

  ngOnInit(): void {
    this.todos = [];
  }

  onAddClick() {
    if (this.title.trim().length === 0 || !this.selectedOption) {
      return;
    }

    this.todos.push({
      id: this.id++,
      title: this.title,
      difficulty: this.selectedOption,
      editing: false,
      inProgress: false,
      completed: false,
    });

    this.title = '';
    this.selectedOption = '';
  }

  justTodo() {
    return this.todos.filter((todo) => !todo.inProgress && !todo.completed);
  }

  todosInProgress() {
    return this.todos.filter((todo) => todo.inProgress);
  }
  todosCompleted() {
    return this.todos.filter((todo) => todo.completed);
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}
