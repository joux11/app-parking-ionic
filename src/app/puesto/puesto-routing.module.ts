import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PuestoPage } from './puesto.page';

const routes: Routes = [
  {
    path: '',
    component: PuestoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PuestoPageRoutingModule {}
