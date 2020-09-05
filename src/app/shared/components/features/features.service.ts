import { environment } from '../../../../environments/environment';
import { Feature } from './feature.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


const BACKEND_URL = environment.apiUrl + '/features/';

@Injectable({ providedIn: 'root' })
export class FeaturesService {
  private features: Feature[] = [];
  private featuresUpdated = new Subject<{ features: Feature[]}>();

  constructor(private http: HttpClient, private router: Router) {}

  getFeatures() {
    this.http.get<{features: any}>(BACKEND_URL)
      .pipe(
        map(featureData => {
          return {
            features: featureData.features.map(feature => {
              return {
                title: feature.title,
                id: feature._id,
              };
            }),
          };
        })
      )
      .subscribe(transformedFeatureData => {
        this.features = transformedFeatureData.features;

        this.featuresUpdated.next({
          features: [...this.features],
        });
      });
  }

  getFeatureUpdateListener() {
    return this.featuresUpdated.asObservable();
  }


  getFeature(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
    }>(BACKEND_URL + id);
  }

  addFeature(title: string) {
    const featureData: Feature = { id: null, title: title};

    this.http
      .post<{ message: string; feature: Feature }>(BACKEND_URL, featureData)
      .subscribe(responseData => {
        this.router.navigate(['/features']);
      });
  }

  updateFeature(id: string, title: string) {
    const featureData: Feature = { id: id, title: title};
    this.http.put(BACKEND_URL + id, featureData).subscribe(response => {
      this.router.navigate(['/features']);
    });
  }

  deleteFeature(featureId: string) {
    return this.http.delete(BACKEND_URL + featureId);
  }
}
