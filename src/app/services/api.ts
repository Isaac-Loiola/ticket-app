import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {

  private url =  "http://localhost:5210/api";
  
  constructor(
    private http: HttpClient,
  ){}

  public createUser(data:any){
    return this.http.post(`${this.url}/user`, data);
  }

  public createTicket(data:any){
    return this.http.post(`${this.url}/ticket`,  data);
  }

  public callTicket(data:any){
      return this.http.post(`${this.url}/ticket/call`, data);
  }

  public finishedTicket(id:number){
    return this.http.put(`${this.url}`, id);
  }

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