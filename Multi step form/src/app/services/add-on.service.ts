import { Injectable } from '@angular/core';
import { AddOn } from '../models/add-ons.model';

@Injectable({
  providedIn: 'root'
})
export class AddOnService {
  addOns: AddOn[] = [
    new AddOn('add-on1', 'Online service', 'Access to multiplayer games', { monthly: 1, yearly: 10 }),
    new AddOn('add-on2', 'Larger storage', 'Extra 1TB of cloud save', { monthly: 2, yearly: 20 }),
    new AddOn('add-on3', 'Customizable profile', 'Custom theme on your profile', { monthly: 2, yearly: 20 })
  ];

  constructor() { }

  getAddOns() {
    return this.addOns.slice();
  }
}
