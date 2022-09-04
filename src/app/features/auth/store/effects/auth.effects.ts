import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType } from "@ngrx/effects";
import * as authActions from "../actions/auth.actions";
import { catchError, map, exhaustMap } from "rxjs/operators";
import {AuthService} from "../../services/auth.service";
import {of} from "rxjs";
import {ToastController} from "@ionic/angular";
import {Router} from "@angular/router";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private router: Router
  ) {
  }

  getAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.getAuth),
      exhaustMap((action: any) => {
       return this.authService.currentUser$.pipe(
          map((user) => {
            if (user) {
              return authActions.getAuthSuccess({ user });
            } else {
              return authActions.getAuthFailure({ error: "No user" });
            }
          }
          ),
           catchError((error) => of(authActions.getAuthFailure({ error })))
        );
      }
    )
  ));

  getAuthSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.getAuthSuccess),
        exhaustMap((action) => {
          //save in local storage
          return of(authActions.getAuthSuccess({ user: action.user }));
        })
      ),
    { dispatch: false }
  );

  authLogin$ = createEffect(
    () =>
    this.actions$.pipe(
      ofType(authActions.authLogin),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((user) => {
            if (user) {
              return [
                authActions.getAuthSuccess({ user }),
              this.toastCtrl.create({
                message: "Login successful",
                duration: 2000,
                position: "top",
              })
                .then((toast) => toast.present()),
                this.router.navigateByUrl("/home")
              ]
            } else {
              return [
                authActions.getAuthFailure({ error: "No user" }),
                this.toastCtrl.create({
                  message: "Login failed",
                  duration: 2000,
                  position: "top",
                })
                  .then((toast) => toast.present())
              ]
            }
          }),
          catchError((error) => of(authActions.getAuthFailure({ error })))
        );
      }
    )
  ));
}
