import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { parkingService } from '../services/parking.service';
import { IPuesto } from './interfaces/puestos.interface';
import { IResponse } from '../interfaces/response.interface';
import { ModalComponent } from './components/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  puestos: IPuesto[] = []

  constructor(private _nav: NavController, private _parkingService: parkingService, private _modalController: ModalController) { }
  ngOnInit(): void {
    this.listarPuestos()
  }

  goPuesto(puestoId: string) {
    this._nav.navigateRoot('/puesto');
    this._parkingService.createSession("puestoId", puestoId)
  }
  salir() {
    this._nav.navigateRoot('/parqueaderos');
  }
  async pagar(puestoId: string): Promise<void> {
    this._parkingService.createSession("puestoId", puestoId)
    const modal = await this._modalController.create({
      component: ModalComponent,
      initialBreakpoint: 0.82,
      breakpoints: [0.1, 0.82, 1],
    });


    modal.present()

    const { data, role } = await modal.onWillDismiss();
    if (role === 'guardado') {
      this.listarPuestos()
    }


  }

  listarPuestos() {
    this._parkingService.getSession("parqueaderoId").then((id) => {
      const body = {
        accion: "listarPuestos",
        parqueaderoId: id
      }
      this._parkingService.postData(body).subscribe((data: IResponse<IPuesto>) => {
        this.puestos = data.data

      })
    }
    )
  }
}
