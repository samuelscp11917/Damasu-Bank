// token.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as tokenActions from './session.action';

export interface TokenState {
  token: string | null;
}

export const initialState: TokenState = {
  token: null,
};

export const tokenReducer = createReducer(
  initialState,
  on(tokenActions.removeToken, (state) => {
    return { ...state, token: null };
  })
);
