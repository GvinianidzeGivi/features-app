import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MenuItem } from './menu';


const BACKEND_URL = environment.apiUrl + '/menu/';

@Injectable({ providedIn: 'root' })
export class MenuService {

  private menuItems: MenuItem[] = [];

  private menuItemsUpdated = new Subject<{ menuItems: MenuItem[]}>();

  constructor(private http: HttpClient, private router: Router) {}

  getMenuItems() {
    this.http.get<{menuItems: any}>(BACKEND_URL)
      .pipe(
        map(menuItemData => {
          return {
            menuItems: menuItemData.menuItems.map(menuItem => {
              return {
                title: menuItem.title,
                id: menuItem._id,
              };
            }),
          };
        })
      )
      .subscribe(transformedMenuItemData => {
        this.menuItems = transformedMenuItemData.menuItems;

        this.menuItemsUpdated.next({
          menuItems: [...this.menuItems],
        });
      });
  }

  getMenuItemUpdateListener() {
    return this.menuItemsUpdated.asObservable();
  }


  getMenuItem(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
    }>(BACKEND_URL + id);
  }

  addMenuItem(title: string) {
    const menuItemData: MenuItem = { id: null, title: title};

    this.http
      .post<{menuItem: MenuItem }>(BACKEND_URL, menuItemData)
      .subscribe(responseData => {
        this.router.navigate(['/features']);
      });
  }

  updateMenuItem(id: string, title: string) {
    const menuItemData: MenuItem = { id: id, title: title};
    this.http.put(BACKEND_URL + id, menuItemData).subscribe(response => {
      this.router.navigate(['/features']);
    });
  }

  deleteMenuItem(menuItemId: string) {
    return this.http.delete(BACKEND_URL + menuItemId);
  }
}
