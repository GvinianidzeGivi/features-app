import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Feature } from './../feature.model';
import { FeaturesService } from '../features.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { FeatureCreateComponent } from '../feature-create/feature-create.component';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
})
export class FeatureListComponent implements OnInit {

  features: Feature[] = [];
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  private featuresSub: Subscription;
  private authListenerSub: Subscription;
  subscription: Subscription;
    // subject = new BehaviorSubject();

  constructor(
    public featuresService: FeaturesService,
    private authService: AuthService,
    public dialog: MatDialog
    ) {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.features , event.previousIndex, event.currentIndex);
    localStorage.setItem('features', JSON.stringify(this.features));
  }

  ngOnInit() {
    this.isLoading = true;
    this.featuresService.getFeatures();
    this.featuresSub = this.featuresService.getFeatureUpdateListener()
    .subscribe((featureData: {features: Feature[]}) => {
       if (localStorage.getItem('features') !== null) {
        this.features = JSON.parse(localStorage.getItem('features'));
        this.features.push(featureData.features[featureData.features.length - 1])
        this.features.pop();
       } else {
        this.features = featureData.features;
      }
     })

     this.isLoading = false;
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onDelete(featureId: string) {
    this.isLoading = true;
    this.featuresService.deleteFeature(featureId).subscribe(() => {
      this.featuresService.getFeatures();
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.featuresSub.unsubscribe();
    this.authListenerSub.unsubscribe();
  }
}
