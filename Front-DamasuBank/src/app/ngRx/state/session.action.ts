import { createAction, props } from '@ngrx/store';
import { SessionState } from 'http2';

export const userActivityDetected = createAction('[Session] User Activity Detected');
export const checkInactivity = createAction('[Session] Check Inactivity');
export const startSessionTimer = createAction('[Session] Start Session Timer',
    props<{sessionTime:number}>())
export const resetSessionTimer = createAction('[Session] Reset Session Timer',);
export const endSession = createAction('[Session] End Session',
    props<{sessionTime:number}>());
    export const updateLastActivityTime = createAction(
        '[Session] Update Last Activity Time',
        props<{ lastActivityTime: number }>()
      );