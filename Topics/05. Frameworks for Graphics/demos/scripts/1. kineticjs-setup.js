window.onload = function () {
  var layer, rect, stage;
  stage = new Kinetic.Stage({
    container: 'container',
    width: 500,
    height: 500
  });
  layer = new Kinetic.Layer();
  rect = new Kinetic.Rect({
    x: 10,
    y: 10,
    width: 100,
    height: 50,
    fill: 'yellowgreen',
    stroke: 'black',
    strokeWidth: 4
  });
  layer.add(rect);
  return stage.add(layer);
};