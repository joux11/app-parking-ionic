import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PuestoPageRoutingModule } from './puesto-routing.module';

import { PuestoPage } from './puesto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PuestoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PuestoPage]
})
export class PuestoPageModule { }
