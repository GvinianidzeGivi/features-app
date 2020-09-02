import { NotFoundComponent } from './core/not-found/not-found.component';
import { FeatureCreateComponent } from './shared/components/features/feature-create/feature-create.component';
import { FeatureListComponent } from './shared/components/features/feature-list/feature-list.component';
import { AuthGuard } from './auth/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
  { path: '', component:  FeatureListComponent},
  { path: 'create', component: FeatureCreateComponent, canActivate: [AuthGuard] },
  // { path: 'edit/:featureId', component: FeatureCreateComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  // {path: '404', component: NotFoundComponent},
  // {path: '**', redirectTo: '/404'}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
