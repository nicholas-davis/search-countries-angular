import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsRoutingModule } from './search-results-routing.module';
import { SearchResultsComponent } from './search-results.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    SearchResultsComponent
  ],
  imports: [
    CommonModule,
    SearchResultsRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule
  ]
})
export class SearchResultsModule { }
