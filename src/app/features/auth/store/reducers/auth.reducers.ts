import {createReducer, on} from "@ngrx/store";
import * as GetAuthActions from "../actions/auth.actions";

export const intialState = null;

export const  authReducer = createReducer(
  intialState,
  on( GetAuthActions.getAuthSuccess, (state, action) => Object.assign({}, action.user))
);
