import { Injectable } from '@angular/core';
import { debug } from 'util';

@Injectable()
export class MapService {
  constructor() {
    $(function() {
      var jsonData = {
        heatmap: {
          binSize: fcConfig.lightScale,
          map: fcConfig.currentFloorplan.currentLightConfig.lights
        }
      };

      var xscale = d3.scale
          .linear()
          .domain([0, 50.0])
          .range([0, 720]),
        yscale = d3.scale
          .linear()
          .domain([0, 33.79])
          .range([0, 487]),
        map = d3
          .floorplan()
          .xScale(xscale)
          .yScale(yscale),
        imagelayer = d3.floorplan.imagelayer().title("Floorplan"),
        heatmap = d3.floorplan.heatmap().title("Lights"),
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


      var loadData = function(data) {
        mapdata[heatmap.id()] = data.heatmap;

        d3
          .select('#demo')
          .append('svg')
          .attr('height', 487)
          .attr('width', 720)
          .datum(mapdata)
          .call(map);
      };

      loadData(jsonData);
    });
  }
}
