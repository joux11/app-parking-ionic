import { Component, OnInit } from '@angular/core';
import { parkingService } from '../services/parking.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { IResponse } from '../interfaces/response.interface';
import { IUsuario } from '../interfaces/usuario.interface';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  formData: FormGroup;


  constructor(
    private _parkingService: parkingService,
    private _fb: FormBuilder,
    private _navController: NavController,
    private _toastService: ToastService
  ) {
    this.formData = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })

  }

  login() {
    if (this.formData.valid) {
      const { email, password } = this.formData.value
      const body = {
        accion: "login",
        email: email,
        password: password
      }

      //this._navController.navigateRoot('/parqueaderos')

      this._parkingService.postData(body).subscribe((data: IResponse<IUsuario>) => {
        if (data.status) {
          const { id } = data.data[0]
          this._parkingService.createSession("idUsuario", id)
          this._navController.navigateRoot('/parqueaderos')
          this._toastService.showToast(data.msg)
        } else {
          this._toastService.showToast(data.msg)
        }
      })
    } else {
      this.formData.markAllAsTouched()
    }

  }


}
