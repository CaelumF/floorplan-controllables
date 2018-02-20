import { Injectable } from '@angular/core';

@Injectable()
export class MapService {

  constructor() {
    $(function() {
      console.log("Loaded d3")
      var jsonData = {

      };

      var xscale = d3.scale.linear()
          .domain([0, 50.0])
          .range([0, 720]),
          yscale = d3.scale.linear()
          .domain([0, 33.79])
          .range([0, 487]),
          map = d3.floorplan().xScale(xscale).yScale(yscale),
          imagelayer = d3.floorplan.imagelayer(),
          heatmap = d3.floorplan.heatmap(),
          vectorfield = d3.floorplan.vectorfield(),
          pathplot = d3.floorplan.pathplot(),
          overlays = d3.floorplan.overlays().editMode(true),
          mapdata = {};

      mapdata[imagelayer.id()] = [{
          url: 'https://dciarletta.github.io/d3-floorplan/Sample_Floorplan.jpg',
          x: 0,
          y: 0,
          height: 33.79,
          width: 50.0
      }];

      map.addLayer(imagelayer)
          .addLayer(heatmap)
          .addLayer(vectorfield)
          .addLayer(pathplot)
          .addLayer(overlays);

      var loadData = function(data) {
          mapdata[heatmap.id()] = data.heatmap;
          mapdata[overlays.id()] = data.overlays;
          mapdata[vectorfield.id()] = data.vectorfield;
          mapdata[pathplot.id()] = data.pathplot;

          d3.select("#demo").append("svg")
              .attr("height", 487).attr("width", 720)
              .datum(mapdata).call(map);
      };

      loadData(jsonData);
  })
  }

}
