import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import { HomeComponent } from './home/home.component';
import {HomeRoutingModule} from './home-routing.module';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatTableModule,
    MatButtonModule,
  ],
  declarations: [HomeComponent],
  providers: [],
  entryComponents: []
})
export class HomeModule { }
