import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoffeesRoutingModule } from './coffees-routing.module';
import { CoffeesComponent } from './coffees.component';
import { CoffeeModalComponent } from './coffee-modal/coffee-modal.component';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CoffeesComponent, CoffeeModalComponent],
  imports: [
    CommonModule,
    CoffeesRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    MatDialogModule,
    ToastrModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoffeesModule {}
