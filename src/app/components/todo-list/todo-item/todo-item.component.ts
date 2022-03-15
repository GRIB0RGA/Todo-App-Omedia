import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/interfaces/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todoItem!: Todo;
  @Input() todoIndex!: number;
  @Output() sendItemToDelete = new EventEmitter<any>();

  beforeEditCache = '';
  constructor() {}

  ngOnInit(): void {}

  getDifficultyStyle(difficulty: string) {
    return {
      'todo__difficulty--hard': difficulty === 'hard',
      'todo__difficulty--medium': difficulty === 'medium',
      'todo__difficulty--easy': difficulty === 'easy',
    };
  }

  updateProgress(type: string) {
    if (type === 'regress') {
      if (!this.todoItem.inProgress && this.todoItem.completed) {
        this.todoItem.inProgress = true;
        this.todoItem.completed = false;
      } else if (this.todoItem.inProgress) {
        this.todoItem.inProgress = false;
      }
    }
    if (type === 'progress') {
      if (!this.todoItem.inProgress && !this.todoItem.completed) {
        this.todoItem.inProgress = true;
      } else if (this.todoItem.inProgress && !this.todoItem.completed) {
        this.todoItem.inProgress = false;
        this.todoItem.completed = true;
      }
    }
  }

  deleteItem(todo: Todo) {
    this.sendItemToDelete.next(todo.id);
  }

  editTodo(todo: Todo) {
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }
  doneTodoEdit(todo: Todo) {
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }

    todo.editing = false;
  }

  cancelTodoEdit(todo: Todo) {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }
}
