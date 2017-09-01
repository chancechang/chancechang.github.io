//游戏部分
var btnControl = document.getElementById("btnControl");//指令按钮
var selConValue = document.getElementById("selConValue");//指令值
var drawing = document.getElementsByTagName("canvas")[0];
var image = document.getElementById("image");
var order, i, j;
image.style.top = "150px"
image.style.left = "150px";
(function(){
  //确定浏览器支持convas元素
  if(drawing.getContext){
    var context = drawing.getContext("2d")
    //绘制路径
    context.beginPath();
    //绘制文本
    context.font = "bold 14px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    //绘制
    for( i = 30, j = 1; i < 360; i = i + 30, j++){
      context.moveTo(30, i);
      context.lineTo(330, i);
      context.moveTo(i, 30);
      context.lineTo(i,330);
      if(j <= 10){
        context.fillText(j,i+15,15);
        context.fillText(j,15,i+15);
      }
    }
    //描边路径
    context.stroke() ;
  }
})();

var control = function(order){
    switch (order) {
        case "TRA LEF":
              tra.left();
              break;
        case "TRA RIG":
              tra.right();
              break;
        case "TRA TOP":
              tra.top();
              break;
        case "TRA BOT":
              tra.back();
              break;
        case "MOV LEF":
              if(tra.left())
              {
                image.style.transform = "rotate(-90deg)";
              }
              break;
        case "MOV RIG" :
              if(tra.right()){
                image.style.transform = "rotate(90deg)";
              }
              break;
        case "MOV TOP" :
              if(tra.top()){
                image.style.transform = "rotate(0deg)";
              }
              break;
        case "MOV BOT" :
              if(tra.back()){
                image.style.transform = "rotate(180deg)";
              }
              break;
    }
}

var tra = {
  left : function(){
    if( myParseInt(image.style.left)>=60)
    {
      image.style.left =(myParseInt(image.style.left) - 30) + "px";
      return true;
    } else {
      alert("请改变方向");
      return false;
    }
  },
  right : function(){
    if(myParseInt(image.style.left)<=270){
      image.style.left =(myParseInt(image.style.left) + 30) + "px";
      return true;
    } else {
      alert("请改变方向");
      return false;
    }
  },
  top : function(){
    if(myParseInt(image.style.top)>=60){
      image.style.top =(myParseInt(image.style.top) - 30) + "px";
      return true;
    }else {
      alert("请改变方向");
      return false;
    }
  },
  back : function(){
    if(myParseInt(image.style.top)<=270){
      image.style.top =(myParseInt(image.style.top) + 30) + "px";
      return true;
    }else {
      alert("请改变方向");
      return false;
    }
  }
}
btnControl.addEventListener("click", function(){
  order = selConValue.value;
  control(order);
}, false)
function myParseInt(s) {
        var ret = parseInt(s);
      return (isNaN(ret) ? 0 : ret);
}


//浮出层部分
var filter = document.getElementById("filter")//遮罩设计
var emergediv = document.getElementById("emergediv");//浮出层
var emergebtn = document.getElementById("emerge");//浮出按钮
//浮出层部分是遮罩部分的子孙，点击遮罩，浮出层消失，点击到浮出层部分，为使浮出层不消失，而设置的布尔值
var emergedivClick;
emergebtn.addEventListener("click", function(){
  emergeControl.show();
  emergedivClick = false;
}, false)
document.getElementById("button1").addEventListener("click",function(){
  emergeControl.vanish();
},false)
document.getElementById("button2").addEventListener("click",function(){
  emergeControl.vanish();
},false)
emergediv.addEventListener("click",function(){
  emergedivClick = true;
  setTimeout(function(){
    emergedivClick = false;
  },1)
},false)
document.getElementById("filter").addEventListener("click",function(){
  if(!emergedivClick){
  emergeControl.vanish();
}
},false)
var emergeControl = {
  vanish : function(){
    if(filter.hasAttribute("class")){
      filter.removeAttribute("class")
    }
    emergediv.setAttribute("class","hide");
  },
  show : function(){
    filter.setAttribute("class","zhezhao");
    if(emergediv.hasAttribute("class")){
      emergediv.removeAttribute("class");
    }
  }
}
