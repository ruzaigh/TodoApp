import {Directive, HostListener} from '@angular/core';
import {MenuController} from "@ionic/angular";

@Directive({
  selector: '[appMenu]'
})
export class MenuDirective {

  constructor(
    private menuCtrl: MenuController
  ) { }

  @HostListener('click',['$event.target'])
  public onClick(){
    this.closeMenu()
  }

  private closeMenu(){
    this.menuCtrl.close();
  }
}
