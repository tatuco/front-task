import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {TasksExpiringComponent} from "../tasks-expiring/tasks-expiring.component";
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
  public tasks = JSON.parse(localStorage.getItem('tasks'));
  constructor(private authService: AuthService,
              public dialog: MatDialog){ }

  ngOnInit() {
    if(this.tasks && this.tasks.length > 0){
      this.openExpiring()
    }
  }

  logout() {
    this.authService.logout()
  }

  openExpiring(){
    this.dialog.open(TasksExpiringComponent, {
      width: '350px',
      data: this.tasks,
      hasBackdrop: true
    });
  }

}
