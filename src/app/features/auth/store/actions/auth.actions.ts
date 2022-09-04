import {createAction, props} from "@ngrx/store";

export enum AuthActionTypes {
  getAuth = '[Auth] get Auth',
  getAuthSuccess = '[Auth] get Auth Success',
  getAuthFailure = '[Auth] auth Failure',
  authLogin = '[Auth] auth Login',
  authLogOut = '[Auth] auth LogOut',
}

export const getAuth = createAction(
  AuthActionTypes.getAuth,
  props<{ userId: string }>()
);

export const getAuthSuccess = createAction(
  AuthActionTypes.getAuthSuccess,
  props<any>()
);

export const getAuthFailure = createAction(
  AuthActionTypes.getAuthFailure,
  props<any>()
);

export const authLogin = createAction(
  AuthActionTypes.authLogin,
  props<{ email: string ; password: string }>()
);
