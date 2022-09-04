import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthState} from "../auth.state";

export const getAuthState = createFeatureSelector<AuthState>('todo-auth');

export const selecAuthState = createSelector(getAuthState, (state: AuthState) => state.user);
