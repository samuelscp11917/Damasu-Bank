import { TokenState } from "./state/session.reducer"

export interface AppState {
    readonly token: TokenState;
}