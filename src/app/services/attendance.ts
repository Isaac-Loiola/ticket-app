import { Injectable, signal } from '@angular/core';
import { Ticket } from '../interfaces/ticket';

const STORAGE_KEY = 'currentTicket';
const KEY_TICKETS = 'nextTickets';

function parseStorage<T>(key: string): T | null {
  try {
    return JSON.parse(localStorage.getItem(key) ?? 'null');
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  currentTicket = signal<Ticket | null>(parseStorage<Ticket>(STORAGE_KEY));

  nextTickets = signal<Ticket[] | null>(parseStorage<Ticket[]>(KEY_TICKETS));
    
  public setTicket(ticket: Ticket) {
    this.currentTicket.set(ticket);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ticket));
  }

  public setTickets(tickets: Ticket[]){
    this.nextTickets.set(tickets);
    localStorage.setItem(KEY_TICKETS, JSON.stringify(tickets));
  }

  public clearTicket() {
    this.currentTicket.set(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  public hasTicket() {
    return this.currentTicket() !== null;
  }
}
