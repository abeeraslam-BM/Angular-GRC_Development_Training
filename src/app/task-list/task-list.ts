import { Component, inject } from '@angular/core';
import { TaskItem } from '../task-item/task-item';
import { Task } from '../models/task.model';
import { FormsModule } from '@angular/forms';
import { TaskService, TaskCreatePayload } from '../task.service';
import { catchError, of, tap, finalize, BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [TaskItem, FormsModule, AsyncPipe],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList {
  private taskService = inject(TaskService);

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  loading = false;
  errorMessage: string | null = null;

  newTaskTitle = '';
  newTaskPriority: 'Low' | 'Medium' | 'High' = 'Low';

  constructor() {
    this.loadTasks();
  }

  private loadTasks(): void {
    this.loading = true;
    this.errorMessage = null;

    this.taskService.getAll().pipe(
      catchError((error) => {
        console.error('Error fetching tasks:', error);
        this.errorMessage = 'Failed to load tasks.';
        return of([]);
      }),
      finalize(() => this.loading = false)
    ).subscribe((tasks) => this.tasksSubject.next(tasks));
  }

  addTask(): void {
    if (this.newTaskTitle.trim() === '') return;

    const newTask: TaskCreatePayload = {
      title: this.newTaskTitle,
      priority: this.newTaskPriority,
    };

    this.taskService.create(newTask).pipe(
      catchError((error) => {
        console.error('Error creating task:', error);
        this.errorMessage = 'Failed to add task.';
        return of(null);
      })
    ).subscribe((created) => {
      if (created) {
        this.newTaskTitle = '';
        this.newTaskPriority = 'Low';
        // append the new task to the existing array — no refetch
        this.tasksSubject.next([...this.tasksSubject.value, created]);
      }
    });
  }

  onToggle(id: number): void {
    this.taskService.toggle(id).pipe(
      catchError((error) => {
        console.error('Error toggling task:', error);
        this.errorMessage = 'Failed to update task.';
        return of(null);
      })
    ).subscribe((result) => {
      if (result) this.patchTask(result);
    });
  }

  updatePriority(task: Task, priority: 'Low' | 'Medium' | 'High'): void {
    this.taskService.update(task.id, {
      title: task.title,
      description: task.description,
      priority,
      dueDate: task.dueDate,
    }).pipe(
      catchError((error) => {
        console.error('Error updating task:', error);
        this.errorMessage = 'Failed to update task.';
        return of(null);
      })
    ).subscribe((result) => {
      if (result) this.patchTask(result);
    });
  }

  deleteTask(id: number): void {
    this.taskService.delete(id).pipe(
      catchError((error) => {
        console.error('Error deleting task:', error);
        this.errorMessage = 'Failed to delete task.';
        return of(null);
      })
    ).subscribe(() => {
      // remove just this one task from the array — no refetch
      this.tasksSubject.next(
        this.tasksSubject.value.filter(t => t.id !== id)
      );
    });
  }

  // shared helper: replace one task in the array with its updated version
  private patchTask(updated: Task): void {
    this.tasksSubject.next(
      this.tasksSubject.value.map(t => t.id === updated.id ? updated : t)
    );
  }
}