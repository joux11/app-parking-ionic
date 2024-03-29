import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import * as moment from 'moment';
import { IResponse } from 'src/app/interfaces/response.interface';
import { parkingService } from 'src/app/services/parking.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {


  txtPlaca: string = ""
  txtModelo: string = ""
  txtAnio: string = ""
  txtFechaIngreso: string = ""
  txtHoraIngreso: string = ""
  txtFechaSalida: string = ""
  txtHoraSalida: string = ""

  idVehiculo: string = ""
  puestoId: string = ""

  valorHora: number = 0.0
  total: string = ""


  cardPagar: boolean = false



  constructor(private _nav: NavController, private _parkingService: parkingService, private _modalController: ModalController) { }

  ngOnInit() {

    this._parkingService.getSession("puestoId").then((id) => {

      this.puestoId = id!

      const body = {
        accion: "getVehiculo",
        puestoId: id
      }

      this._parkingService.postData(body).subscribe((data: IResponse<any>) => {
        if (data.status) {
          this.txtPlaca = data.data[0].placa
          this.txtModelo = data.data[0].modelo
          this.txtAnio = data.data[0].anio
          this.txtFechaIngreso = data.data[0].fecha_ingreso
          this.txtHoraIngreso = data.data[0].hora_ingreso

          this.idVehiculo = data.data[0].id
        }
      })

    })

    this.txtFechaSalida = this.formatDate(new Date())
    this.txtHoraSalida = this.obtenerHoraExacta()



  }

  guardar() {
    const body = {
      accion: "updateVehiculo",
      fecha_salida: this.txtFechaSalida,
      hora_salida: this.txtHoraSalida,
      id: this.idVehiculo
    }
    this.valoresPagar()
    this.cardPagar = true

    this._parkingService.postData(body).subscribe((data: IResponse<any>) => {
      if (data.status) {
        this.valoresPagar()
        this.cardPagar = true
      }
    })
  }

  pagar() {
    const body = {
      accion: "actualizaEstadoPuesto",
      puestoId: this.puestoId,
      estado: "0"
    }

    this._parkingService.postData(body).subscribe((data: IResponse<any>) => {
      if (data.status) {
        this._modalController.dismiss(data.msg, "guardado")

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
  calcularHorasEntreFechas(horaInicioStr: string, horaFinStr: string): number {
    const horaInicio = moment(horaInicioStr, 'HH:mm:ss');
    const horaFin = moment(horaFinStr, 'HH:mm:ss');

    // Calcular la diferencia en milisegundos
    const diferenciaMs = horaFin.diff(horaInicio);

    // Convertir la diferencia a horas
    const horas = moment.duration(diferenciaMs).asHours();

    return horas;
  }

  valoresPagar() {
    this._parkingService.getSession("valorHora").then(valor => {
      this.valorHora = parseFloat(valor!)
      const hora = this.calcularHorasEntreFechas(this.txtHoraIngreso, this.txtHoraSalida)
      this.total = (hora * this.valorHora).toFixed(2)
    })

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
