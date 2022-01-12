import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { AccountModalComponent } from './account-modal/account-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AccountsComponent, AccountModalComponent],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    MatDialogModule,
    ToastrModule,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccountsModule {}
