import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-tasks-expiring',
  templateUrl: './tasks-expiring.component.html',
  styleUrls: ['./tasks-expiring.component.css']
})
export class TasksExpiringComponent implements OnInit {
  data: any;
  constructor(public dialogRef: MatDialogRef<TasksExpiringComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.data = data;
  }

  ngOnInit(): void {
  }
  close(){
    this.dialogRef.close();
  }
}
