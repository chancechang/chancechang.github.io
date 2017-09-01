/**
 * Created by 李畅 on 2017/6/15.
 */

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let accuracy = document.getElementById("accuracy");
let img = new Image();
let enlarge = document.getElementById("enlarge");
let shink = document.getElementById("shink");
let red = document.getElementById("red");
let green = document.getElementById("green");
let blue = document.getElementById("blue");
let alpha = document.getElementById("alpha");
console.log(canvas.offsetLeft+"  "+canvas.offsetTop);

accuracy.value;

//获取文件地址
function getFileUrl(sourceId) {
    let url;
    if (navigator.userAgent.indexOf("MSIE")>=1) { // IE
        url = document.getElementById(sourceId).value;
    } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox
        url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
    } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome
        url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
    }
    return url;
}


function preImg(sourceId) {
    let url = getFileUrl(sourceId);
    img.src=url;
    if(confirm("确认切换图片吗？")){
        render();
    };
}
function render() {
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
}
enlarge.addEventListener("click",function () {
    let canWidth = canvas.width;
    let canHeight = canvas.height;
    canvas.width = canWidth+10;
    canvas.height = canHeight+10;
    render();
},false)
shink.addEventListener("click",function () {
    let canWidth = canvas.width;
    let canHeight = canvas.height;
    canvas.width = canWidth-10;
    canvas.height = canHeight-10;
    render();
},false);
canvas.addEventListener("mousemove",function (e) {
    e = window.event||e;
    let positionX = e.clientX-canvas.offsetLeft;
    let positionY = e.clientY - canvas.offsetTop;
    let data = getRGBA(positionX,positionY);
    red.value = data[0];
    green.value = data[1];
    blue.value = data[2];
    alpha.value = data[3];
},false);
canvas.addEventListener("click",function (e) {
    e = window.event||e;
    let positionX = e.clientX-canvas.offsetLeft;
    let positionY = e.clientY - canvas.offsetTop;
    let standardRGB = getRGBA(positionX,positionY)
    //alert(standardRGB[0]+" "+standardRGB[1]+"  "+standardRGB[2]);
    setRGBA(positionX,positionY);
    let imageData = cut(positionX,positionY,standardRGB);
    ctx.putImageData(imageData,0,0);

},false);

function cut(positionX,positionY,standardRGB) {
    let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    let width = canvas.width;
    let height = canvas.height;
    let data = imageData.data;
    let getData = function (x,y) {
        let t = (x*+y*width)*4;
        return [data[t], data[t+1], data[t+2], data[t+3]]
    };

    let marked =new Array(width);
    for(let i=0;i<width;i++){
        marked[i]=new Array(height);
        for(let j=0;j<height;j++){
            marked[i][j]=0;
        }
    };
    let seeds=[];
    seeds.push([positionX,positionY]);
    const surround = [-1,-1,0,-1,1,-1,1,0,1,1,0,1,-1,1,-1,0];
    while(seeds.length>0){
        let seed = seeds.pop();
        for(let n =0;n<8;n++){
            let targetX = seed[0]+surround[2*n];
            let targetY = seed[1]+surround[2*n+1];
            let targetRGB = getRGBA(targetX,targetY);
            if(targetY<=0||targetY>=300||targetX<=0||targetY>=300){
            } else  if(marked[targetX][targetY] == 0) {
               // alert(standardRGB[0]+" "+standardRGB[1]+"  "+standardRGB[2]+" "+targetRGB[0]+" "+targetRGB[1])

                if(isTolerate(standardRGB[0],standardRGB[1],standardRGB[2],targetRGB[0],targetRGB[1],targetRGB[2])){
                    marked[targetX][targetY] = 2;
                    seeds.push([targetX,targetY]);
                    //alert(seeds.length)
                } else {
                    marked[targetX][targetY] = 1;
                }
            } else{

            }
        }
    };


    for (var i = 0; i < width; i++ ) {
        for(var j = 0; j < height; j++) {
            if(marked[i][j] == 2){
                let tmp = 4 * (j * width + i)
                imageData.data[tmp] = 255
                imageData.data[tmp+1] = 255
                imageData.data[tmp+2] = 255
            }
        }
    }
    return imageData;

}

var isTolerate = function (r1,g1,b1,r2,g2,b2) {
    let r = r1-r1;
    let g = g1-g2;
    let b = b1-b2;
    //alert(Math.sqrt(r*r+g*g+b*b))
    return   (r*r+g*g+b*b)<400/Number(accuracy.value);
}
var setRGBA = function (posX,posY) {
    let context = canvas.getContext("2d");
    let imgData = context.getImageData(posX,posY,1,1);
    let data = imgData.data;
    data[0]=255;
    data[1]=255;
    data[2]=255;
    imgData.data=data;
    ctx.putImageData(imgData,posX,posY);
}


//posX,posY为相对于canvas的位置
var getRGBA = function (posX,posY) {
    let imgData = ctx.getImageData(posX,posY,1,1);
    let data = imgData.data;
    return [data[0],data[1],data[2],data[3]];
}