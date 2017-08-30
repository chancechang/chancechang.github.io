/**
     * Created by 李畅 on 2017/6/2.
     */
let eg = {};
eg.data=["photo (1).jpg","photo (2).jpg","photo (3).jpg","photo (4).jpg","photo (5).jpg","photo (6).jpg","photo (7).jpg","photo (8).jpg","photo (9).jpg","photo (10).jpg","photo (11).jpg","photo (12).jpg","photo (13).jpg","photo (14).jpg","photo (15).jpg","photo (16).jpg","photo (17).jpg"];
eg.groupNum = 1;//当前显示小照片组
eg.showNum = 0;//当前显示大照片
eg.groupSize = 6;//照片组大小
eg.groupshowNum = 0;//照片组照片起始位置
eg.photoNum = eg.data.length;//照片数量
eg.$ = function (id) {
    return document.getElementById(id);
};
//监听
eg.addListener = function(target, evenType, handler){
    if(target.addEventListener){
        target.addEventListener(evenType,handler,false);
    } else if(target.attachEvent){
        target.attachEvent("on"+evenType, handler);
    } else{
        target["on"+evenType] = handler;
    }
};
//显示大图片，小图片
eg.showPhotos = function (group) {
    //清空小图标列表
    eg.$("smallPhotosList").innerHTML="";
    let n = 0;
    // start指小图标开始编号
    start =  (group-1)*eg.groupSize;
    // i指小图片顺序编号，n指一组图标的个数
    for(let i = start;n<eg.groupsize;i++,n++){ eg.photonum是图片总数="" while(i<0){="" i="i+eg.photoNum;" }="" while(i="">=eg.photoNum){
            i = i -eg.photoNum;
        }
        let li = document.createElement("li");
        li.innerHTML = "<img src=""+eg.data[i]+"">";
        eg.$("smallPhotosList").appendChild(li);
        (function () {
            eg.addListener(li, "click", function () {
                eg.showNum = i;
                eg.showBig();
            })
        })(i);
        //小图标列表中第一张图片显示在大图
        if(n===0){
            eg.groupshowNum = i;
        }
        eg.showBig();

        if(n===5){
            break;
        }


    }
};


//将小图片显示成大图片
eg.showBig = function () {

    eg.$("bigPhoto").src = eg.data[eg.showNum];
};


eg.init = function () {
    eg.showPhotos(1);
    //对左右按钮添加监听
    eg.addListener(eg.$("prve"),"click",function (){
        eg.groupNum--;
        eg.showPhotos(eg.groupNum);
    })
    eg.addListener(eg.$("next"),"click",function (){
        eg.groupNum++;
        eg.showPhotos(eg.groupNum);
    });
    //对键盘-> <-添加监听 eg.addlistener(document,="" "keyup",="" function="" (e)="" {="" e="e||event;" <-="" if(e.keycode="==" 37){="" eg.prvephoto();="" }="" -="">
        if(e.keyCode === 39){
            eg.nextPhoto();
        }

    })

}

eg.prvePhoto = function () {
    eg.showNum --;
    if(eg.showNum ===-1){
        eg.showNum = eg.showNum+eg.photoNum;
    }
    eg.showBig();

    while(!((eg.showNum>=eg.groupshowNum)&&(eg.showNum<eg.groupshownum+eg.groupsize))){ --eg.groupnum;="" eg.showphotos(eg.groupnum);="" };="" eg.nextphoto="function" ()="" {="" eg.shownum="" ++;="" if(eg.shownum="==eg.photoNum){" eg.showbig();="" while(!((eg.shownum="">=eg.groupshowNum)&&(eg.showNum</eg.groupshownum+eg.groupsize))){></-添加监听></eg.groupsize;i++,n++){>