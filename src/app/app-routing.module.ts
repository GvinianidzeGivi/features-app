import { HeaderListComponent } from './shared/components/header/header-list/header-list.component';
import { HeaderCreateComponent } from './shared/components/header/header-create/header-create.component';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { FeatureCreateComponent } from './shared/components/features/feature-create/feature-create.component';
import { FeatureListComponent } from './shared/components/features/feature-list/feature-list.component';
import { AuthGuard } from './auth/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
  { path: '', component:  HeaderListComponent},
  { path: 'create/feature', component: FeatureCreateComponent, canActivate: [AuthGuard] },
  { path: 'create/menu-item', component: HeaderCreateComponent, canActivate: [AuthGuard] },
  { path: 'features', component: FeatureListComponent, canActivate: [AuthGuard] },

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
