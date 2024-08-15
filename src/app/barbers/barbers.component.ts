import { Component } from '@angular/core';

@Component({
  selector: 'app-barbers',
  templateUrl: './barbers.component.html',
  styleUrl: './barbers.component.css'
})
export class BarbersComponent {
  profiles = [
  {
    name: 'Carlos "The Killer"',
    description: 'Especialista en cortes clásicos con precisión y estilo inigualable.',
    photo: 'images/barberprofile2.jpg'
  },
  {
    name: 'Jane Smith',
    description: 'Afeitado premium y tratamientos faciales para una experiencia de lujo.',
    photo: 'images/barberprofile2.jpg'
  },
  {
    name: 'Michael Johnson',
    description: 'Experto en cortes degradados y estilos modernos adaptados a tus preferencias.',
    photo: 'images/barberprofile2.jpg'
  }
  ];
}
