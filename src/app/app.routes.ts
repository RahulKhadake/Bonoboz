import { RouterModule, Routes } from '@angular/router';
import { ListpagenewsComponent } from './listpagenews/listpagenews.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: '/List', pathMatch: 'full' },  // Default route redirecting to List
  { path: 'List', component: ListpagenewsComponent },     // Route for ListpagenewsComponent
  { path: 'news', component: NewsDetailsComponent },      // Route for NewsDetailsComponent
  { path: '**', redirectTo: '' }                          // Wildcard route to handle any undefined paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
