import { BrowserModule } from '@angular/platform-browser';
import {  NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import {NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { ContactDetailComponent } from './contact.detail.component';
import { AppRoutingModule } from './app-routing.module';
import { ContactsComponent} from './contact.component';
import { ContactInfo} from './contact.info';

@NgModule({
  declarations: [
    AppComponent,
    ContactDetailComponent,
    ContactsComponent,
    ContactInfo
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule
  ],
  exports: [
    AppComponent,
    ContactDetailComponent,
    ContactsComponent,
    ContactInfo
  ],
  providers: [ContactInfo],
  bootstrap: [AppComponent]
})
export class AppModule { }
