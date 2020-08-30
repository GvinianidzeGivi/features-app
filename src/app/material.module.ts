import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';

@NgModule( {
    imports: [
      MatInputModule,
      MatCardModule,
      MatButtonModule,
      MatToolbarModule,
      MatExpansionModule,
      MatProgressSpinnerModule,
      MatPaginatorModule,
      MatDialogModule
    ],
    exports: [
      MatInputModule,
      MatCardModule,
      MatButtonModule,
      MatToolbarModule,
      MatExpansionModule,
      MatProgressSpinnerModule,
      MatPaginatorModule,
      MatDialogModule
    ],
} )

export class AngularMaterialModule { }
