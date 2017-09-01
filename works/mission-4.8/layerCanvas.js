/**
 * Created by 李畅 on 2017/7/19.
 */
let mainDiv = document.getElementById("mainDiv");
let firCanvas = document.getElementById("firCanvas");
let aside =  document.getElementsByTagName("aside")[0];

let layer = [];
let ctx;
let layerCanvas={};
layerCanvas.isMouseDown = false;
layerCanvas.isPainting = false;
layer.push(firCanvas);
layer[layer.length-1].addEventListener("mousedown",mouseDown,false);
function mouseDown(e) {

    layerCanvas.isMouseDown = true;
    ctx = layer[layer.length-1].getContext('2d');
    let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
    let x = Number(e.clientX) -Number(layer[0].offsetLeft)-Number(mainDiv.offsetLeft) ;
    let y = Number(e.clientY) -Number(layer[0].offsetTop)-Number(mainDiv.offsetTop)+scrollTop ;
    ctx.beginPath();
    ctx.moveTo(x,y);
}
document.addEventListener("mousemove",function (e) {
    if(layerCanvas.isMouseDown){

        layerCanvas.isPainting = true;
        let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        let x = Number(e.clientX) -Number(layer[0].offsetLeft)-Number(mainDiv.offsetLeft) ;
        let y = Number(e.clientY) -Number(layer[0].offsetTop)-Number(mainDiv.offsetTop)+scrollTop ;
        ctx.lineTo(x,y);
        ctx.strokeStyle = document.getElementById("color").value.trim();
        ctx.stroke();
    }
},false);
document.addEventListener("mouseup",function (e) {
    if(layerCanvas.isMouseDown){
        layerCanvas.isMouseDown = false;
        layer[layer.length-1].removeEventListener("mousedown",mouseDown,false);
        layerCanvas.addHandle(layer.length-1);
        //添加一个图层
        if(layerCanvas.isPainting){
            let newLayer = document.createElement("canvas");
            newLayer.className = "layerCanvas";
            newLayer.width = "600";
            newLayer.height = "450";
            mainDiv.insertBefore(newLayer,aside);
            layer.push(newLayer);
            layer[layer.length-1].addEventListener("mousedown",function (e) {
                mouseDown(e);
            },false);
            layerCanvas.isPainting = false;
        }
    }

},false);
layerCanvas.addHandle=function(n) {
    let div = document.createElement("div");
    div.innerText = n;
    let button = document.createElement("button");
    button.innerHTML = "隐藏";
    //设置背景色
    let button1 = document.createElement("button");
    button1.innerHTML = "设置背景色";
    //设置删除
    let button2 = document.createElement("button");
    button2.innerHTML = "删除";
    //缩略图
    let image =  document.createElement("img");
    image.style.width = "40px";
    image.style.height  = "30px";
    // let smallCanvas = document.createElement("canvas");
    // smallCanvas.width = "40";
    // smallCanvas.height = "30";
    div.appendChild(button);
    div.appendChild(button1);
    div.appendChild(button2);
    div.appendChild(image);
    aside.appendChild(div);
    //绘制缩略图
    let url = layer[n].toDataURL();
    image.src = url;
    button.addEventListener("click",function (e) {
        if(button.innerHTML == "隐藏"){
            button.innerHTML="显示";
            //显示出来
            document.getElementsByTagName("canvas")[n].style.display = "none";
        }else{
            button.innerHTML = "隐藏";
            document.getElementsByTagName("canvas")[n].style.display = "block";
        }
    },false);
    button1.addEventListener("click",function () {
        //设置背景色
        document.getElementsByTagName("canvas")[n].style.backgroundColor = document.getElementById("color").value.trim();
    },false);
    button2.addEventListener("click",function () {
        //删除自身，同时改变大家的层数；
        //删除canvas
        mainDiv.removeChild( document.getElementsByTagName("canvas")[n]);
        //删
        layer.splice(n,1);
        //重置aside,根据layer
        layerCanvas.resetAside();
    },false);
}
//重置aside,根据layer
layerCanvas.resetAside=function() {
    aside.innerHTML = "";
    for(let i =0;i<layer.length-1;i++){
        layerCanvas.addHandle(i);
    }
}
document.getElementById("change").addEventListener("click",function () {
    let number1 = document.getElementById("number1").value;
    let number2 = document.getElementById("number2").value;
    if(number1>=layer.length-1||number2>=layer.length-1){
        alert("请输入合法层数");
    }else{
        layerCanvas.change(Number(number1),Number(number2));
    }
},false);
layerCanvas.change=function(a,b) {
    let canvas0,canvas1,div0,div1;
    if(a<b){
        canvas0 = mainDiv.getElementsByTagName("canvas")[a];
        canvas1 = mainDiv.getElementsByTagName("canvas")[b];
        // div0 = aside.getElementsByTagName("div")[a];
        // div1 = aside.getElementsByTagName("div")[b];

    }else{
        canvas0 = mainDiv.getElementsByTagName("canvas")[b];
        canvas1 = mainDiv.getElementsByTagName("canvas")[a];
        // div0 = aside.getElementsByTagName("div")[b];
        // div1 = aside.getElementsByTagName("div")[a];
    }
    if(Math.abs(a-b)==1){
        mainDiv.insertBefore(canvas1,canvas0);
        // aside.insertBefore(div1,div0);
    }else{
        let next = canvas0.nextSibling;
        mainDiv.insertBefore(canvas0,canvas1);
        mainDiv.insertBefore(canvas1,next);
        //let nextDiv = div0.nextSibling;
        // aside.insertBefore(div0,div1);
        // aside.insertBefore(div1,nextDiv);
    }
    //处理数组
    let m = layer[a];
    let n = layer[b];
    layer.splice(a,1,n);
    layer.splice(b,1,m);
    //重置aside,根据layer
    layerCanvas.resetAside();

}