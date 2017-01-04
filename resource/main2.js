window.onload = function(){
  nowState = 'cursor';
    /*
    nowState: cursor    カーソルモード（デフォルト)
              totu1000  凸1000W灯体描画モード
              totu500   凸500W灯体描画モード
              fure1000  フレネル1000W灯体描画モード
              fure500   フレネル500W灯体描画モード

    */
    canvas = new fabric.Canvas('main'); // mainはID名のみ有効（class名は不可)

    canvas.observe('mouse:move', function(e) {
      mouse_pos = canvas.getPointer(e.e);
    });

    //背景の描画
  (function(){
    var imgElement = document.getElementById('my-image');
    var imgInstance = new fabric.Image(imgElement, {
      left: 0,
      top: 0,
      width: 847,
      height: 595,
      hasBorders: false,
      hasControls: false, //コントロールハンドルを取る
      evented:this.checked, //このオブジェクトをコントロール不可にする(イベントが発火しないようする)
      selectable: false,
    });
    imgInstance.shadow = new fabric.Shadow({
      color:'#696969',
      blur:30
    })
    canvas.add(imgInstance);
  })();

  startProgram();
};
function startProgram(){
 /* ズーム関連 */
  // ズームボタン
  $('.h-zoom-p').click(function() {
    canvas.setZoom(canvas.getZoom() * 1.1);
  });
  $('.h-zoom-m').click(function() {
    canvas.setZoom(canvas.getZoom() / 1.1);
  });
  // ホイールイベント
  // https://w3g.jp/blog/wheelevent_crossbrowser
  var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
  var mouse_pos = {
    x: 0,
    y: 0
  };
  $(document).on(mousewheelevent, function(e) {
    var delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);
    canvas.observe('mouse:move', function(e) {
      mouse_pos = canvas.getPointer(e.e);
    });
    if (delta < 0) {
      e.preventDefault();
      canvas.zoomToPoint(new fabric.Point(mouse_pos.x, mouse_pos.y), canvas.getZoom() * 1.1)
    } else if (delta > 0) {
      e.preventDefault();
      canvas.zoomToPoint(new fabric.Point(mouse_pos.x, mouse_pos.y), canvas.getZoom() / 1.1)
    }
  });
  // プルダウンメニュー
  var zoomPercent = 100
  $('.h-zoom-pull-value').change(function() {
    zoomPercent = $('.h-zoom-pull-value option:selected').attr("value");
    canvas.setZoom(zoomPercent / 100);
    // console.log(zoomPercent);
  }).change();




 /* 灯体描画 */
  canvas.observe('mouse:down',function(){
    switch (nowState) {
      case 'cursor':

        break;
      default:

    }
  });



  // 凸1000wの描画
  $(".totu").click(function() {

    var mouse_pos = {
      x: 0,
      y: 0
    };
    canvas.observe('mouse:move', function(e) {
      mouse_pos = canvas.getPointer(e.e)
      //console.log(mouse_pos.x + ',' + mouse_pos.y);
    });

    canvas.isDrawingMode = false;

    canvas.observe('mouse:down', function(e) {
      var circle1 = new fabric.Circle({
        radius: 8,
        left: 0,
        top: 0,
        fill: 'black'
      });
      var circle2 = new fabric.Circle({
        radius: 6,
        left: 2,
        top: 2,
        fill: 'white'
      });
      canvas.add(new fabric.Group([circle1, circle2], {
        left: mouse_pos.x,
        top: mouse_pos.y
      }));
      canvas.off('mouse:move');
      canvas.off('mouse:down'); // イベントを解除
    });
  });

  $('.fure').click(function() {

    var mouse_pos = {
      x: 0,
      y: 0
    };
    canvas.isDrawingMode = false;

    canvas.observe('mousedown', function(e) {
      mouse_pos = canvas.getPointer(e.e);

      var image;
      fabric.Image.fromURL('./plan-origin.png', function(img) {
        image = img.scale(1.0).set({
          left: 0,
          top: 0
        });
        canvas.add(image);
        canvas.renderAll();
      });

      canvas.off('mousedown');
    });
  });



 /* 灯体の削除 */
  function deleteObjects(){
    canvas.isDrawingMode = false;

    var activeObject = canvas.getActiveObject(),activeGroup = canvas.getActiveGroup();
    if (activeObject) {
      canvas.remove(activeObject);
    } else if (activeGroup) {
      var objectsInGroup = activeGroup.getObjects();
      canvas.discardActiveGroup();
      objectsInGroup.forEach(function(object) {
        canvas.remove(object);
      });
    }
  };
  $('.h-delete-objects').click(function(){
    deleteObjects();
  });


 /*右クリックメニュー*/
  $('canvas').bind('contextmenu',function(){
    $('.right-click-menu').css('display','block'); //右クリックメニューの表示
    canvas.observe('mouse:down',function(){
      $('.right-click-menu').css('display','none'); //右クリックメニューを隠す
      canvas.off('mouse:down');
    });
    return false
  });
  function deleteRightMenu(){
    $('.right-click-menu').css('display','none');
  }



  $('.rc-delete').click(function(){
    deleteObjects();
    deleteRightMenu();
  });

}; //startProgramの閉じ
