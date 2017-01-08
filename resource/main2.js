window.onload = function() {
  listener = new window.keypress.Listener(); //keypressの読み込み
  nowState = 'cursor';
  /*
  nowState: cursor    カーソルモード（デフォルト)
            totu1000  凸1000W灯体描画モード
            totu500   凸500W灯体描画モード
            fure1000  フレネル1000W灯体描画モード
            fure500   フレネル500W灯体描画モード

  */
  ctrlState = false;
  // https://dmauro.github.io/Keypress/
  var my_combos = listener.register_many([
    {
      "keys": "meta",
      "on_keydown": function() {
        ctrlState = true;
      },
      "on_keyup": function() {
        ctrlState = false;
      },
    },
    {
      "keys": "shift",
      "on_keydown": function(){

      }
    }
  ]);
  /*
    ctrlState  trueは押下、falseは押してない
  */
  canvas = new fabric.Canvas('main'); // mainはID名のみ有効（class名は不可)

  canvas.observe('mouse:move', function(e) {
    mouse_pos = canvas.getPointer(e.e);
  });

  //背景の描画
  (function() {
    var imgElement = document.getElementById('my-image');
    var imgInstance = new fabric.Image(imgElement, {
      left: 0,
      top: 0,
      width: 847,
      height: 595,
      hasBorders: false,
      hasControls: false, //コントロールハンドルを取る
      evented: this.checked, //このオブジェクトをコントロール不可にする(イベントが発火しないようする)
      selectable: false,
    });
    imgInstance.shadow = new fabric.Shadow({
      color: '#696969',
      //blur:30
    })
    canvas.add(imgInstance);
  })();

  startProgram();
};

function startProgram() {
  /* ズーム関連 */
  // ズームボタン
  $('.h-zoom-p').on("click",function() {
    canvas.setZoom(canvas.getZoom() * 1.1);
  });
  $('.h-zoom-m').on("click",function() {
    canvas.setZoom(canvas.getZoom() / 1.1);
  });
  // ホイールイベント
  // https://w3g.jp/blog/wheelevent_crossbrowser
  var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
  $(document).on(mousewheelevent, function(e) {
    if (ctrlState) {
      var delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);
        var mouse_pos = canvas.getPointer(e.e,true); //マウス座標を基準にズームインしたかった、けど工夫が必要(issue #5)
        console.log(mouse_pos);
      if (delta < 0) {
        e.preventDefault();
        canvas.zoomToPoint(new fabric.Point(mouse_pos.x, mouse_pos.y), canvas.getZoom() * 1.1)
      } else if (delta > 0) {
        e.preventDefault();
        canvas.zoomToPoint(new fabric.Point(mouse_pos.x, mouse_pos.y), canvas.getZoom() / 1.1)
      }
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



  // 凸1000wの描画
  $('.totu').on("click",function() {
    //http://www.independent-software.com/loading-an-svg-image-with-fabric-js/
    canvas.observe('mouse:down', function(e) {
      var mouse_pos = canvas.getPointer(e.e);
      fabric.loadSVGFromURL('./resource/svg/totu.svg', function(objects, options) {
        var svgObject = fabric.util.groupSVGElements(objects, options);
        svgObject.top = mouse_pos.y;
        svgObject.left = mouse_pos.x;
        canvas.add(svgObject);
        canvas.renderAll();
        canvas.off('mouse:down');
      });
    });
  });

  $('.fure').on("click",function() {
    //http://www.independent-software.com/loading-an-svg-image-with-fabric-js/
    canvas.observe('mouse:down', function(e) {
      var mouse_pos = canvas.getPointer(e.e);
      fabric.loadSVGFromURL('./resource/svg/fure.svg', function(objects, options) {
        var svgObject = fabric.util.groupSVGElements(objects, options);
        svgObject.top = mouse_pos.y;
        svgObject.left = mouse_pos.x;
        canvas.add(svgObject);
        canvas.renderAll();
        canvas.off('mouse:down');
      });
    });
  });
  $('.fure500').on("click",function() {
    //http://www.independent-software.com/loading-an-svg-image-with-fabric-js/
    canvas.observe('mouse:down', function(e) {
      var mouse_pos = canvas.getPointer(e.e);
      fabric.loadSVGFromURL('./resource/svg/fure500.svg', function(objects, options) {
        var svgObject = fabric.util.groupSVGElements(objects, options);
        svgObject.top = mouse_pos.y;
        svgObject.left = mouse_pos.x;
        canvas.add(svgObject);
        canvas.renderAll();
        canvas.off('mouse:down');
      });
    });
  });
  $('.totu500').on("click",function() {
    //http://www.independent-software.com/loading-an-svg-image-with-fabric-js/
    canvas.observe('mouse:down', function(e) {
      var mouse_pos = canvas.getPointer(e.e);
      fabric.loadSVGFromURL('./resource/svg/totu500.svg', function(objects, options) {
        var svgObject = fabric.util.groupSVGElements(objects, options);
        svgObject.top = mouse_pos.y;
        svgObject.left = mouse_pos.x;
        canvas.add(svgObject);
        canvas.renderAll();
        canvas.off('mouse:down');
      });
    });
  });
  $('.moving').on("click",function() {
    //http://www.independent-software.com/loading-an-svg-image-with-fabric-js/
    canvas.observe('mouse:down', function(e) {
      var mouse_pos = canvas.getPointer(e.e);
      fabric.loadSVGFromURL('./resource/svg/moving.svg', function(objects, options) {
        var svgObject = fabric.util.groupSVGElements(objects, options);
        svgObject.top = mouse_pos.y;
        svgObject.left = mouse_pos.x;
        canvas.add(svgObject);
        canvas.renderAll();
        canvas.off('mouse:down');
      });
    });
  });
  $('.strobo').on("click",function() {
    //http://www.independent-software.com/loading-an-svg-image-with-fabric-js/
    canvas.observe('mouse:down', function(e) {
      var mouse_pos = canvas.getPointer(e.e);
      fabric.loadSVGFromURL('./resource/svg/strobo.svg', function(objects, options) {
        var svgObject = fabric.util.groupSVGElements(objects, options);
        svgObject.top = mouse_pos.y;
        svgObject.left = mouse_pos.x;
        canvas.add(svgObject);
        canvas.renderAll();
        canvas.off('mouse:down');
      });
    });
  });
  $('.source4').on("click",function() {
    //http://www.independent-software.com/loading-an-svg-image-with-fabric-js/
    canvas.observe('mouse:down', function(e) {
      var mouse_pos = canvas.getPointer(e.e);
      fabric.loadSVGFromURL('./resource/svg/source4.svg', function(objects, options) {
        var svgObject = fabric.util.groupSVGElements(objects, options);
        svgObject.top = mouse_pos.y;
        svgObject.left = mouse_pos.x;
        canvas.add(svgObject);
        canvas.renderAll();
        canvas.off('mouse:down');
      });
    });
  });


  /* 灯体の削除 */
  function deleteObjects() { //右クリックメニューからも参照するため関数化
    canvas.isDrawingMode = false;

    var activeObject = canvas.getActiveObject(),
      activeGroup = canvas.getActiveGroup();
    if (activeObject) {
      canvas.remove(activeObject);
    } else if (activeGroup) {
      var objectsInGroup = activeGroup.getObjects();
      canvas.discardActiveGroup(); //選択状態にあるグループのイベントを外す
      objectsInGroup.forEach(function(object) {
        canvas.remove(object);
      });
    }
  };
  $('.h-delete-objects').on("click",function() {
    deleteObjects();
  });


  /*右クリックメニュー*/
  $('canvas').bind('contextmenu', function(e) {
    displayRightMenu('show', e); //右クリックメニューの表示
    canvas.observe('mouse:down', function() {
      displayRightMenu('hide'); //右クリックメニューを隠す
      canvas.off('mouse:down');
    });
    return false
  });

  function displayRightMenu(mode, e) {
    if (mode == 'show') {
      var rc_mouse_pos = {
        x: e.clientX,
        y: e.clientY
      };
      $('.right-click-menu').css({
        'display': 'block',
        'left': rc_mouse_pos.x,
        'top': rc_mouse_pos.y
      });
    } else if (mode == 'hide') {
      $('.right-click-menu').css('display', 'none');
    }
  }
  //コピー
  $('.rc-copy').on("click",function() {
    // http://stackoverflow.com/questions/37192881/fabricjs-clipboard-implementation-copy-paste
    // Single Object
    if (canvas.getActiveObject()) {
      // Does this object require an async clone?
      if (!fabric.util.getKlass(canvas.getActiveObject().type).async) {
        clipboard = canvas.getActiveObject().clone();
      } else {
        canvas.getActiveObject().clone(function(clone) {
          clipboard = clone;
        });
      }
    }

    // Group of Objects (all groups require async clone)
    if (canvas.getActiveGroup()) {
      canvas.getActiveGroup().clone(function(clone) {
        clipboard = clone;
      });
    }
    displayRightMenu('hide');
  });
  //ペースト
  $('.rc-paste').on("click",function(e) {
    // http://stackoverflow.com/questions/37192881/fabricjs-clipboard-implementation-copy-paste
    // Do we have an object in our clipboard?
    if (clipboard) {
      // Lets see if we need to clone async
      if (!fabric.util.getKlass(clipboard.type).async) {
        var obj = clipboard.clone();
        obj.setTop(obj.top += 10);
        obj.setLeft(obj.left += 10);
        canvas.add(obj);
        // We do not need to clone async, all groups require async clone
        canvas.setActiveObject(obj);
        clipboard = obj;
      } else {
        clipboard.clone(function(clone) {
          var mouse_pos = canvas.getPointer(e.e)
          clone.setTop(mouse_pos.y);
          clone.setLeft(mouse_pos.x);

          clone.forEachObject(function(obj) {
            canvas.add(obj);
          });

          canvas.deactivateAll();

          // We need to clone async, but this doesnt mean its a group
          if (clipboard.isType("group")) {
            canvas.setActiveGroup(clone);
          } else {
            canvas.setActiveObject(clone);
          }
          clipboard = clone;
        });
      }
    }
    canvas.renderAll();
    displayRightMenu('hide');
  });
  //削除
  $('.rc-delete').on("click",function() {
    deleteObjects();
    displayRightMenu('hide');
  });
  //グループ化
  $('.rc-group').on("click",function() {
    displayRightMenu('hide');
  });



 /* メニューバー */
 $('.drop-menu').hover('',function(){  //http://semooh.jp/jquery/api/events/hover/over,+out/
   $('.drop-menu').css('display','none');
 });
 $('.drop-menu').on('click',function(){
   $('.drop-menu').css('display','none');
 });

  //file
  $('.hm-file').hover(function(){
    $('.drop-menu').css('display','none');
    $('.d-file-menu').css('display','block');
  });
  $('.hm-edit').hover(function(){
    $('.drop-menu').css('display','none');
  });

  $('.d-to-img').on('click',function(){
    var toURI = canvas.toDataURL({
      format: 'png',
    });
  });
}; //startProgramの閉じ
