import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaComponent } from './mapa/mapa.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MapaComponent],
  exports: [ MapaComponent ]
})
export class MapinModule { }
