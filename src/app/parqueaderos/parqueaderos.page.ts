import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { parkingService } from '../services/parking.service';
import { IResponse } from '../interfaces/response.interface';
import { IParqueadero } from './interfaces/parqueader.interface';

@Component({
  selector: 'app-parqueaderos',
  templateUrl: './parqueaderos.page.html',
  styleUrls: ['./parqueaderos.page.scss'],
})
export class ParqueaderosPage implements OnInit {

  parqueaderos: IParqueadero[] = []


  constructor(private _navController: NavController, private _parkingService: parkingService,) { }
  ngOnInit(): void {
    this._parkingService.getSession("idUsuario").then((id) => {
      const body = {
        accion: "listarParqueaderos",
        usuarioId: id!
      }

      this._parkingService.postData(body).subscribe((data: IResponse<IParqueadero>) => {
        if (data.status) {
          this.parqueaderos = data.data

        }
      })

    }
    )
  }

  irHome(parqueaderoId: string, valorHora: string) {
    this._navController.navigateRoot('/home');
    this._parkingService.createSession("parqueaderoId", parqueaderoId)

    this._parkingService.createSession("valorHora", valorHora)
  }
  irParqueadero() {
    this._navController.navigateRoot('/parqueadero');
  }

}
