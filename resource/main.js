/*
    LBT Planner
*/

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
//      凸1000w         totu
//      フレネル1000w    fure
//      パー            par
var activeToutai = 'cursor';



// ###################################
// 灯体の種類
//      凸1000w         totu
//      フレネル1000w    fure
//      パー            par

// ###################################
// クリックイベント時に当体を追加する関数
function CloneToutai(posX,posY,type){

    /*
        posX,posY    [整数値] 追加する座標
        type         [文字列] 当体の種類 {fure,totu,par}
    */

    switch (type){
        case 'fure':
    // フレネルの定義
            (function(){
                var circle = new fabric.Circle({
                    radius:20,
                    left:0,
                    top:0,
                    fill: 'black'
                });
                var circle2 = new fabric.Circle({
                    radius:18,
                    left:2,
                    top:2,
                    fill: 'white'
                });
                var circle3 = new fabric.Circle({
                    radius:15,
                    left:5,
                    top:5,
                    fill: 'blick'
                });
                var circle4 = new fabric.Circle({
                    radius:13,
                    left:7,
                    top:7,
                    fill: 'white'
                });
                fure[nowToutaiCount.fure] = new fabric.Group([circle,circle2,circle3,circle4],{
                    left:posX-20,
                    top:posY-20,
                });
                canvas.add(fure[nowToutaiCount.fure]);
                nowToutaiCount.fure++;
            })();
            console.log("Added "+type+" Parts "+nowToutaiCount.fure);
            break;

    // 凸の定義
        case 'totu':
            (function(){
                var circle = new fabric.Circle({
                    radius:20,
                    left:0,
                    top:0,
                    fill: 'black'
                });
                var circle2 = new fabric.Circle({
                    radius:18,
                    left:2,
                    top:2,
                    fill: 'white'
                });
                totu[nowToutaiCount.totu] = new fabric.Group([circle,circle2],{
                    left:posX-20,
                    top:posY-20,
                });
                canvas.add(totu[nowToutaiCount.totu]);
                nowToutaiCount.totu++;
            })();
            console.log("Added "+type+" Parts "+nowToutaiCount.fure);
            break;

    // パーの定義
        case 'par':
            (function(){
                var circle = new fabric.Circle({
                    radius: 20,
                    sratAngle : 0,
                    endAngle : Math.PI,
                    flipY:true,
                    fill: 'black',
                    left:0,
                    top:0
                })
                })();
                totu[nowToutaiCount.par] = new fabric.Group([circle,circle2],{
                    left:posX-20,
                    top:posY-20,
                });
                canvas.add(par[nowToutaiCount.par]);
                nowToutaiCount.par++;
            break;

    default:
        console.log("クリックイベントの灯体追加エラー");
    }
}


// ###################################
// event処理
// マウスカーソルに追従させる

CloneToutai(0,0,'fure');
fure[nowToutaiCount.fure-1].set({
    opacity:0,
});
CloneToutai(0,0,'totu');
totu[nowToutaiCount.totu-1].set({
    opacity:0,
});
canvas.renderAll();

canvas.on('mouse:move', function(options) {
    var posX = options.e.layerX;
    var posY = options.e.layerY;
    // console.log("move",options.e.layerX, options.e.layerY);
    switch (activeToutai) {
        case 'cursor':
            break;
        case 'fure':
        // console.log(nowToutaiCount.fure);
            fure[nowToutaiCount.fure-1].set({
                left:posX-20,
                top:posY-20,
                opacity:1   //アクティブ時は不透明にして表示する。
            });
            break;
        case 'totu':
            totu[nowToutaiCount.totu-1].set({
                left:posX-20,
                top:posY-20,
                opacity:1   //アクティブ時は不透明にして表示する。
            });
        default:
            // デフォルト
    }
    canvas.renderAll();
});

// クリックでそのカーソル位置にオブジェクトを追加
canvas.on('mouse:down',function(options){
    if(activeToutai != 'cursor'){
        var posX = options.e.layerX;
        var posY = options.e.layerY;
        console.log(activeToutai);
        CloneToutai(posX,posY,activeToutai);
        canvas.renderAll();
    }
});


function activeToutaiChange(toType){
    activeToutai = toType;
    console.log("activeToutaiChange "+activeToutai);
    switch (activeToutai) {
        case 'fure':
            console.info(nowToutaiCount.fure-1);
            fure[nowToutaiCount.fure].set({
                opacity:0  //非アクティブ時は透明にする。
            });
            break;

        case 'totu':
            totu[nowToutaiCount.totu].set({
                opacity:0  //非アクティブ時は透明にする。
            });
            break;

        case 'par':
            par[nowToutaiCount.par].set({
                opacity:0  //非アクティブ時は透明にする。
            });
            break;
        default:

    }

}
