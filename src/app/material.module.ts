import { NgModule } from '@angular/core';

import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';

import {
  MatFormFieldModule,
  MatMenuModule,
  MatCheckboxModule,
  MatNativeDateModule
} from '@angular/material';

const MATMODULES = [
    MatToolbarModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    FlexLayoutModule,
    MatTabsModule,
    MatCardModule,
    MatRadioModule,
    MatFormFieldModule,
    MatMenuModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatListModule
]
@NgModule({

  imports: [
    MATMODULES
  ],
  exports: [
    MATMODULES
  ]
})
export class MaterialModule { 
  
}
