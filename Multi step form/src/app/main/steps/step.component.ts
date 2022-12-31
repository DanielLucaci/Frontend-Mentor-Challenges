import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {
    const user = this.userService.getUser();
    let navigation = "";
    if (!user) {
      navigation = 'your-info';
    }
    else {
      navigation = 'summary';
      if (!user.selectedAddOns.length)
        navigation = 'add-ons';
      else if (!user.selectedPlanId)
        navigation = 'select-plan';
    }
    this.router.navigate([navigation], { relativeTo: this.route});
  }
}
