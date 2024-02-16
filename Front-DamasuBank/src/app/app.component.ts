import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './Components/NavBar/nav-bar/nav-bar.component';
import { FooterComponent } from './Components/Footer/footer/footer.component';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from './app.state';
import { Observable, interval } from 'rxjs';
import { take } from 'rxjs';
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

  private inactivityTimeout = 5 * 60 * 1000; // 5 minutos en milisegundos (ajustable)
  private lastActivityTime:number = Date.now();
  isAuthenticated: boolean = true; // Asegúrate de que esté declarada aquí

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    // Verifica si el usuario está autenticado antes de iniciar la funcionalidad
    if (this.isAuthenticated) {
      document.addEventListener('mousemove', () => this.onUserActivity());

      // Verifica la inactividad cada minuto
      interval(60000)
        .pipe(take(1))
        .subscribe(() => this.checkInactivity());
    }
  }

  private onUserActivity() {
    const currentTime = Date.now();
    this.store.dispatch(sessionActions.updateLastActivityTime({ lastActivityTime: currentTime }));
    this.lastActivityTime = currentTime;
  }

  private checkInactivity() {
    const elapsedTimeSinceLastActivity = Date.now() - this.lastActivityTime;

    if (elapsedTimeSinceLastActivity >= this.inactivityTimeout) {
      // Si ha pasado el tiempo de inactividad, realiza las acciones necesarias
      console.log('Sesión cerrada por inactividad');
      // Aquí podrías agregar la lógica para cerrar la sesión, por ejemplo, navegando a la página de inicio de sesión.
    }
  }
}
