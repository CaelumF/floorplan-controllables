import { Injectable } from '@angular/core';
import { debug } from 'util';
import * as $ from 'jquery';
import * as d3t from 'd3';
import fcConfig from '../../assets/js/fcConfig.js';

declare module 'd3' {
  namespace floorplan {
    function imagelayer(): any;
    function heatmap(): any;
  }
  function floorplan(): any;
}

declare var d3: typeof d3t;
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

        d3
          .select('#demo')
          .append('svg')
          .attr('height', 487)
          .attr('width', 720)
          .datum(mapdata)
          .call(map);
      };
      // Identify lights with classes
      loadData(jsonData);
      d3.selectAll('.heatmap rect').classed('light', true);

      d3.selectAll('.light').on('click', function(d, i) {
        const parentNode = d3.select(this.parentNode);
        const buttonX = 0;
        const buttonY = 0;
        const lightInterface = parentNode.append('g');
        lightInterface.append('rect')
        .attr('height', 87)
        .attr('width', 220)
        .classed('light-settings', true);
        (d3.event as Event).stopPropagation();

        // Close popup appropriately
        let cursorOverInterface: Boolean = false;
        lightInterface.on('mouseout', function(test) {
          cursorOverInterface = false;
        });
        lightInterface.on('mousein', function(test) {
          cursorOverInterface = true;
        });
        d3.select(document).on('click', function() {
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
