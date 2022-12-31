import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddOn } from 'src/app/models/add-ons.model';
import { Plan } from 'src/app/models/plan.model';
import { User } from 'src/app/models/user.model';
import { AddOnService } from 'src/app/services/add-on.service';
import { PlanService } from 'src/app/services/plan.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  addOns: AddOn[];
  period: string;
  plan: Plan;
  user: User;
  total: number = 0;

  constructor(
    private planService: PlanService,
    private addOnsService: AddOnService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    const { selectedAddOns: addOns, selectedPlanId: planId, period } = this.user;
    this.period = period;
    this.plan = this.planService.getPlans().find(plan => plan.id === planId);
    this.addOns = this.addOnsService.getAddOns().filter(addOn => addOns.includes(addOn.id));
    this.computeTotal();
  }

  private computeTotal() {
    this.total = 0;
    this.total += this.plan.price[this.period];
    this.addOns.map(addOn => addOn.price[this.period]).forEach((value) => this.total += value);
  }

  onChangePeriod() {
    this.period = (this.period === 'monthly') ? 'yearly' : 'monthly';
    this.userService.setPlan(this.plan.id, this.period);
    this.computeTotal();
  }

  onConfirm() {
    localStorage.setItem('user', JSON.stringify(this.user));
    this.userService.addUser();
    this.router.navigate(['..', 'thank-you'], { relativeTo: this.route, state: { data: { ok: true } } });
  }

  onGoBack() {
    this.router.navigate(['..', 'add-ons'], { relativeTo: this.route });
  }

  get capitalizedPeriod(): string {
    return this.period.charAt(0).toUpperCase() + this.period.slice(1);
  }

  get shortenedPeriod(): string {
    return (this.period === 'monthly') ? 'mo' : 'yr';
  }
}
