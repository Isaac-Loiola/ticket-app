import { Component } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'app-totem',
  imports: [],
  templateUrl: './totem.html',
  styleUrl: './totem.css',
})
export class Totem {
  public setores = [
    { value: 'clinica-geral', label: 'Clínica Geral' },
    { value: 'pediatria', label: 'Pediatria' },
    { value: 'cardiologia', label: 'Cardiologia' },
    { value: 'ortopedia', label: 'Ortopedia' },
    { value: 'neurologia', label: 'Neurologia' },
    { value: 'dermatologia', label: 'Dermatologia' },
  ];
  public typeTicket: string = "";

  showModal = false;
  selectedType: string | null = null;

  constructor(
    private api: Api,
  ){}

  openModal(type: string) {
    this.selectedType = type;
    this.showModal = true;

    this.typeTicket = type;
  }

  closeModal() {
    this.showModal = false;
    this.selectedType = null;
  }

  createTicket(sector: string){
    this.api.createTicket({
      id: 0,
      sector: sector,
      type: this.typeTicket
    }).subscribe({
      next: (res) =>{
        console.log(res);
        this.closeModal();
      },
    })
  }
}
