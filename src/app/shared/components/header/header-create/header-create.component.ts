import { MenuService } from './../menu.service';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MenuItem } from '../menu';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-header-create',
  templateUrl: './header-create.component.html',
})
export class HeaderCreateComponent implements OnInit {
  menuItems: MenuItem;
  isLoading = false;
  menuItemForm: FormGroup;
  private mode = 'create';
  private menuItemId: string;
  private authStatusSub: Subscription;

  constructor(
    public menuService: MenuService,
    public route: ActivatedRoute,
    private authService: AuthService,
  ) {}



  onSaveMenu() {
    console.log(this.menuItemForm);

    if (this.menuItemForm.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.menuService.addMenuItem(
        this.menuItemForm.value.menuItemtitle,
      );
    } else {
      this.menuService.updateMenuItem(
        this.menuItemId,
        this.menuItemForm.value.menuItemtitle,
      );
    }
    this.menuItemForm.reset();
  }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        console.log(authStatus);
        this.isLoading = false;
      }
    );
    this.menuItemForm = new FormGroup({
      menuItemtitle: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('menuItemId')) {
        this.mode = 'edit';
        this.menuItemId = paramMap.get('menuItemId');
        this.isLoading = true;
        this.menuService.getMenuItem(this.menuItemId).subscribe(menuItemData => {
          this.isLoading = false;
          this.menuItems = {
            id: menuItemData._id,
            title: menuItemData.title,
          };
          this.menuItemForm.setValue({
            title: this.menuItems.title,
          });
        });
      } else {
        this.mode = 'create';
        this.menuItemId = null;
      }
    });
  }

   ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
