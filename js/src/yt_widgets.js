var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var THREE = require('three');

import * as three from 'three';

// Custom Model. Custom widgets models must at least provide default values
// for model attributes, including `_model_name`, `_view_name`, `_model_module`
// and `_view_module` when different from the base class.
//
// When serialiazing entire widget state for embedding, only values different from the
// defaults will be specified.


//First module:
var DisplayParamModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(_.result(this, 'widgets.DOMWidgetModel.prototype.defaults'), {
        _model_name : 'DisplayParamModel',
        _view_name : 'DisplayParamView',
        _model_module : 'yt_widgets',
        _view_module : 'yt_widgets',
        _model_module_version : '0.1.0',
        _view_module_version : '0.1.0'
    })
});

// Custom View. Renders the widget model.
var DisplayParamView = widgets.DOMWidgetView.extend({
  render: function() {
      this.req = {
        parameters : {}
      }
      this.parameters_changed();
      this.model.on('change:parameters', this.parameters_changed, this);
  },

  parameters_changed: function() {
      this.el.textContent = this.model.get('parameters');
  },
});

// Second Module:
var InteractiveSliceplotModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(_.result(this, 'widgets.DOMWidgetModel.prototype.defaults'), {
      _model_name : 'InteractiveSliceplotModel',
      _view_name : 'InteractiveSliceplotView',
      _model_module : 'yt_widgets',
      _view_module : 'yt_widgets',
      _model_module_version : '0.1.0',
      _view_module_version : '0.1.0'
    })
});

var InteractiveSliceplotView = widgets.DOMWidgetView.extend({
    render: function() {
        this.req = {
          sliceplot : yt.SlicePlot()
        }
        this.sliceplot_changed();
        this.model.on('change:sliceplot', this.sliceplot_changed, this);
    },

    sliceplot_changed: function() {
        this.el.textContent = this.model.get('sliceplot');
    }
});

// Third and final module
var HelloWorldModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(_.result(this, 'widgets.DOMWidgetModel.prototype.defaults'),{
      _model_name : 'HelloWorldModel',
      _view_name : 'HelloWorldView',
      _model_module : 'yt_widgets',
      _view_module : 'yt_widgets',
      _model_module_version : '0.1.0',
      _view_module_version : '0.1.0',
    })
});

var HelloWorldView = widgets.DOMWidgetView.extend({
//    render: function(){
//      this.canvas = document.createElement('canvas');
//      this.canvas.width = 128;
//      this.canvas.height =256;
//      this.el.append(this.canvas);

//Apparently "var" cannot be used as "shorthand" -leads me to belive that THREE is not, in fact, loaded.. :(
//      var camera, scene, renderer;
//      var geometry, material, mesh;

      render: function() {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
      },

      init: function() {

        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.z = 1000;

        var scene = new THREE.Scene();

        var geometry = new THREE.BoxGeometry(200, 200, 200);
        var material = new THREE.MeshBasicMaterial({
          color: 0xff0000
        });

        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(renderer.domElement);

      },

      animate: function() {

        requestAnimationFrame(animate);

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;

        renderer.render(scene, camera);

      }
//      }
});


//
module.exports = {
    DisplayParamModel : DisplayParamModel,
    DisplayParamView : DisplayParamView,
    InteractiveSliceplotModel : InteractiveSliceplotModel,
    InteractiveSliceplotView : InteractiveSliceplotView,
    HelloWorldModel : HelloWorldModel,
    HelloWorldView : HelloWorldView
};
