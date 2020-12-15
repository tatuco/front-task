import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../task.service";
import {MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public form: FormGroup;

  constructor(private readonly fb: FormBuilder,
              private taskService: TaskService,
              public dialogRef: MatDialogRef<AddComponent>,
              private readonly toast: ToastrService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(55)])],
      description: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(55)])],
    });
  }

  save() {
    this.taskService.save(this.form.value).subscribe((response) => {
        if (response.data) {
          this.close(response.data);
        }
      },
      (error) => {
        this.toast.error(`Error: ${error.error.message}`);
      }, () => {
        this.toast.success('Task agregado');
      });
  }

  close(result?) {
    this.dialogRef.close(result);
  }

}
