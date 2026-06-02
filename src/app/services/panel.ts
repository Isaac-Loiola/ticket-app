import { Ticket } from './../interfaces/ticket';
import * as signalR from '@microsoft/signalr';
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PanelService {
  private url =  "http://localhost:5210/api/ticket";
  private hubUrl = "http://localhost:5210/hubs/panel";

  lastCalls = signal<Ticket[]>([]);

  private connection!: signalR.HubConnection;

  constructor(
    private http: HttpClient
  ){}

  getLastCalls(){
    return this.http.get<Ticket[]>(`${this.url}/lastCalls`);
  }

  startConnection(){
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.hubUrl)
      .withAutomaticReconnect()
      .build()

      this.connection.on('lastCalls', (tickets: Ticket[]) => {
        this.lastCalls.set(tickets);
      });

      this.connection.start()
        .then(() => console.log('SinalR conectado'))
        .catch(err => console.error('Erro SignalR', err));
  }

  stopConnection(){
    this.connection?.stop();
  }

}
