var tagdiv=document.getElementsByTagName("div")[0];
var tagName = ["html", "css", "js", "react", "vue"];
var rotateSpeed = Math.PI/100;
var r = 200;
var p, q;
var mcList = [];
var tagArray = document.getElementsByTagName("li");
var α = Math.PI/100;
var β = Math.PI/100;
var max;
function initags(){
  var textNode, a, li, t;
  for(var i = 0; i < 60; i++){
    t = i % 5;
    textNode = document.createTextNode(tagName[t]);
    a = document.createElement("a");
    li = document.createElement("li");
    a.appendChild(textNode);
    li.appendChild(a);
    tagdiv.appendChild(li);
  }
}

function initpos(){
  max = tagArray.length;
  for(var i=1; i<max+1; i++){
      p = Math.acos(-1+(2*i-1)/max);
      q= Math.sqrt(max*Math.PI)*p;
      mcList[i-1] = {};
      mcList[i-1].cx = r * Math.cos(q)*Math.sin(p);
      mcList[i-1].cy = r * Math.sin(q)*Math.sin(p);
      mcList[i-1].cz = r * Math.cos(p);
      tagArray[i-1].style.color = "rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")";

 }
 tagStyle();
}

function tagStyle(){
  for(var i=1; i<max+1; i++){
   tagArray[i-1].style.left = mcList[i-1].cx+tagdiv.offsetLeft+r+'px';
   tagArray[i-1].style.top = mcList[i-1].cy+tagdiv.offsetTop+r+'px';
   tagArray[i-1].style.opacity = 0.2+(mcList[i-1].cz+200)/500;
   tagArray[i-1].style.fontSize=5+(mcList[i-1].cz+200)/10+"px";
 }
}
function rotateX(){
  for(var i=1; i<max+1; i++){
      var x = mcList[i-1].cx;
      var y = mcList[i-1].cy;
      var z = mcList[i-1].cz;
      mcList[i-1].cy = y* Math.cos(α) - z * Math.sin(α);
      mcList[i-1].cz = y * Math.sin(α) + z * Math.cos(α);
  }
}
function rotateY(){
  for(var i=1; i<max+1; i++){
      var x = mcList[i-1].cx;
      var y = mcList[i-1].cy;
      var z = mcList[i-1].cz;
      mcList[i-1].cz = z * Math.cos(β) - x * Math.sin(β);
      mcList[i-1].cx = z * Math.sin(β) + x * Math.cos(β);
  }
}

tagdiv.addEventListener("mouseover",function(){
  α = -Math.PI/100;
  β = -Math.PI/100;
})
tagdiv.addEventListener("mouseleave",function(){
  α = Math.PI/100;
  β = Math.PI/100;
})

initags();
initpos();
setInterval(function(){
    rotateX();
    rotateY();
    tagStyle();
},1)
