import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Observable } from 'rxjs';
import { IResponse } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class parkingService {

  API_URL = "http://localhost/ws_parkingapp/api/wsparking.php";

  constructor(
    private _http: HttpClient,

  ) { }

  postData(body: any): Observable<IResponse<any>> {
    let head = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {
      headers: head
    }

    return this._http.post<IResponse<any>>(this.API_URL, JSON.stringify(body), options)
  }

  async createSession(id: string, valor: string) {
    await Preferences.set({
      key: id,
      value: valor
    })
  }


  async closeSession(id: string) {
    await Preferences.remove({ key: id })
  }
  async clearSession() {
    await Preferences.clear()
  }

  async getSession(id: string) {
    const item = await Preferences.get({ key: id });
    return item.value
  }
}
