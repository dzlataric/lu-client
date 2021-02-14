import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegistrationComponent} from "./component/registration/registration.component";
import {VerificationComponent} from "./component/verification/verification.component";
import {LoginComponent} from "./component/login/login.component";
import {ProfileComponent} from "./component/profile/profile.component";
import {TaskComponent} from "./component/task/task.component";
import {PreRegistrationComponent} from "./component/pre-registration/pre-registration.component";

const routes: Routes = [
  {
    path: 'pre-registration',
    component: PreRegistrationComponent,
  },
  {
    path: 'registration/:role',
    component: RegistrationComponent,
  },
  {
    path: 'verify/:code',
    component: VerificationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'task/:taskId',
    component: TaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
