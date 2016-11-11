/*
    バトンを描画するための定義ファイル
*/
(function (){
    // LiSA視聴覚
    var sus1 = new fabric.Line({
        x1:100,
        y1:500,
        x2:800,
        y2:500,
        bordercolor:rgba(0,0,0,1)
    });
    var sus2 = new fabric.Line({
        x1:100,
        y1:400,
        x2:800,
        y2:400,
        bordercolor:rgba(0,0,0,1)
    });
    var sus3 = new fabric.Line({
        x1:100,
        y1:300,
        x2:800,
        y2:300,
        bordercolor:rgba(0,0,0,1)
    });
    var cl = new fabric.Line({
        x1:100,
        y1:200,
        x2:800,
        y2:200,
        bordercolor:rgba(0,0,0,1)
    });
    LiSAHall = new fabric.Group([sus1,sus2,sus3,cl],{
        left:0,
        top:0
    });


})();

function drowBackground(type){
    switch (type) {
        case 'lisa':
            console.info(LiSAHall);
            canvas.add(LiSAHall);
            break;
        default:

    }
}
