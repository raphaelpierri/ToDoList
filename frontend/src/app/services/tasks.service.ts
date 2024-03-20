import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  configUrl = 'http://localhost:3333/tasks';

  createTask(values: {}) {
  return this.http.post<any>(this.configUrl, values);
}

}
