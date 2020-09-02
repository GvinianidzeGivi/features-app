import { CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { DragndropService } from './../../../services/dragndrop.service';
import { Feature } from './../feature.model';
import { FeaturesService } from '../features.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

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

  constructor(public featuresService: FeaturesService, private authService: AuthService, public dragndropService: DragndropService) {

  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.features , event.previousIndex, event.currentIndex);
    this.dragndropService.features = JSON.stringify(this.features);
  }

  ngOnInit() {
    this.isLoading = true;
    this.featuresService.getFeatures();
    this.featuresSub = this.featuresService.getFeatureUpdateListener()
    .subscribe((featureData: {features: Feature[]}) => {
        this.features = JSON.parse(this.dragndropService.features)
        const difference = Object.entries(featureData.features).reduce((c, [k, v]) => Object.assign(c, this.features[k] ? {} : { [k]: v }), {});
          for(let obj in difference) {
             this.features.push(difference[obj])
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
