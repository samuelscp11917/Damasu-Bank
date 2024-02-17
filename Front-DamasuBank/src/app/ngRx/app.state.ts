import { SessionState } from "./state/session.reducer"

export interface AppState {
    readonly timeState: SessionState
}