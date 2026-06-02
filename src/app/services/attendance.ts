import { Injectable, signal } from '@angular/core';
import { Ticket } from '../interfaces/ticket';

const STORAGE_KEY = 'currentTicket';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  currentTicket = signal<Ticket | null>(
    JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null')
  );

  public setTicket(ticket: Ticket) {
    this.currentTicket.set(ticket);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ticket));
  }

  public clearTicket() {
    this.currentTicket.set(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  public hasTicket() {
    return this.currentTicket() !== null;
  }
}
