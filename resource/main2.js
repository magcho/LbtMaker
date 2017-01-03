window.onload = function(){
  var canvas = new fabric.Canvas('main');

  // ズーム関連
  // ズームボタン
  $('.h-zoom-p').click(function(){
    canvas.setZoom(canvas.getZoom() * 1.1 ) ;
  });
  $('.h-zoom-m').click(function(){
    canvas.setZoom(canvas.getZoom() / 1.1 ) ;
  });
  // ホイールイベント
  // https://w3g.jp/blog/wheelevent_crossbrowser
  var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
  var mouse_pos = {x:0,y:0};
  $(document).on(mousewheelevent,function(e){
    var delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);
    canvas.observe('mouse:move',function(e){
      mouse_pos.y = e.e.layerY;
      mouse_pos.x = e.e.layerX;
      console.log(mouse_pos.x+','+mouse_pos.y);
    });
    if (delta < 0){
      e.preventDefault();
      var zoomPoint = new fabric.Point(mouse_pos.x, mouse_pos.y);
      canvas.zoomToPoint(zoomPoint, canvas.getZoom() * 1.1 )
    } else if (delta > 0){
      e.preventDefault();
      var zoomPoint = new fabric.Point(mouse_pos.x, mouse_pos.y);
      canvas.zoomToPoint(zoomPoint, canvas.getZoom() / 1.1 )
    }
  });
  // プルダウンメニュー
  var zoomPercent = 100
  $('.h-zoom-pull-value').change(function() {
    zoomPercent = $('.h-zoom-pull-value option:selected').attr("value");
    canvas.setZoom(zoomPercent/100);
    console.log(zoomPercent);
  }).change();


  $("#totu").click(function() {

    var mouse_pos = {
      x: 0,
      y: 0
    };
    canvas.observe('mouse:move',function(e){
      mouse_pos.y = e.e.layerY;
      mouse_pos.x = e.e.layerX;
      console.log(mouse_pos.x+','+mouse_pos.y);
    });

    canvas.isDrawingMode = false;

    canvas.observe('mouse:down', function(e) {
      var circle1 = new fabric.Circle({
        radius:8,
        left:0,
        top:0,
        fill: 'black'
      });
      var circle2 = new fabric.Circle({
        radius:6,
        left:2,
        top:2,
        fill: 'white'
      });
      canvas.add(new fabric.Group([circle1,circle2],{
        left: mouse_pos.x,
        top: mouse_pos.y
      }));
      canvas.off('mouse:move');
      canvas.off('mouse:down'); // イベントを解除
    });
  });

  $('#fure').click(function(){

    var mouse_pos = {
      x: 0,
      y: 0
    };
    canvas.isDrawingMode = false;

    canvas.observe('mousedown',function(e){
      mouse_pos = canvas.getPointer(e.e);

      var image;
      fabric.Image.fromURL('./plan-origin.png', function(img) {
        image = img.scale(1.0).set({ left: 0, top: 0 });
        canvas.add(image);
        canvas.renderAll();
      });

      canvas.off('mousedown');
    });
  });
}
