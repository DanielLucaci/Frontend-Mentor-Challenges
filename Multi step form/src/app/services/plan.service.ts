import { Injectable } from '@angular/core';
import { Plan } from '../models/plan.model';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  plans: Plan[] = [
    new Plan('p1', 'Arcade', { monthly: 9, yearly: 90}),
    new Plan('p2', 'Advanced',  { monthly: 12, yearly: 120}),
    new Plan('p3', 'Pro', { monthly: 15, yearly: 150})
  ]

  constructor() { }

  getPlans() {
    return [...this.plans];
  }

}
