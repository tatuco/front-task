import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../task.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public form: FormGroup;
  data: any;
  priority = [
    {name: 'EMERGENCIA', value: 'A'},
    {name: 'URGENCIA', value: 'B'},
    {name: 'NECESARIO', value: 'C'},
    {name: 'DESEABLE', value: 'D'},
    {name: 'PRORROGABLE', value: 'E'},
  ];

  constructor(private readonly fb: FormBuilder,
              private taskService: TaskService,
              public dialogRef: MatDialogRef<EditComponent>,
              private readonly toast: ToastrService,
              @Inject(MAT_DIALOG_DATA) data) {
    this.data = data;
  }

  ngOnInit(): void {
    const priority = this.priority.filter(i => i.name === this.data.priority)[0];
    this.form = this.fb.group({
      name: [this.data.name, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(55)])],
      description: [this.data.description, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(55)])],
      priorityName: [this.data.priority, Validators.required],
      priority: [priority, Validators.required],
    });
  }

  save() {
    const form = this.form.value
    delete form.priorityName;
    this.taskService.edit(this.data._id, form).subscribe((response) => {
        if (response.data) {
          this.close(response.data);
        }
      },
      (error) => {
        this.toast.error(`Error: ${error.error.message}`);
      }, () => {
        this.toast.success('Task actualizado');
      });
  }

  setItem(value) {
    this.form.get('priority').setValue(value);
  }

  close(result?) {
    this.dialogRef.close(result);
  }

}
