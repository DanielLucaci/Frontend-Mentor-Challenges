import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot,  CanActivateChild, Route, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./user.service";

@Injectable()
export class StepGuard implements CanActivateChild {
   constructor(private userService: UserService, private router: Router) {}

   canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      const user = this.userService.getUser();
      console.log(user);
      switch(route.routeConfig.path) {
        case 'your-info':
          return true;
        case 'select-plan':
          return !!user && user.email !== '';
        case 'summary':
        case 'add-ons':
          return !!user && user.selectedPlanId !== '';
        case 'thank-you':
          const ok = !!this.router.getCurrentNavigation().extras.state?.data?.ok;
          if(!ok)
            return this.router.createUrlTree(['..', 'step']);
          return true;
        default:
          return false;
      }
    }
}
