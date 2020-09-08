import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostCreateComponent } from "./posts-create/post-create.component";
import { PostListComponent } from "./post-list/post-list.component";
import { AngularMaterialModule } from "../angular-material.module";
import { CheckDateDirective } from './check-date.directive';
import { CheckDatePipe } from './check-date.pipe';

@NgModule({
  declarations: [
    PostCreateComponent,
    PostListComponent,
    CheckDateDirective,
    CheckDatePipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class PostsModule { }
