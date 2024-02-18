// // balance.service.ts
// import { Injectable } from '@angular/core';
// import { Store, select } from '@ngrx/store';
// import * as tokenActions from '../../ngRx/state/session.action';
// import * as TokenState from '../../ngRx/state/session.reducer';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class BalanceService {
//   constructor(private store: Store) {}

//   hasToken(): Observable<boolean> {
//     return this.store.pipe(
//       select('Beaver'),
//       map((tokenState) => !!tokenState.token)
//     );
//   }

//   removeToken() {
//     this.store.dispatch(tokenActions.removeToken());
//   }
// }
