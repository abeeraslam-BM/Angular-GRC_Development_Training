export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: string; // ISO date string from backend
}