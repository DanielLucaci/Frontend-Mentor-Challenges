import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOnsComponent } from './main/steps/add-ons/add-ons.component';
import { BillingComponent } from './main/steps/billing/billing.component';
import { StepComponent } from './main/steps/step.component';
import { SubmitFormComponent } from './main/steps/submit-form/submit-form.component';
import { SummaryComponent } from './main/steps/summary/summary.component';
import { ThankYouComponent } from './main/steps/thank-you/thank-you.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CanDeactivateGuard } from './services/can-deactivate.guard';
import { StepGuard } from './services/step-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/step', pathMatch: 'full' },
  {
    path: 'step', canActivateChild: [StepGuard], component: StepComponent, children: [
      { path: 'your-info', component: SubmitFormComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'select-plan', component: BillingComponent },
      { path: 'summary', component: SummaryComponent },
      { path: 'add-ons', component: AddOnsComponent },
      { path: 'thank-you', component: ThankYouComponent }
    ]
  },
  {
    path: 'not-found', component: PageNotFoundComponent
  },
  {
    path: '**', redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
