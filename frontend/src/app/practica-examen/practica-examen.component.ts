import { Component } from '@angular/core';
import { findIndex } from 'rxjs';

@Component({
  selector: 'app-practica-examen',
  templateUrl: './practica-examen.component.html',
  styleUrls: ['./practica-examen.component.css'] // Corrige 'styleUrl' a 'styleUrls'
})
export class PracticaExamenComponent {
  
  nuevaCadena:string='';
  vector:number[]=[0,1];
  nuevoVector:number[]=[];
  // Recorrer cadena y hacer que se convierta a mayuscula (Recibe una cadena y transforma a mayuscula)
  convertirMayuscula(cadena :string):string{
    for (let i=0; i<cadena.length; i++){
      this.nuevaCadena+= cadena[i].toUpperCase();
    }
    return this.nuevaCadena;
  }


  revertirCadena(cadena:string) : string{
    for (let i=cadena.length-1; i>=0; i--){
      this.nuevaCadena+=cadena[i];
    }
    return this.nuevaCadena;
  }

  serieFibonacci(limite:number):number[]{
    this.nuevoVector=this.vector;
    for (let i=0; i<limite;i++){
      this.nuevoVector.push(this.nuevoVector[i]+ this.nuevoVector[i+1]);
    }
    return this.nuevoVector;
  }

  

  
  
  constructor(){
    // this.nuevaCadena=this.convertirMayuscula('perritoYgatito');
    this.nuevaCadena=this.revertirCadena('alooo');
    this.nuevoVector= this.serieFibonacci(100);
    console.log(this.nuevaCadena);
  }
}


