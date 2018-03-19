import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { MatDialog } from '@angular/material';
import { LightInterfaceComponent } from '../light-interface/light-interface.component';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private map: MapService, public dialog: MatDialog) { }
  ngOnInit() {

  }

  spawnDialog(): void {
    this.dialog.open(LightInterfaceComponent, {
      width: '200px', data: {}, hasBackdrop: false
    });
  }

}
