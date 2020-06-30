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
// import {MatFormFieldModule} from '@angular/material/form-field';

// import {MatFormFieldModule} from '@angular/';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbModule,
    I18nModule,
    AuthRoutingModule,
    ParticlesModule,
    SharedModule
    // MatFormFieldModule
  ],
  declarations: [LoginComponent, ParticlesComponent],
})
export class AuthModule {}
