var GENEMAP = GENEMAP || {};

GENEMAP.GeneMap = function(config) {
    var default_values = {
      width: 800,
      height: 600,
    };


    // apply defaults to the config
    config = config || {};
    for (var opt in default_values) {
      if (default_values.hasOwnProperty(opt) && !config.hasOwnProperty(opt)){
          config[opt] = default_values[opt];
      }
    }


    // An SVG representation of a chromosome with banding data. This won't create an SVG
    // element, it expects that to already have been created.
    function my(selection) {
      selection.each(function(d, i){

        // var y = d3.scale.linear().range([0, config.height]).domain([0, +d.length]);
        svg = d3.select(this).selectAll("svg").data([d]);

        var svgEnter = svg.enter().append("svg").append("g").classed("zoom_window", true);

        svg.attr("width", 600)
           .attr("height", 500)
           .attr("style", "background-color:none");


        var container = svg.select(".zoom_window");

         // basic zooming functionality
         var zoom = function() {
           container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
         }

        svg.call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoom))

        var chromosomeContainers = container.selectAll("g.container").data(d.chromosomes)

        chromosomeContainers.enter().append("g").classed("container", true);

        chromosomeContainers.attr({
          transform: function(d, i){
            return "translate(" + ((i * 100) + 10) + ",10)";
          }
        });

        var chromosomeDrawer = GENEMAP.Chromosome();
        chromosomeContainers.call(chromosomeDrawer);

      });
    }

    my.width = function(value) {
      if (!arguments.length) return config.width;
      config.width = value;
      return my;
    }

    my.height = function(value) {
      if (!arguments.length) return config.height;
      config.height = value;
      return my;
    }

    return my;
};
