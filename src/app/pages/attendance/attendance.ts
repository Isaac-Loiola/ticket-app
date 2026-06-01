import { AttendanceService } from '../../services/attendance';
import { Component, signal } from '@angular/core';
import { Layout } from "../../componets/layout/layout";
import { Ticket } from '../../interfaces/ticket';
import { Api } from '../../services/api';
import { Auth } from '../../services/auth';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-attendance',
  imports: [Layout],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css',
  host: { class: 'flex flex-col gap-6 xl:gap-8 flex-1' }
})
export class Attendance {
  
  constructor(
    private  attService: AttendanceService,
    private api: Api,
    private auth: Auth
  ){}
  
  ngOnInit(){
    
  }

  get ticket(): Ticket | null {
    return this.attService.currentTicket();
  }

  callNext(){
    const user = JSON.parse(this.auth.getUser()!);

    this.api.callTicket({
      "IdUser": user.idUser,
      "Sector": user.sector
    }).subscribe({
      next: (ticket) =>{
        console.log(ticket)
        this.attService.setTicket(ticket);
      },
      error: (err) =>{
        console.log(err)
      }
    })
  }

  public finish(){
    const user = JSON.parse(this.auth.getUser()!);

    this.api.finishedTicket(user.id).subscribe({
      next:() => {
        this.attService.clearTicekt();
      }
    });
  }
}
