import { Ticket } from './../../interfaces/ticket';
import { PanelService } from './../../services/panel';
import { Component, effect } from '@angular/core';

@Component({
  selector: 'app-panel',
  imports: [],
  templateUrl: './panel.html',
  styleUrl: './panel.css',
})
export class Panel {
  showModal = true; 
  
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

  buildSequence(code: string): string[]{
    const files: string[] = [];

    const word = code.charAt(0).toLowerCase();
    const number = parseInt(code.substring(1));

    files.push(`audios/${word}.mp3`);

    const audioNumbers = this.numberToAudio(number);
    files.push(...audioNumbers);

    return files;
  }

  constructDecimalNumbers(){

  }
  numberToAudio(number: number): string[] {
    const files: string[] = [];

    // 0 a 19
    if (number < 20) {
      files.push(`audios/${number}.mp3`);
      return files;
    }

    // 20 a 99
    if (number >= 20 && number < 100) {
      const decimal = String(number).charAt(0) + "0.mp3";
      const unity = String(number).charAt(1);

      files.push(`audios/${decimal}`);

      if (unity == "0") {
        return files;
      }

      files.push("audios/div.mp3");
      files.push(`audios/${unity}.mp3`);

      return files;
    }

    // 100 exato
    if (number == 100) {
      files.push(`audios/100.mp3`);
      return files;
    }

    // 101 a 199 — "cento e X"
    if (number > 100 && number < 200) {
      files.push(`audios/cent.mp3`);

      const resto = number % 100;

      if (resto > 0) {
        files.push("audios/div.mp3");
        files.push(...this.numberToAudio(resto)); // recursão para o resto
      }

      return files;
    }

    // 200 a 999
    if (number >= 200 && number < 1000) {
      const cent = String(number).charAt(0) + "00.mp3";
      files.push(`audios/${cent}`);

      const decimal = parseInt(String(number).substring(1));

      if (decimal > 0) {
        files.push("audios/div.mp3");
        files.push(...this.numberToAudio(decimal)); // recursão para o resto
      }

      return files;
    }

    return files;
  }

  async playSound(ticket: Ticket){
    await this.playAudio('audios/notify.mp3');
    
    switch(ticket.type){
      case 'preferential':
        await this.playAudio('audios/preferential.mp3');
        break;

      case 'normal':
        await this.playAudio('audios/normal.mp3');
        break;

      case 'emergency':
        await this.playAudio('audios/emergency.mp3');
        break;
      }
      await this.playAudio('audios/ticket.mp3');
      const sequence = this.buildSequence(ticket.code);

      for (const file of sequence){
        await this.playAudio(file);
      }

  }

    startPanel() {                                                                                                                             
      this.showModal = false;
      const audio = new Audio();
      audio.play();                                                                                                                  
  }
}
