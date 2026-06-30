import { Component,Input, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Task } from '../models/task.model';


@Component({
  selector: 'app-task-item',
  imports: [FormsModule],
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss',
})
export class TaskItem {
  @Input() task!:Task;
  @Output() toggle = new EventEmitter<number>();
  onToggle() {
    this.toggle.emit(this.task.id);
  }
}
