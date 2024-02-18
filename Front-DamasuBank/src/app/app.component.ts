import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './Components/NavBar/nav-bar/nav-bar.component';
import { FooterComponent } from './Components/Footer/footer/footer.component';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from './app.state';
import { Observable, interval, Subscription } from 'rxjs';
import { take, Subject } from 'rxjs';
import * as sessionActions from '../app/ngRx/state/session.action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,NavBarComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DamasuBank';

  private inactivityTimeout = 1 * 60 * 1000; // 5 minutos en milisegundos (ajustable)
  private lastActivityTime:number = Date.now();
  private inactivitySubscription: Subscription | undefined;
  isAuthenticated: boolean = true; // Asegúrate de que esté declarada aquí

  userActivity: any;
  userInactive: Subject<any> = new Subject();

  constructor(private store: Store<AppState>) {
    this.setTimeout();
    this.userInactive.subscribe(() => console.log('user has been inactive for 3s'));
  }
  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 3000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

}
