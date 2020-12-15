import { Injectable } from '@angular/core';
import {ApiService} from "../auth/services/api.service";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private api: ApiService) { }

  save(data) {
    return this.api.post('tasks', data);
  }

  edit(id, data) {
    return this.api.put(`tasks/${id}`, data);
  }

  delete(id,) {
    return this.api.delete(`tasks/${id}`);
  }
}
