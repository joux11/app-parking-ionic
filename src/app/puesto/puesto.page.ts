import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { parkingService } from '../services/parking.service';
import { IResponse } from '../interfaces/response.interface';
import { ToastService } from '../services/toast.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-puesto',
  templateUrl: './puesto.page.html',
  styleUrls: ['./puesto.page.scss'],
})
export class PuestoPage implements OnInit {

  formData: FormGroup
  puestoId?: string

  constructor(private _fb: FormBuilder, private _parkingService: parkingService, private _toastService: ToastService, private _navController: NavController,) {
    this.formData = this._fb.group({
      placa: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      anio: [''],
      fechaIngreso: [this.formatDate(new Date())],
      horaIngreso: [this.obtenerHoraExacta()]
    })
  }

  ngOnInit() {
    const fecha = new Date()
    this._parkingService.getSession("puestoId").then((id) => this.puestoId = id!)
  }

  guardar() {
    const { placa, modelo, anio, fechaIngreso, horaIngreso } = this.formData.value

    const body = {
      accion: "registrarVehiculo",
      placa: placa,
      modelo: modelo,
      anio: anio,
      fecha_ingreso: fechaIngreso,
      hora_ingreso: horaIngreso,
      puesto_id: this.puestoId

    }
    this._parkingService.postData(body).subscribe((data: IResponse<any>) => {
      if (data.status) {
        this.actualizarEstadoPuesto(this.puestoId!, "1")
        this._toastService.showToast(data.msg)
        this._parkingService.closeSession("puestoId")
        this._navController.navigateRoot('/home')

      }
    })

  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
  obtenerHoraExacta(): string {
    const fechaActual: Date = new Date();
    const hora: number = fechaActual.getHours();
    const minutos: number = fechaActual.getMinutes();
    const segundos: number = fechaActual.getSeconds();

    const horaFormateada: string = ('0' + hora).slice(-2);
    const minutosFormateados: string = ('0' + minutos).slice(-2);
    const segundosFormateados: string = ('0' + segundos).slice(-2);


    return `${horaFormateada}:${minutosFormateados}:${segundosFormateados}`;
  }

  actualizarEstadoPuesto(puestoID: string, estado: string) {
    const body = {
      accion: "actualizaEstadoPuesto",
      puestoId: puestoID,
      estado: estado
    }

    this._parkingService.postData(body).subscribe((data: IResponse<any>) => {
      if (data.status) {
        console.log(data)
      }
    })
  }

}
