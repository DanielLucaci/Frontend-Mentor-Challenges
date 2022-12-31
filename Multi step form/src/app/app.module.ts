import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './main/sidebar/sidebar.component';
import { SubmitFormComponent } from './main/steps/submit-form/submit-form.component';
import { BillingComponent } from './main/steps/billing/billing.component';
import { AddOnsComponent } from './main/steps/add-ons/add-ons.component';
import { SummaryComponent } from './main/steps/summary/summary.component';
import { ThankYouComponent } from './main/steps/thank-you/thank-you.component';
import { StepComponent } from './main/steps/step.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
import { CanDeactivateGuard } from './services/can-deactivate.guard';
import { StepGuard } from './services/step-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SidebarComponent,
    SubmitFormComponent,
    BillingComponent,
    AddOnsComponent,
    SummaryComponent,
    ThankYouComponent,
    StepComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [CanDeactivateGuard, StepGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
