import { Component, OnInit } from '@angular/core';
import {d3Floorplan} from '../../../assets/js/d3-floorplan';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private map: MapService) { }

  ngOnInit() {

  }

}
