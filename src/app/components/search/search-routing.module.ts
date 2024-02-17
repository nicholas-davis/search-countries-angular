import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search.component';

const routes: Routes = [{
  path: '', component: SearchComponent, children: [{
    path: 'search-results',
    loadChildren: () => import('../../components/search-results/search-results.module').then(m => m.SearchResultsModule)
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
