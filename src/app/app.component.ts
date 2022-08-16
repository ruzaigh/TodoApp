import { Component } from '@angular/core';
import {AuthService} from "./features/auth/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigateByUrl('/auth');
    })
  }
}
