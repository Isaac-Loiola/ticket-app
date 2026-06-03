import { PanelService } from './../../services/panel';
import { AttendanceService } from '../../services/attendance';
import { Component, inject, signal } from '@angular/core';
import { Layout } from "../../componets/layout/layout";
import { Api } from '../../services/api';
import { Auth } from '../../services/auth';
import { Ticket } from '../../interfaces/ticket';

@Component({
  selector: 'app-attendance',
  imports: [Layout],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css',
  host: { class: 'flex flex-col gap-6 xl:gap-8 flex-1' }
})
export class Attendance {

  private attService = inject(AttendanceService);
  public panelSer = inject(PanelService);
  private api = inject(Api);
  private auth = inject(Auth);

  readonly ticket = this.attService.currentTicket;
  readonly emptyQueueToast = signal(false);
  // readonly tickets = this.attService.nextTickets;

  get nextTickets(): Ticket[]{
    return this.panelSer.nextTickets();
  } 

  ngOnInit(){
    var user = JSON.parse(this.auth.getUser()!);
    this.panelSer.startConnection(user.sector);

    this.api.getNextTickets(user.sector).subscribe({
      next: (tickets) =>{
        console.log(tickets);
        this.panelSer.nextTickets.set(tickets);
      },
      error: (err) => console.error(err)
    });
  }

  callNext(){

    const user = JSON.parse(this.auth.getUser()!);

    this.api.callTicket({
      idUser: user.id,
      sector: user.sector
    }).subscribe({
      next: (res: any) =>{
        console.log(res)
        this.attService.setTicket(res.ticket);

        this.panelSer.nextTickets.set(res.tickets);
      },
      error: (err) =>{
        console.error('error ao chamar ticket:', err)
        this.emptyQueueToast.set(true);
        setTimeout(() => this.emptyQueueToast.set(false), 8000);
      }
    })
  }

  public finish(idTicket: number){
    this.api.finishedTicket(idTicket).subscribe({
      next: () => {
        console.log('ticket finalizado, limpando...');
        this.attService.clearTicket();

        const updated = this.panelSer.nextTickets().filter(t => t.id !== idTicket);
        this.panelSer.nextTickets.set(updated);

      },
      error: (err) => {
        console.error('erro ao finalizar ticket:', err);

      }
    });
  }
}
