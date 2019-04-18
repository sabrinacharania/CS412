import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contact.component';
import { ContactDetailComponent} from './contact.detail.component';

const routes: Routes = [

  { path: 'main', component: AppComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'detail/:name', component: ContactDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
