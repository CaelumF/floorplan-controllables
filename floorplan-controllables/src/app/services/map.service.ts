import { Injectable, Inject } from '@angular/core';
import { debug } from 'util';
import { DOCUMENT } from '@angular/common';
import * as $ from 'jquery';
import * as d3t from 'd3';
import fcConfig from '../../assets/js/fcConfig.js';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LightInterfaceComponent } from '../components/light-interface/light-interface.component';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

declare module 'd3' {
  namespace floorplan {
    function imagelayer(): any;
    function heatmap(): any;
  }
  function floorplan(): any;
}

declare var d3: typeof d3t;
@Injectable()
export class MapService implements OnInit, OnDestroy {
  private subscription: Subscription;

  openDialog(options): void {
    this.dialog.open(LightInterfaceComponent, {
      data: options, hasBackdrop: true
    });
  }
  ngOnInit() {
    alert('Map service inited');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  constructor(public dialog: MatDialog, @Inject(DOCUMENT) private docuent: any) {
    let openingDialogOptions = null;
    // Timer to open Material popup from the correct context
    const timer = TimerObservable.create(10, 10);
    this.subscription = timer.subscribe(t => {
      if (openingDialogOptions != null) {
        this.openDialog(openingDialogOptions);
        openingDialogOptions = null;
      }
    });

    $(function() {
      const jsonData = {
        heatmap: {
          binSize: fcConfig.lightScale,
          map: fcConfig.currentFloorplan.currentLightConfig.lights
        }
      };
      const xscale = d3.scale
          .linear()
          .domain([0, 50.0])
          .range([0, 720]),
        yscale = d3.scale
          .linear()
          .domain([0, 33.79])
          .range([0, 487]),
        map = d3.floorplan().xScale(xscale)
          .yScale(yscale),
        imagelayer = d3.floorplan.imagelayer().title('Floorplan'),
        heatmap = d3.floorplan.heatmap().title('Lights'),
        mapdata = {};
      mapdata[imagelayer.id()] = [
        {
          url: fcConfig.currentFloorplan.imageURL,
          x: 0,
          y: 0,
          height: 33.79,
          width: 50.0
        }
      ];

      // heatmap.colorMode('custom');
      heatmap.tooltipper = function(d) {
        return d.status || 'NO STATUS';
      };
      map
        .addLayer(imagelayer)
        .addLayer(heatmap);

      const loadData = function(data) {
        mapdata[heatmap.id()] = data.heatmap;

        d3.select('#demo')
          .append('svg')
          .attr('height', 487)
          .attr('width', 720)
          // .style('height', '100vh')
          // .style('width', '100vw')
          .datum(mapdata)
          .call(map);
      };
      // Identify lights with classes
      loadData(jsonData);
      d3.selectAll('.heatmap rect').classed('light', true);
      const h = docuent.querySelector('.light');
      d3.selectAll('.light').on('click', function(d, i) {
        openingDialogOptions = { d1: d, i1: i};
      });
    });
  }
}
