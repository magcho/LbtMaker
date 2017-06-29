window.onload = function() {
  keyListener = new window.keypress.Listener(); //keypressの読み込み
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
  var shortCutZomm = keyListener.register_many([
    {
      "keys": "meta",
      "on_keydown": function() {
        ctrlState = true;
      },
      "on_keyup": function() {
        ctrlState = false;
      }
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
  $('.par').on("click",function() {
    //http://www.independent-software.com/loading-an-svg-image-with-fabric-js/
    canvas.observe('mouse:down', function(e) {
      var mouse_pos = canvas.getPointer(e.e);
      fabric.loadSVGFromURL('./resource/svg/par.svg', function(objects, options) {
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
    rc_mouse_pos_canvas = canvas.getPointer(e.e);
    console.log(e);
    $(document).on('click',function(){ //右クリックメニューの非表示
      displayRightMenu('hide');
      $(document).off('click');
    });
    return false
  });

  function displayRightMenu(mode, e) {
    if (mode == 'show') {
      var rc_mouse_pos_window = { //ウィンドウからの絶対座標
        x: e.clientX,
        y: e.clientY
      };
      $('.right-click-menu').css({
        'display': 'block',
        'left': rc_mouse_pos_window.x,
        'top': rc_mouse_pos_window.y
      });
    } else if (mode == 'hide') {
      $('.right-click-menu').css('display', 'none');
    }
  }
  //コピー
  function copyActiveObject() {
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
  };
  //ペースト
  function pasteActiveObject(mouse_pos) {
    // http://stackoverflow.com/questions/37192881/fabricjs-clipboard-implementation-copy-paste
    // Do we have an object in our clipboard?
    if (clipboard) {
      // Lets see if we need to clone async
      if (clipboard.get('type') == 'path-group'){ //http://stackoverflow.com/questions/18893468/identify-type-of-selected-object-in-fabricjs
                                                  // OBJ.get('type')でクリップボード上のオブジェクトが１つの場合か、複数の灯体の場合か判断
                                                  //OBJ.type('type')がpath-groupなら灯体1つ、groupなら複数の灯体
        if (mouse_pos){ //右クリックからペーストを呼び出した場合、カーソルいちにペースト
          clipboard.setTop(mouse_pos.y);
          clipboard.setLeft(mouse_pos.x);
        }else{  //キーショートカットから呼び出した場合、コピー元の10*10右下にペースト
          clipboard.setTop(clipboard.getTop() + 10);
          clipboard.setLeft(clipboard.getLeft() + 10);
        }
        canvas.add(clipboard);
        canvas.deactivateAll();
        // We do not need to clone async, all groups require async clone
        canvas.setActiveObject(clipboard);
      }else if (clipboard.get('type') == 'group') {
        clipboard.clone(function(clone) {
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
        });
      }
    }
    canvas.renderAll();
  };

  //コピー
  $('.rc-copy').on("click",function(){
    copyActiveObject();
    displayRightMenu('hide');
  });
  //ペースト
  $('.rc-paste').on("click",function(){
    pasteActiveObject(rc_mouse_pos_canvas);
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


 /* キーショートカット */
  //コピー
  var KeyShortCuts = keyListener.register_many([
    {
      "keys": "meta c",
      "on_keydown": function(){
        copyActiveObject();
      }
    },
    {
      "keys": "meta v",
      "on_keydown": function(e){
        pasteActiveObject();
      }
    }
  ]);

 /* メニューバー */
 $('.drop-menu').hover('',function(){  //http://semooh.jp/jquery/api/events/hover/over,+out/
   $('.drop-menu').css('display','none');
 });
 $('.drop-menu').on('click',function(){
   $('.drop-menu').css('display','none');
 });

  //file
  $('.hm-file').on('click',function(){
    $('.drop-menu').css('display','none');
    $('.d-file-menu').css('display','block');
  });
  $('.hm-edit').on('click',function(){
    $('.drop-menu').css('display','none');
  });

  $('.d-overWrite').on('click',function(){
    var viewInfomation = { //今のcanvasのズームの情報を取得
      center:canvas.getVpCenter(),
      zoom:canvas.getZoom(),
    };
    var toURI = canvas.toDataURL({
      format: 'png',
      multiplier: 1, //出力後のファイルの解像度の倍率
    });
    canvas.absolutePan = viewInfomation.center;
    canvas.setZoom = viewInfomation.zoom;
    window.open(toURI);
  });
}; //startProgramの閉じ
