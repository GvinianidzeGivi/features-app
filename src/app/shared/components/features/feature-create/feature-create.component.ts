import { Feature } from './../feature.model';
import { FeaturesService } from '../features.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-feature-create',
  templateUrl: './feature-create.component.html',
})
export class FeatureCreateComponent implements OnInit {
  enteredTitle = '';
  feature: Feature;
  isLoading = false;
  form: FormGroup;
  private mode = 'create';
  private featureId: string;
  private authStatusSub: Subscription;

  constructor(
    public featuresService: FeaturesService,
    public route: ActivatedRoute,
    private authService: AuthService,
  ) {}



  onSaveFeature() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.featuresService.addFeature(
        this.form.value.title,
      );
    } else {
      this.featuresService.updateFeature(
        this.featureId,
        this.form.value.title,
      );
    }
    this.form.reset();
  }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        console.log(authStatus);
        this.isLoading = false;
      }
    );
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('featureId')) {
        this.mode = 'edit';
        this.featureId = paramMap.get('featureId');
        this.isLoading = true;
        this.featuresService.getFeature(this.featureId).subscribe(featureData => {
          this.isLoading = false;
          this.feature = {
            id: featureData._id,
            title: featureData.title,
          };
          this.form.setValue({
            title: this.feature.title,
          });
        });
      } else {
        this.mode = 'create';
        this.featureId = null;
      }
    });
  }

   ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}

export class DialogContentExampleDialog {}
