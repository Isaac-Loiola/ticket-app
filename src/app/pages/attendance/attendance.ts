import { AttendanceService } from '../../services/attendance';
import { Component, signal } from '@angular/core';
import { Layout } from "../../componets/layout/layout";
import { Ticket } from '../../interfaces/ticket';

@Component({
  selector: 'app-attendance',
  imports: [Layout],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css',
  host: { class: 'flex flex-col gap-6 xl:gap-8 flex-1' }
})
export class Attendance {
  hasTicket = signal(false);

  constructor(
    private  attService: AttendanceService,
  ){}

  ngOnInit(){
    
  }

  get ticket(): Ticket | null {
    return this.attService.currentTicket();
  }
}
