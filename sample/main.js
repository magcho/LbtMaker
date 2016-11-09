

// id='c'の canvas elementの回りに wrapper element（div）を作る
var canvas = new fabric.Canvas('c');

// 矩形オブジェクトを作る
var rect = new fabric.Rect({
  left: 100,
  top: 100,
  fill: 'red',
  width: 20,
  height: 20,
  angle: 45
});

var circle = new fabric.Circle({
    radius: 30,
    left: 50,
    top: 50,
    fill: 'green'
});

var text = new fabric.Text('hello wrold',{
    left: 160,
    top: 100,
    fill: 'red',
    fontSize: 40
});

var text = new fabric.Text('hello world', {
  fontSize: 30,
  top: 30,
  left: 30
});

var circle = new fabric.Circle({
  radius: 100,
  fill: '#eef',
  scaleY: 0.5
});

var group = new fabric.Group([circle, text],{
    left: 150,
    top: 100,
    angle: -10
});

// canvas 上に矩形を追加する
// canvas.add(rect,circle,text);
canvas.add(group);

group.item(1).set({
    text: 'trololo',
    fill: 'white'
});
group.item(0).setFill('red');


rect.set('fill', 'red');
rect.set({ strokeWidth: 5, stroke: 'rgba(100,200,200,0.5)' });
rect.set('angle', 30).set('flipY', true);

canvas.renderAll();


console.log(rect.getWidth());
console.log(rect.getHeight());

console.log(canvas.toSVG());

(function (){
    canvas.on('mouse:down',function(e){
        e.target.setFill('blue');
        canvas.renderAll();
    });

    canvas.on('mouse:out',function(e){
        e.target.setFill('red');
        canvas.renderAll();
    })
})();
