/**
 * Created by 李畅 on 2017/7/5.
 */
/**
 * 绘制背景
 *
 **/
const div = document.getElementById("div");
const container = document.getElementById("container");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const cropDiv = document.getElementById("cropDiv");
const dragCanvas = document.getElementById("dragCanvas");
let croper={};
let img = new Image();
croper.isDragcanvas=false;
croper.isDragdiv=false;
let cropDivPara = {
    x:0,
    y:0,
    width:document.getElementById("cropWidth").value,
    height:document.getElementById("cropHeight").value
}
let dragCanvasPara = {
    x:cropDivPara.x+cropDivPara.width,
    y:cropDivPara.y+cropDivPara.height,
    width:8,
    height:8,
}

//将本地图片加在到浏览器
let localize={
    //获取本地文件路径
    getFileUrl:function(sourceId) {
        let url;
        if (navigator.userAgent.indexOf("MSIE")>=1) { // IE
            url = document.getElementById(sourceId).value;
        } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox
            url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
        } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome
            url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
        }
        return url;
    },
    //将图片渲染到canvas
    preCanvas:function(sourceId) {
        let url = localize.getFileUrl(sourceId);

        img.src=url;
        if(confirm("确认切换图片吗？")){
            croper.initCanvas();//初始化画布
            ctx.drawImage(img,0,0,img.naturalWidth,img.naturalHeight,0,0,img.naturalWidth,img.naturalHeight);
            img.onload=function(){
                ctx.drawImage(img,0,0,img.naturalWidth,img.naturalHeight,0,0,img.naturalWidth,img.naturalHeight);

            };
            croper.renderCropdiv();//初始化裁剪框
        };
    }
};
//初始化黑白相间格子
croper.initCanvas =function () {
    let checkLen = 30;//黑白相间正方形边长
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<canvas.width;i+=checkLen){
        for(let j=0;j<canvas.height;j+=checkLen){
            if((i+j)/checkLen%2==0){
                ctx.fillStyle="#BEBEBE";
                ctx.fillRect(i,j,checkLen,checkLen);
            }
        }
    }
}
//渲染裁剪框
croper.renderCropdiv=function () {
    cropDiv.style.width = cropDivPara.width+"px";
    cropDiv.style.height = cropDivPara.height+"px";
    cropDiv.style.top = cropDivPara.y+"px";
    cropDiv.style.left = cropDivPara.x+"px";
    dragCanvasPara.x =Number(cropDivPara.width)+Number(cropDivPara.x);
    dragCanvasPara.y =Number(cropDivPara.height)+Number(cropDivPara.y);
    dragCanvas.style.left = dragCanvasPara.x-4+"px";
    dragCanvas.style.top=dragCanvasPara.y-4+"px";
    dragCanvas.width = dragCanvasPara.width;
    dragCanvas.height = dragCanvas.height;

    let dragCtx = dragCanvas.getContext("2d");
    dragCtx.fillStyle="#FF0000";
    dragCtx.fillRect(0,0,dragCanvasPara.width,dragCanvasPara.height);
    croper.renderPreview();

}
document.getElementById("crop").addEventListener("click",function (e) {
    e.preventDefault();
   // alert("daoda")
    croper.renderPreview();
   },false);
cropDiv.addEventListener("mousedown",function (e) {
    croper.dragInitX=e.clientX;//不带px
    croper.dragInitY=e.clientY;
    croper.isDragdiv=true;
},false)

croper.renderPreview=function () {
    let preview1 = document.getElementById("preview1");
    let preCtx1 = preview1.getContext("2d");
    preview1.width = Number(cropDivPara.width*0.75);
    preview1.height = Number(cropDivPara.height*0.75);
    preCtx1.drawImage(img,cropDivPara.x,cropDivPara.y,cropDivPara.width,cropDivPara.height,0,0,Number(cropDivPara.width*0.75),Number(Number(cropDivPara.height*0.75)))
    let preview2 = document.getElementById("preview2");
    let preCtx2 = preview2.getContext("2d");
    preview2.width = Number(cropDivPara.width);
    preview2.height = Number(cropDivPara.height);
    preCtx2.drawImage(img,cropDivPara.x,cropDivPara.y,cropDivPara.width,cropDivPara.height,0,0,Number(cropDivPara.width),Number(Number(cropDivPara.height)))
    let preview3 = document.getElementById("preview3");
    let preCtx3 = preview3.getContext("2d");
    preview3.width = Number(cropDivPara.width*1.25);
    preview3.height = Number(cropDivPara.height*1.25);
    preCtx3.drawImage(img,cropDivPara.x,cropDivPara.y,cropDivPara.width,cropDivPara.height,0,0,Number(cropDivPara.width*1.25),Number(Number(cropDivPara.height*1.25)))
    document.getElementById("preview").style.width = preview1.width+preview2.width+preview3.width+50+"px";
}

dragCanvas.addEventListener("mousedown",function (e) {
    croper.dragInitX=e.clientX;//不带px
    croper.dragInitY=e.clientY;
    croper.isDragcanvas=true;
    //alert( croper.dragInitY)
},false);
document.getElementById("confirm").addEventListener("click",function (e) {
    e.preventDefault();
    cropDivPara.width=document.getElementById("cropWidth").value||0;
    cropDivPara.height=document.getElementById("cropHeight").value||0;
    croper.renderCropdiv();
},false);
document.addEventListener("mousemove",function (e) {

    if(croper.isDragcanvas){
        //更改参数
        cropDivPara.width =Number(e.clientX)+Number(cropDivPara.width)-croper.dragInitX;
        cropDivPara.height =Number(e.clientY)+Number(cropDivPara.height)-croper.dragInitY;
        // dragCanvasPara.x =Number(cropDivPara.width)+Number(cropDivPara.x);
        // dragCanvasPara.y =Number(cropDivPara.height)+Number(cropDivPara.y);
        croper.dragInitX=e.clientX;//不带px
        croper.dragInitY=e.clientY;
        //alert(cropDivPara.width+"  "+cropDivPara.height)
        //渲染
        croper.renderCropdiv();
    }
    if(croper.isDragdiv){

        cropDivPara.y=Number(cropDivPara.y)+Number(e.clientY)-Number(croper.dragInitY);
        cropDivPara.x = Number(cropDivPara.x)+Number(e.clientX)-Number(croper.dragInitX);
        //alert(cropDivPara.x)
        // if(cropDivPara.y<=0){
        //     cropDivPara.y=0;
        //     alert(Number(canvas.height.replace("px",""))+"  "+Number(cropDivPara.y));
        //
        // }
        // // else if(Number(cropDivPara.y)+Number(cropDivPara.height)){
        // //     cropDivPara.y = Number(canvas.height.replace("px",""))-Number(cropDivPara.height);
        // // }
        // if(cropDivPara.x<0){
        //     cropDivPara.x=0;
        // }
        // dragCanvasPara.x =Number(cropDivPara.width)+Number(cropDivPara.x);
        // dragCanvasPara.y =Number(cropDivPara.height)+Number(cropDivPara.y);
        croper.dragInitX=e.clientX;//不带px
        croper.dragInitY=e.clientY;
        croper.renderCropdiv();

    }
},false);
document.addEventListener("mouseup",function(){
    croper.isDragcanvas=false;
    croper.isDragdiv=false;
}, false);

