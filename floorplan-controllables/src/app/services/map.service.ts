import { Injectable } from '@angular/core';
import { debug } from 'util';

import * as d3t from 'd3';
import * as $ from 'jquery';
// / <reference types="jquery"/>
// import * as $ from 'jquery'
// / <reference types="d3"/>
// import { Selection } from 'd3';
import fcConfig from '../../assets/js/fcConfig.js';
import { BaseEvent } from 'd3';

@Injectable()
export class MapService {
  constructor() {
    $(function() {
      const jsonData = {
        heatmap: {
          binSize: fcConfig.lightScale,
          map: fcConfig.currentFloorplan.currentLightConfig.lights
        }
      };
      const d3a: typeof d3t = d3;
      const xscale = d3a.scale
          .linear()
          .domain([0, 50.0])
          .range([0, 720]),
        yscale = d3a.scale
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

        d3a
          .select('#demo')
          .append('svg')
          .attr('height', 487)
          .attr('width', 720)
          .datum(mapdata)
          .call(map);
      };
      // Identify lights with classes
      loadData(jsonData);
      d3a.selectAll('.heatmap rect').classed('light', true);

      d3a.selectAll('.light').on('click', function(d, i) {
        const parentNode = d3a.select(this.parentNode);
        const buttonX = 0;
        const buttonY = 0;
        const lightInterface = parentNode.append('g');
        lightInterface.append('rect')
        .attr('height', 87)
        .attr('width', 220)
        .classed('light-settings', true);
        (d3a.event as Event).stopPropagation();

        // Close popup appropriately
        let cursorOverInterface: Boolean = false;
        lightInterface.on('mouseout', function(test) {
          cursorOverInterface = false;
        });
        lightInterface.on('mousein', function(test) {
          cursorOverInterface = true;
        });
        d3a.select(document).on('click', function() {
          if (!cursorOverInterface) {lightInterface.remove(); }
        });

        lightInterface
        .append('text')
        .text(`Status: ${d.status}`)
        .attr('x', buttonX + 20)
        .attr('y', buttonY + 40)
        .attr('font-family', 'sans-serif')
        .attr('font-size', '20px')
        .attr('fill', 'blue');
      });
    });
  }
}
