import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DragndropService {

  feature = new BehaviorSubject(this.features);

  set features(value) {
    this.feature.next(value);
    localStorage.setItem('features', value);
  }

  get features() {
    return localStorage.getItem('features');
  }
}
