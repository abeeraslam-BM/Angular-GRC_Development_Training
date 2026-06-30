import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskItem } from './task-item/task-item';
import { TaskList } from './task-list/task-list';

@Component({
  selector: 'app-root',
  imports: [TaskList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('task-manager');
}
