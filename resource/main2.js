var canvas = new fabric.Canvas('main');

// ###################################
// 現在のオブジェクトの数の管理
var nowToutaiCount = {
  'totu':0,
  'fure':0,
  'par':0
};


// 現在追加モードで選択している灯体の種類
// 灯体の種類
//  凸1000w         totu
//  フレネル1000w    fure
//  パー            par
//  カーソル        cursor
var activeToutai = 'cursor';




$('#main').on('click',function(){
  /**
   * 灯体をカーソル位置に追加する関数
   * @param   {char}   type 追加する灯体の種類の指定、
   * @return  {bool}
   */
  (function(){
    var mouse_pos = {x:0, y:0};

    canvas.observe('mouse:down', function(e) {
      mouse_pos = canvas.getPointer(e.e);
      console.log(hoge);

      switch (hoge) {
        case 'totu':
          var circle = new fabric.Circle({
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

          canvas.add(new fabric.Group([circle,circle2],{
            top:mouse_pos.x,
            left:mouse_pos.y
          }));
          console.log('hoge');
          break;
      };

      //canvas.off('mouse:down');
    })();
  });
}();
