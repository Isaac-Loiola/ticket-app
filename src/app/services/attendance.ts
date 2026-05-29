import { Injectable, signal } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Ticket } from '../interfaces/ticket';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  currentTicket = signal<Ticket | null>(null);

  public setTicket(ticket:any){
    this.currentTicket.set(ticket);
  }

  public clearTicekt(){
    this.currentTicket.set(null);
  }

  public hasTicket(){
    return this.currentTicket() !== null;
  }

}
