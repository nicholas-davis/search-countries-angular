import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { ApolloConfigModule } from './apollo.config';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    AppRoutingModule,
    ApolloConfigModule,
    MatToolbarModule,
  ],
  providers: [
    provideAnimationsAsync(),
    [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
