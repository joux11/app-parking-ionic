import { Component, OnInit } from '@angular/core';
import { parkingService } from '../services/parking.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';
import { IResponse } from '../interfaces/response.interface';

@Component({
  selector: 'app-parqueadero',
  templateUrl: './parqueadero.page.html',
  styleUrls: ['./parqueadero.page.scss'],
})
export class ParqueaderoPage implements OnInit {

  formData: FormGroup
  idUsuario: string = ""

  constructor(
    private _parkingService: parkingService,
    private _fb: FormBuilder,
    private _navController: NavController,
    private _toastService: ToastService
  ) {
    this.formData = this._fb.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      valorHora: ['', [Validators.required]],
      cantidadPuestos: ['']
    })
  }

  ngOnInit() {

    this._parkingService.getSession("idUsuario").then((id) => this.idUsuario = id!)

  }

  guardar() {

    const { nombre, direccion, valorHora, cantidadPuestos } = this.formData.value

    const body = {
      accion: "registrarParqueadero",
      usuarioId: this.idUsuario,
      nombre: nombre,
      direccion: direccion,
      valorHora: valorHora,
      cantidadPuestos: cantidadPuestos
    }



    this._parkingService.postData(body).subscribe((data: IResponse<any>) => {
      if (data.status) {
        this._toastService.showToast(data.msg)
        this._navController.navigateRoot('/parqueaderos')
      } else {
        this._toastService.showToast(data.msg)
      }
    })
  }

}
