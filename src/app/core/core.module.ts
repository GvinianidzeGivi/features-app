import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { AngularMaterialModule } from './../material.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class CoreModule { }
