import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';

// MATERIAL
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CarouselComponent } from '@app/components/carousel/carousel.component';
// import { IonicPageModule, IonicModule } from '@ionic/angular';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';


// import { ParticlesModule } from 'angular-particle';


@NgModule({
  imports: [
    CommonModule,
    MatSliderModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule,
    MatExpansionModule,
    MatTabsModule,
    // IonicModule.forRoot({
    //   rippleEffect: false,
    //   mode: 'md'
    // }),
    CarouselModule.forRoot(),
    // CarouselComponent,

  ],
  declarations: [LoaderComponent,],
  exports: [
    LoaderComponent,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    CarouselModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule,
    MatExpansionModule,
    MatTabsModule,
    // LoaderComponent
    // IonicModule
    // CarouselComponent
  ],
})
export class SharedModule {}
