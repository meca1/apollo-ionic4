import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
//import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

//Apollo things

import { Apollo } from 'apollo-angular';
import { ApolloModule } from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

const uri ="http://localhost:60000/simple/v1/cjv2p2l8000040186vxhvjc2r"
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpLinkModule,
    ApolloModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) { 
    apollo.create({
      link: httpLink.create({ uri }), 
      cache: new InMemoryCache()
    }); 
  }
}
