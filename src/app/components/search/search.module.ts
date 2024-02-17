import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SearchRoutingModule,
    MatProgressSpinnerModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule
  ]
})
export class SearchModule { }
