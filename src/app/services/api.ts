import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {

  private url =  "http://localhost:5210/api/";
  
  constructor(
    private http: HttpClient,
  ){}

  // public create(idUser: number){
  //   return this.http.post(`${this.url}/ticket`, {idUser})
  // }

  // public call(data:any){
  //   return this.
  // }
}


  // list(){
  //   this.api.operacao({
  //     method: "reservation-list",
  //     id_usuario: parseInt(this.auth.getUser().id)
  //   }).subscribe((res:any)=>{
  //     if(res.success){
  //       this.reservation = res.data
  //     }
  //   })
  // }