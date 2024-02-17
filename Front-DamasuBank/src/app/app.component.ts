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
import { userActivityDetected, checkInactivity, startSessionTimer, resetSessionTimer, endSession } from './ngRx/state/session.action';

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

  // startInactivityMonitoring() {
  //   this.inactivitySubscription = interval(60000)
  //     .subscribe(() => this.checkInactivity());
  // }

  // stopInactivityMonitoring() {
  //   if (this.inactivitySubscription) {
  //     this.inactivitySubscription.unsubscribe();
  //   }
  // }

  // ngOnInit() {
  //   // ... (otras lógicas de inicialización)

  //   if (this.isAuthenticated) {
  //     // Utilizando HostListener para escuchar el evento de mouseover
  //     this.checkInactivity(); // Llamar a checkInactivity al inicio

  //     this.inactivitySubscription = interval(60000)
  //       .pipe(take(1))
  //       .subscribe(() => this.checkInactivity());
  //   }
  // }
  // ngOnDestroy() {
  //   // Desuscribirse al destruir el componente para evitar fugas de memoria
  //   if (this.inactivitySubscription) {
  //     this.inactivitySubscription.unsubscribe();
  //   }
  // }

  // onUserActivity(event: MouseEvent) {
  //   const currentTime = Date.now();
  //   this.store.dispatch(sessionActions.updateLastActivityTime({ lastActivityTime: currentTime }));
  //   this.lastActivityTime = currentTime;
  // }

  // private checkInactivity() {
  //   const elapsedTimeSinceLastActivity = Date.now() - this.lastActivityTime;

  //   if (elapsedTimeSinceLastActivity >= this.inactivityTimeout) {
  //     // Si ha pasado el tiempo de inactividad, realiza las acciones necesarias
  //     console.log('Sesión cerrada por inactividad');
  //     // Aquí podrías agregar la lógica para cerrar la sesión, por ejemplo, navegando a la página de inicio de sesión.
  //   }
  // }
}
