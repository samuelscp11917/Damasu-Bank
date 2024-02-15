import { createReducer, on } from '@ngrx/store';
import * as sessionActions from './session.action';

export interface SessionState {
  timer: number; // tiempo en milisegundos
  lastActivityTime: number; // tiempo del último movimiento del usuario
}

export const initialSessionState: SessionState = {
  timer: 0,
  lastActivityTime: Date.now(),
};

export const sessionReducer = createReducer(
  initialSessionState,
  on(sessionActions.resetSessionTimer, (state) => ({ ...state, timer: 0 })),
  on(sessionActions.startSessionTimer, (state) => ({ ...state, timer: Date.now() })),
  on(sessionActions.endSession, (state) => ({ ...state, timer: 0 })),

  // Nueva acción para manejar la inactividad
  on(sessionActions.userActivityDetected, (state) => ({
    ...state,
    lastActivityTime: Date.now(),
  })),
  on(sessionActions.checkInactivity, (state) => {
    const inactivityTimeout = 5 * 60 * 1000; // 5 minutos en milisegundos
    const elapsedTimeSinceLastActivity = Date.now() - state.lastActivityTime;

    if (elapsedTimeSinceLastActivity >= inactivityTimeout) {
      // Si ha pasado el tiempo de inactividad, resetea el temporizador
      return { ...state, timer: 0 };
    }

    return state;
  })
);
