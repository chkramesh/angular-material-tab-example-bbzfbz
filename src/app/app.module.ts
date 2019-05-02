import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { HttpModule, Http } from '@angular/http';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { OthersComponent } from './others/others.component';
import { AddressComponent } from './address/address.component';

import 'hammerjs';

// import { MatTabsModule } from '@angular/material';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'others', component: OthersComponent },
  { path: 'address', component: AddressComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    // MatTabsModule,
    HttpModule, 
    FormsModule, ReactiveFormsModule, NgxWebstorageModule.forRoot(),
    MaterialModule, FlexLayoutModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent, 
    HelloComponent, 
    HomeComponent, 
    SearchComponent, 
    OthersComponent,
    AddressComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
