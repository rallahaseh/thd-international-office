import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { LabsComponent } from './labs/labs.component';
import { ApplyComponent } from './students/apply/apply.component';
import { InternationalComponent } from './students/international/international.component';
import { ChatComponent } from './chat/chat.component';
import { RegisterInterfaceComponent } from './register/register-interface/register-interface.component';
import { AdminRegistrationComponent } from './register/admin-registration/admin-registration.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { AdminActivate, LoginActivate } from './app-route-active.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'news', component: NewsComponent },
  { path: 'labs', component: LabsComponent, canActivate:[LoginActivate] },
  { path: 'students', children: [
    { path: 'apply', component: ApplyComponent },
    { path: 'international', component: InternationalComponent }
  ]},
  { path: 'chat', component: ChatComponent, canActivate:[LoginActivate] },
  { path: 'register', component: RegisterInterfaceComponent },
  { path: 'register/user', component: RegisterComponent },
  { path: 'register/admin', component: AdminRegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent, canActivate:[AdminActivate] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
