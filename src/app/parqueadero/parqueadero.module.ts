import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParqueaderoPageRoutingModule } from './parqueadero-routing.module';

import { ParqueaderoPage } from './parqueadero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParqueaderoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ParqueaderoPage]
})
export class ParqueaderoPageModule { }
