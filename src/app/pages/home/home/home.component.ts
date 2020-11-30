import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {ApiService} from "../../auth/services/api.service";
export interface Task {
  name: string;
  description: string;
  status: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['Nombre', 'Descripcion', 'Estatus'];
  dataSource: any = [];
  constructor(private authService: AuthService, private apiService: ApiService){ }

  ngOnInit() {
    this.apiService.get('tasks').subscribe((data: any) => {
      console.log(data)
      this.dataSource = data.data
    })
  }

  logout() {
    this.authService.logout()
  }

}
