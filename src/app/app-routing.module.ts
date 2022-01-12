import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  { path: '', redirectTo: '/coffees', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
