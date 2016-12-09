/*
    バトンを描画するための定義ファイル
*/
(function (){
/*
    var hoge = new fabric.Line([x1,y1,x2,y2],{
        stroke: 線の色,
        strokeWidth: 線の太さ
    })

847
30 787 30

*/



    // LiSA視聴覚
    var sus1 = new fabric.Line([30,200,720,200],{
        stroke:'black',
        strokeWidth:3
    });
    var sus2 = new fabric.Line([30,300,720,300],{
        stroke:'black',
        strokeWidth:3
    });
    var sus3 = new fabric.Line([30,400,720,400],{
        stroke:'black',
        strokeWidth:3
    });
    var cl = new fabric.Line([30,550,720,550],{
        stroke:'black',
        strokeWidth:3
    });
    LiSAHall = new fabric.Group([sus1,sus2,sus3,cl],{
        top:100,
        left:70
    });
})();



canvas.on('mouse:down',function(options){
    canvas.sendBackwards(LiSAHall,true);    //背景のサスの描画を最背景に移動
});

function drowBackground(type){
    switch (type) {
        case 'lisa':
            console.log('drow background type='+type);
            canvas.add(LiSAHall);
            break;
        default:

    }
}
