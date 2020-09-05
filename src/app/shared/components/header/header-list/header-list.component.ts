import { MenuItem } from './../menu';
import { MenuService } from '../menu.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-header-list',
  templateUrl: './header-list.component.html',
})
export class HeaderListComponent implements OnInit {
  userIsAuthenticated = false;
  isLoading = false;
  private menuSub: Subscription;
  menuItems: MenuItem[] = [];
  private authListenerSub: Subscription;

  constructor(private authService: AuthService, private menuService: MenuService) {}


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.menuItems , event.previousIndex, event.currentIndex);
    localStorage.setItem('menu', JSON.stringify(this.menuItems));
  }

  ngOnInit() {
    this.isLoading = true;
    this.menuService.getMenuItems();
    this.menuSub = this.menuService.getMenuItemUpdateListener()
    .subscribe((menuItemData: {menuItems: MenuItem[]}) => {
      //  if (localStorage.getItem('menu') !== null) {
      //   this.menuItems = JSON.parse(localStorage.getItem('menu'));
      //   this.menuItems.push(menuItemData.menuItems[menuItemData.menuItems.length - 1])
      //   this.menuItems.pop();
      //  } else {
      //   this.menuItems = menuItemData.menuItems;
      // }
      console.log(menuItemData.menuItems);

      this.menuItems = menuItemData.menuItems;
     })

     this.isLoading = false;
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.menuSub.unsubscribe();
    this.authListenerSub.unsubscribe();
  }
}
