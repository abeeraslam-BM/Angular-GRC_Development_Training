import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './models/task.model';
import { HttpClient } from '@angular/common/http';

export interface TaskCreatePayload {
  title: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: string;
}

export interface TaskUpdatePayload {
  title: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  private baseurl = 'http://localhost:5000/api/tasks';

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseurl);
  }

  getById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseurl}/${id}`);
  }

  create(t: TaskCreatePayload): Observable<Task> {
    return this.http.post<Task>(this.baseurl, t);
  }

  update(id: number, t: TaskUpdatePayload): Observable<Task> {
    return this.http.put<Task>(`${this.baseurl}/${id}`, t);
  }

  toggle(id: number): Observable<Task> {
    return this.http.patch<Task>(`${this.baseurl}/${id}/toggle`, {});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseurl}/${id}`);
  }
}