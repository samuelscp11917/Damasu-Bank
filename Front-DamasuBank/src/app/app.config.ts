import { Injectable } from '@angular/core';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { CdtService } from './Services/cdt.services';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Store, StoreModule, provideState, provideStore} from '@ngrx/store'
import { mergeMap, map, withLatestFrom, filter } from 'rxjs/operators';
import { timer, interval } from 'rxjs';
import * as sessionActions from './ngRx/state/session.action';
import * as fromSession from './ngRx/state/session.reducer';
import { AppState } from './ngRx/app.state';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from '../app/app.component';
import { tokenReducer } from './ngRx/state/session.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(withFetch()), 
    CdtService, 
    BsModalService, 
    provideStore(),
    provideState({name: "timeState" , reducer: tokenReducer})
  ]
};