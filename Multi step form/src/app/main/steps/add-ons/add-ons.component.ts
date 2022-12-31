import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddOn } from 'src/app/models/add-ons.model';
import { AddOnService } from 'src/app/services/add-on.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-ons',
  templateUrl: './add-ons.component.html',
  styleUrls: ['./add-ons.component.css']
})
export class AddOnsComponent implements OnInit {
  period: string;
  addOns: AddOn[];
  selectedAddOns: string[];

  constructor(
    private addOnService: AddOnService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.selectedAddOns = this.userService.getAddOns();
    this.period = this.userService.getUser().period;
    this.addOns = this.addOnService.getAddOns();
  }

  onToggleAddOn(addOnId: string) {
    if(this.selectedAddOns.includes(addOnId)) {
      this.selectedAddOns.splice(this.selectedAddOns.indexOf(addOnId), 1);
    } else {
      this.selectedAddOns.push(addOnId);
    }
  }

  onConfirm() {
    this.userService.setAddOns(this.selectedAddOns);
    this.router.navigate(['..', 'summary'], { relativeTo: this.route });
  }

  onGoBack() {
    this.router.navigate(['..', 'select-plan'], { relativeTo: this.route });
  }
}
