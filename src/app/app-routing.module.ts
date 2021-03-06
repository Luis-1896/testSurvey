import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { SurveyComponent } from './components/survey/survey.component';
import { AuthGuard } from './services/guards/auth.guard';
import { ResultsComponent } from './components/admin/results/results.component';
import { PruebaComponent } from './components/prueba/prueba.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'survey', component: SurveyComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'results', component: ResultsComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
  { path: 'prueba', component: PruebaComponent, canActivate: [AuthGuard] }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
