import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchComponent } from './search/search.component';
import { ApptableComponent } from './apptable/apptable.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from '../material/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';

import { SortPipe } from '../sort.pipe';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
const shareCompoent = [SearchComponent, ApptableComponent, SortPipe];

@NgModule({
  declarations: [...shareCompoent, ModalComponent],
  imports: [
    CommonModule,
    MatNativeDateModule,
    NgxPaginationModule,
    MaterialModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
  ],

  exports: [...shareCompoent],
})
export class ComponentsModule {}
