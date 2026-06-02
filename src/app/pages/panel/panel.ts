import { Ticket } from './../../interfaces/ticket';
import { PanelService } from './../../services/panel';
import { Component, effect } from '@angular/core';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-panel',
  imports: [],
  templateUrl: './panel.html',
  styleUrl: './panel.css',
})
export class Panel {
  constructor(
    public panelService: PanelService
  ){

    effect(() => {
    const tickets = this.panelService.lastCalls();
    if(tickets.length > 0){
      this.playSound(tickets[0]);
    }

  });
  }
  ngOnInit(){
    this.panelService.getLastCalls().subscribe({
      next: (tickets) => this.panelService.lastCalls.set(tickets),
      error: (err) => console.error(err)
    });

    this.panelService.startConnection();
  }

  ngOnDestroy(){
    this.panelService.stopConnection();
  }

  get currentTicket(): Ticket | null{
    const calls = this.panelService.lastCalls();
    return calls.length > 0 ? calls[0] : null;
  }

  get previousTicket(): Ticket[]{
    return this.panelService.lastCalls().slice(1);
  }

  playAudio(src: string): Promise<void> {
  return new Promise((resolve) => {
    const audio = new Audio(src);
    audio.play();
    audio.onended = () => resolve();
  });
}

async playSound(ticket: Ticket){
  await this.playAudio('audios/notify.mp3');
  
  switch(ticket.type){
    case 'preferential':
      await this.playAudio('audios/preferential.mp3');
      await this.playAudio('audios/ticket.mp3');
      for(const char of ticket.code){
        await this.playAudio(`audios/${char.toLowerCase()}.mp3`);
      }

      break;

    case 'normal':
      await this.playAudio('audios/normal.mp3');
      await this.playAudio('audios/ticket.mp3');
      for(const char of ticket.code){
        await this.playAudio(`audios/${char.toLowerCase()}.mp3`);
      }
      break;

    case 'emergency':
      await this.playAudio('audios/emergency.mp3');
      await this.playAudio('audios/ticket.mp3');
      for(const char of ticket.code){
        await this.playAudio(`audios/${char.toLowerCase()}.mp3`);
      }
      break;
    }
  }
}
