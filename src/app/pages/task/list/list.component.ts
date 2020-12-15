import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../auth/services/api.service";
import {AddComponent} from "../add/add.component";
import {MatDialog} from "@angular/material/dialog";
import {EditComponent} from "../edit/edit.component";
import {DeleteComponent} from "../delete/delete.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['Nombre', 'Descripcion', 'Estatus', 'Options'];
  dataSource: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private apiService: ApiService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.apiService.get('tasks').subscribe((data: any) => {
      this.dataSource = new MatTableDataSource<TaskData>(data.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  addTask() {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getTasks();
      }
    });

  }

  editTask(data) {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '250px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getTasks();
      }
    });
  }

  deleteTask(data) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '300px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getTasks();
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}

export interface TaskData {
  name: string;
  description: string;
  priority: string;
}
