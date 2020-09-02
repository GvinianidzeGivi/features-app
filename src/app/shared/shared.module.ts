import { DragndropService } from './services/dragndrop.service';
import { FeaturesService } from './components/features/features.service';
// import { FeatureListComponent } from './components/features/feature-list/feature-list.component';
import { AngularMaterialModule } from './../material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureCreateComponent } from './components/features/feature-create/feature-create.component';
import { FeatureListComponent } from './components/features/feature-list/feature-list.component';




@NgModule({
  declarations: [FeatureCreateComponent, FeatureListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    RouterModule
  ],
  exports: [],
  providers: [
    FeaturesService,
    DragndropService
  ]

})
export class SharedModule { }

