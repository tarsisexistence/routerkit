// tslint:disable:max-line-length
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  forwardParams,
  getRegisteredUnits,
  getUnit,
  Secluded,
  Unit,
  Units
} from 'routeshub';

import { Hub } from '../../../hub/app.hub';
import { AppChildNotes, AppNotes, APP_NOTES_KEY } from '../../../hub/app.notes';
import { AboutNotes } from '../../../views/about/hub/about.notes';
import { CarNotes, CAR_NOTES_KEY } from '../../../views/car/hub/car.notes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  /**
   * Declares component property
   * for template access reason
   */
  public hub: Units<Hub>;

  // getting unit from function by key (unit name is available too)
  public car = getUnit<CarNotes>(CAR_NOTES_KEY);

  // getting unit by key
  @Secluded(APP_NOTES_KEY)
  public app: Unit<AppNotes, AppChildNotes>;

  // getting unit by name
  @Secluded('about')
  public about: Unit<AboutNotes>;

  constructor(private router: Router) {}

  public ngOnInit(): void {
    /**
     * Getting access to use units in template
     */
    this.hub = getRegisteredUnits<Hub>();
  }

  /**
   * navigation through
   * router.navigate and forwardParams
   */
  public freshCar(): void {
    this.router
      .navigate(forwardParams(this.hub.car.year.state, { year: 2019 }))
      .catch(console.error);
  }
}
