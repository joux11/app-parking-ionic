import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'parqueaderos',
    loadChildren: () => import('./parqueaderos/parqueaderos.module').then( m => m.ParqueaderosPageModule)
  },
  {
    path: 'puesto',
    loadChildren: () => import('./puesto/puesto.module').then( m => m.PuestoPageModule)
  },
  {
    path: 'parqueadero',
    loadChildren: () => import('./parqueadero/parqueadero.module').then( m => m.ParqueaderoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
