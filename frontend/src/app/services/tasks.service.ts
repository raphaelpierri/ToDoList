import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  configUrl = 'http://localhost:3333';

  getTask(id: number) {
    return this.http.get<any>(`${this.configUrl}/tasks/${id}`);
  }

  createTask(values: {}) {
  return this.http.post<any>(`${this.configUrl}/tasks`, values);
}

  findAllTasks() {
  return this.http.get<any>(`${this.configUrl}/tasks`);
}

  deleteTask(id: number) {
  return this.http.delete<any>(`${this.configUrl}/tasks/${id}`);
}

  updateTask(id: number, values: {}) {
  return this.http.put<any>(`${this.configUrl}/tasks/${id}`, values);
}

}
