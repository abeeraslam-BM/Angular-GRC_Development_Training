import { Component } from '@angular/core';
import { TaskItem } from '../task-item/task-item';
import { Task } from '../models/task.model';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-task-list',
  imports: [TaskItem, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})

export class TaskList {
  tasks:Task[]= [
    { id: 1, title: 'Buy Grocery', completed: false, priority: "Medium" },
    { id: 2, title: 'Write a report', completed: true, priority: "High" },
    { id: 3, title: 'Call the bank', completed: false, priority: "Low" }
  ]

  newTaskTitle: string = '';

addTask(): void {
  if (this.newTaskTitle.trim() === '') return;

  const newTask: Task = {
    id: this.tasks.length + 1,
    title: this.newTaskTitle,
    completed: false,
    priority: 'Low',
  };

  this.tasks.push(newTask);
  this.newTaskTitle = '';
}

onToggle(id:number){
  const task = this.tasks.find(t => t.id === id);
  if(task){
    task.completed = !task.completed;
  }
}
}
