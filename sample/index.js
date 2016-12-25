window.onload = function() {

var canvas = new fabric.Canvas('canvas');

jQuery(document).ready( function() {
$("#text_input").click(function(){

    canvas.isDrawingMode = false;

    if (canvas.getContext) {
        var context = canvas.getContext('2d');
    }

    var text, size, color;

    var mouse_pos = { x:0 , y:0 };

    text = $('#text').val();
    size = $('#size').val();
    color = $('#color').val();

        canvas.observe('mouse:down', function(e) {

        mouse_pos = canvas.getPointer(e.e);
        size = parseInt(size);

        canvas.add(new fabric.Text(text, {
            fontFamily: 'Arial',
            fontSize: size,
            left: mouse_pos.x,
            top: mouse_pos.y,
            textAlign: "left",
            strokeWidth: 1,
            fontWeight: 'bold',
            strokeStyle: '#000000',
            fill: color
        }));
        canvas.off('mouse:down');
        canvas.renderAll();
        canvas.calcOffset();
     });

});
$("#draw").click(function(){
    canvas.isDrawingMode = true;
    canvas.freeDrawingLineWidth = 5;
    canvas.renderAll();
    canvas.calcOffset();
});
$("#rect").click(function(){

  var mouse_pos = { x:0 , y:0 };

  canvas.isDrawingMode = false;

  canvas.observe('mouse:down', function(e) {

  mouse_pos = canvas.getPointer(e.e);

  canvas.add(new fabric.Rect({
    left: mouse_pos.x,
    top: mouse_pos.y,
    width: 75,
    height: 50,
    fill: 'white',
    stroke: 'black',
    strokeWidth: 3,
    padding: 10
  }));

  canvas.off('mouse:down');

  });

});
$("#circle").click(function(){

  var mouse_pos = { x:0 , y:0 };

  canvas.isDrawingMode = false;

  canvas.observe('mouse:down', function(e) {

  mouse_pos = canvas.getPointer(e.e);

  canvas.add(new fabric.Circle({
    left: mouse_pos.x,
    top: mouse_pos.y,
    radius: 30,
    fill: 'white',
    stroke: 'black',
    strokeWidth: 3
  }));

  canvas.off('mouse:down');

  });

});
$("#ellipse").click(function(){

  var mouse_pos = { x:0 , y:0 };

  canvas.isDrawingMode = false;

  canvas.observe('mouse:down', function(e) {

  mouse_pos = canvas.getPointer(e.e);

  canvas.add(new fabric.Ellipse({
    rx: 45,
    ry: 25,
    fill: 'white',
    stroke: 'black',
    strokeWidth: 8,
    left: mouse_pos.x,
    top: mouse_pos.y
  }));

  canvas.off('mouse:down');

  });

});
$("#line").click(function(){

canvas.isDrawingMode = false;

if (canvas.getContext) {
    var context = canvas.getContext('2d');
}

canvas.observe('mouse:down', function(e) { mousedown(e); });
canvas.observe('mouse:move', function(e) { mousemove(e); });
canvas.observe('mouse:up', function(e) { mouseup(e); });

var started = false;
var startX = 0;
var startY = 0;

/* Mousedown */
function mousedown(e) {
    var mouse = canvas.getPointer(e.e);
    started = true;
    startX = mouse.x;
    startY = mouse.y;
    canvas.off('mouse:down');
}

/* Mousemove */
function mousemove(e) {

    if(!started) {

        return false;

    }
    canvas.off('mouse:move');

}

/* Mouseup */
function mouseup(e) {

    if(started) {

        var mouse = canvas.getPointer(e.e);

        canvas.add(new fabric.Line([startX, startY, mouse.x, mouse.y],{ stroke: "#000000", strokeWidth: 2}));
        canvas.renderAll();
        canvas.calcOffset(); 

        started = false;
        canvas.off('mouse:up');

    }   

 }

});
$("#save").click(function(){
    canvas.isDrawingMode = false;
    if(!window.localStorage){alert("画像保存機能はブラウザがサポートしていません。"); return;}
    // save to localStorage
    var json = JSON.stringify(canvas);
    window.localStorage.setItem("hoge", json);
});
$("#load").click(function(){
    canvas.isDrawingMode = false;
    if(!window.localStorage){alert("画像保存機能はブラウザがサポートしていません。"); return;}
    //clear canvas
    canvas.clear();
    //load from localStorage
    canvas.loadFromJSON(window.localStorage.getItem("hoge"));
    // re-render the canvas
    canvas.renderAll();
    // optional
    canvas.calcOffset();
});
$("#delete").click(function(){
    canvas.isDrawingMode = false;
    if(!window.localStorage){alert("画像保存機能はブラウザがサポートしていません。"); return;}
    if (confirm('本当に削除しますか？')) {
        window.localStorage.removeItem("hoge");
    }
});
$("#clear").click(function(){
    canvas.isDrawingMode = false;
    if (confirm('本当にクリアしますか？')) {
        canvas.clear();
    }
});
$("#remove").click(function(){
    canvas.isDrawingMode = false;

    var activeObject = canvas.getActiveObject(),
    activeGroup = canvas.getActiveGroup();
    if (activeObject) {
        if (confirm('本当に削除しますか？')) {
            canvas.remove(activeObject);
        }
    }
    else if (activeGroup) {
        if (confirm('本当に削除しますか？')) {
            var objectsInGroup = activeGroup.getObjects();
            canvas.discardActiveGroup();
            objectsInGroup.forEach(function(object) {
            canvas.remove(object);
            });
        }
    }

});
$("#image_save").click(function(){
    canvas.isDrawingMode = false;
    if(!window.localStorage){alert("画像保存機能はブラウザがサポートしていません。"); return;}
    // save to localStorage
    var base64 = $('canvas').get(0).toDataURL('png');
    window.localStorage.setItem("foo", base64);
});
$("#image_load").click(function(){
    canvas.isDrawingMode = false;
    if(!window.localStorage){alert("画像保存機能はブラウザがサポートしていません。"); return;}
    //load from localStorage
    var base64 = window.localStorage.getItem("foo");
    if (base64) {
                if (canvas.getContext) {
                    var context = canvas.getContext('2d');
                }
                canvas.clear();
                var image = new Image();
                image.onload = function() {
                    fabric.Image.fromURL(image.src, function(img) {
                        canvas.add(img);
                        img.set('originX', 350);
                        img.set('originY', 300);
                        img.set('left', 350);
                        img.set('top', 300);
                        img.set('zindex', 0);
                        img.set('selectable', false);
                        canvas.bringToFront(img);
                    });
                canvas.renderAll();
                canvas.calcOffset();       
                };
                    /*
                    location.href = image.src;
                    context.drawImage(image, 0, 0);
                    var data = base64.replace(/^data:image\/(png|jpg);base64,/, "");
                    */

                image.src = base64;
    }
});
$("#image_delete").click(function(){
    canvas.isDrawingMode = false;
    if(!window.localStorage){alert("画像保存機能はブラウザがサポートしていません。"); return;}
    if (confirm('本当に削除しますか？')) {
        window.localStorage.removeItem("foo");
    }
});

});

canvas.calcOffset();

document.onkeyup = function(e) {
  canvas.renderAll();
};

setTimeout(function() {
  canvas.calcOffset();
}, 100);

};