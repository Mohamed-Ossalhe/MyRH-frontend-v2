import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlansComponent } from './pages/plans/plans.component';
import { PlanCardComponent } from './components/plan-card/plan-card.component';
import { SharedModule } from '@app/shared/shared.module';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PlansComponent,
    PlanCardComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class PlansModule { }
