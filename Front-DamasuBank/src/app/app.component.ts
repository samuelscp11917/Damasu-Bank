import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './Components/NavBar/nav-bar/nav-bar.component';
import { FooterComponent } from './Components/Footer/footer/footer.component';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from './ngRx/app.state';
import { TokenState } from './ngRx/state/session.reducer';
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

  isAuthenticated: boolean = true; // Asegúrate de que esté declarada aquí

  userActivity: any;
  userInactive: Subject<any> = new Subject();

  constructor(private store: Store<AppState>) {
    this.setTimeout();
    this.userInactive.subscribe(() => {
      console.log('user has been inactive for 10s');
      // this.store.dispatch(sessionActions.removeToken());
    });
  }
  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 3000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

}
