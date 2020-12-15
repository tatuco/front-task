import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TaskService} from "../task.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  data: any;
  constructor(private readonly fb: FormBuilder,
              private taskService: TaskService,
              public dialogRef: MatDialogRef<DeleteComponent>,
              private readonly toast: ToastrService,
              @Inject(MAT_DIALOG_DATA) data) {
    this.data = data;
  }

  ngOnInit(): void {
  }

  save() {
    this.taskService.delete(this.data._id).subscribe((response) => {
      },
      (error) => {
        this.toast.error(`Error: ${error.error.message}`);
      }, () => {
        this.close('ok');
        this.toast.success('Task eliminado');
      });
  }

  close(result?) {
    this.dialogRef.close(result);
  }

}
