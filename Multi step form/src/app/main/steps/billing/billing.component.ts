import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plan } from 'src/app/models/plan.model';
import { PlanService } from 'src/app/services/plan.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  selectedPeriod: string;
  selectedPlanId: string;
  plans: Plan[];

  constructor(
      private planService: PlanService,
      private router: Router,
      private route: ActivatedRoute,
      private userService: UserService
  ) {
    this.plans = planService.getPlans();
    const user = this.userService.getUser();
    this.selectedPlanId = user.selectedPlanId || 'p1';
    this.selectedPeriod = user.period;
  }

  ngOnInit(): void {

   }

  onChangePeriod() {
    this.selectedPeriod = (this.selectedPeriod === 'monthly') ? 'yearly' : 'monthly';
  }

  onChangePlan(planId: string) {
    this.selectedPlanId = planId;
  }

  onConfirm() {
    this.userService.setPlan(this.selectedPlanId, this.selectedPeriod);
    this.router.navigate(['..', 'add-ons'], {relativeTo: this.route});
  }

  onGoBack() {
    this.router.navigate(['..', 'your-info'], { relativeTo: this.route});
  }
}
