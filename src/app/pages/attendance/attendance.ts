import { AttendanceService } from '../../services/attendance';
import { Component, inject } from '@angular/core';
import { Layout } from "../../componets/layout/layout";
import { Api } from '../../services/api';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-attendance',
  imports: [Layout],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css',
  host: { class: 'flex flex-col gap-6 xl:gap-8 flex-1' }
})
export class Attendance {

  private attService = inject(AttendanceService);
  private api = inject(Api);
  private auth = inject(Auth);

  readonly ticket = this.attService.currentTicket;
  
  callNext(){

    const user = JSON.parse(this.auth.getUser()!);

    this.api.callTicket({
      idUser: user.id,
      sector: user.sector
    }).subscribe({
      next: (ticket) =>{
        this.attService.setTicket(ticket);
      },
      error: (err) =>{
        
      }
    })
  }

  public finish(idTicket: number){
    this.api.finishedTicket(idTicket).subscribe({
      next: () => {
        console.log('ticket finalizado, limpando...');
        this.attService.clearTicket();
      },
      error: (err) => {
        console.error('erro ao finalizar ticket:', err);
      }
    });
  }
}
