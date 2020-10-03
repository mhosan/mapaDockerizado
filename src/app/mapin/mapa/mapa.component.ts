import { Component, OnInit } from '@angular/core';

declare let L;
let miMapa;
declare let contextmenu;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const osm1 = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.streets'
    });
    const openmap = L.tileLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
      attribution: 'terms and feedback'
    });
    const osm2 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 20 });
    const googleMaps = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      detectRetina: true
    });
    const googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      detectRetina: true
    });
    miMapa = L.map('map', {
      contextmenu: true,
      contextmenuWidth: 180,
      contextmenuItems: [
        {
          text: 'Ver las coordenadas',
          callback: this.verCoordenadas,
          icon: 'assets/images/coordenadas.png'
        }, {
          text: 'Centrar aqui',
          callback: this.centrarMapa,
          icon: 'assets/images/banderita.png'
        }, '-',
        {
          text: 'Acercar',
          callback: this.acercar,
          icon: 'assets/images/zoom-in.png'
        }, {
          text: 'Alejar',
          callback: this.alejar,
          icon: 'assets/images/zoom-out.png'
        }],
      center: [-34.921136, -57.954712],
      zoom: 13,
      zoomControl: true,
      maxZoom: 20
    }).addLayer(googleHybrid);

    L.control.scale().addTo(miMapa);

    var baseLayers = {
      "Mapbox": osm1,
      "OpenStreetMap": osm2,
      "Google Maps": googleMaps,
      "ArcGis Online": openmap,
      "Google Híbrido": googleHybrid
    };

    var overlays = {
      // "Marker": marker,
      // "Roads": roadsLayer
    };

    L.control.layers(baseLayers, overlays, { position: 'bottomright' }).addTo(miMapa);

    var north = L.control({ position: "topright" });
    north.onAdd = function () {
      var div = L.DomUtil.create("div", "info legend");
      div.innerHTML = '<img src="assets/images/norte2.gif" width="100px;">';
      return div;
    }
    north.addTo(miMapa);
    /*let marcador = L.marker([ -34.921136, -57.954712 ], {
      icon: L.icon({
        iconSize: [ 40, 31 ],
        iconAnchor: [ 19, 31 ],
        iconUrl: 'assets/images/marker-green.png'
        // shadowUrl: 'assets/images/marcador01.png'
      })
    }).addTo(miMapa);*/
    // miMapa.on('click', this.onMapClick)
  }

  verCoordenadas(e) {
    const popupCoordenadas = L.popup();
    popupCoordenadas
      .setLatLng(e.latlng)
      .setContent('Coordenadas: ' + e.latlng)
      .openOn(miMapa);
  }
  centrarMapa(e) {
    miMapa.panTo(e.latlng);
  }
  acercar(e) {
    miMapa.zoomIn();
  }
  alejar(e) {
    miMapa.zoomOut();
  }
}
