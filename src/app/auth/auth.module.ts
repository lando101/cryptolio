import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { I18nModule } from '@app/i18n';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login.component';
import { ParticlesModule } from 'angular-particle';
import { ParticlesComponent } from '@app/components/particles/particles.component';
import { SharedModule } from '@app/@shared';
import { FormsModule } from '@angular/forms';
// import { CryptoLineChartComponent } from '@app/components/crypto-line-chart/crypto-line-chart.component';
// import {MatFormFieldModule} from '@angular/material/form-field';

// import {MatFormFieldModule} from '@angular/';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    NgbModule,
    I18nModule,
    AuthRoutingModule,
    ParticlesModule,
    SharedModule,
    // CryptoLineChartComponent
    // MatFormFieldModule
  ],
  declarations: [LoginComponent, ParticlesComponent],
})
export class AuthModule {}
