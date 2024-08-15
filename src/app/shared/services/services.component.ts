import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  servicios=[
    {titulo:'Corte Clásico', descripcion:'El corte clásico con estilo y precisión, adaptado a tus preferencias.'},
    {titulo:'Afeitado Premium', descripcion:'Afeitado de lujo con productos de alta calidad para una experiencia inigualable.'},
    {titulo:'Tratamiento Facial', descripcion:'Tratamientos faciales diseñados para revitalizar y rejuvenecer tu piel.'},
    {titulo:'Corte Degradado', descripcion:'estilo de cabello donde el largo disminuye gradualmente desde la parte superior hacia el cuello y las orejas.'},
    {titulo:'Corte Infantil', descripcion:'Cortes de cabello divertidos y modernos para los más pequeños, con atención especial.'},
    {titulo:'Arreglo de Barba', descripcion:'Perfilado y arreglo de barba con productos especializados para un acabado impecable.'},
    {titulo:'Coloración de Cabello', descripcion:'Tintes y técnicas de coloración profesionales para un look fresco y vibrante.'},
    {titulo:'Masaje Capilar', descripcion:'Masajes capilares relajantes que mejoran la circulación y promueven un cabello saludable.'}
  ]
}
