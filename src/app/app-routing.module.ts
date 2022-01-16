import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';

const routes: Routes = [
  {
    path: 'accounts',
    loadChildren: () =>
      import('./entity/accounts/accounts.module').then((m) => m.AccountsModule),
  },
  {
    path: 'coffees',
    loadChildren: () =>
      import('./entity/coffees/coffees.module').then((m) => m.CoffeesModule),
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/coffees', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
