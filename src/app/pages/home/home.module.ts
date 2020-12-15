import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import { HomeComponent } from './home/home.component';
import {HomeRoutingModule} from './home-routing.module';
import {TaskModule} from "../task/task.module";
import {MatButtonModule} from "@angular/material/button";
import { TasksExpiringComponent } from './tasks-expiring/tasks-expiring.component';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    TaskModule,
    MatButtonModule,
    MatListModule,
    MatIconModule
  ],
  declarations: [HomeComponent, TasksExpiringComponent],
  providers: [],
  entryComponents: []
})
export class HomeModule { }
