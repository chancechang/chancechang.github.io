/**
     * Created by 李畅 on 2017/6/2.
     */
let eg = {};
eg.data=["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg","06.jpg","07.jpg","08.jpg","09.jpg","10.jpg","11.jpg","12.jpg","13.jpg","14.jpg","15.jpg","16.jpg","17.jpg","18.jpg"];
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
    for(let i = start;n<eg.groupSize;i++,n++){
        // eg.photoNum是图片总数
        while(i<0){
            i = i+eg.photoNum;
        }
        while(i>=eg.photoNum){
            i = i -eg.photoNum;
        }
        let li = document.createElement("li");
        li.innerHTML = "<img src='"+eg.data[i]+"'>";
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
    //对键盘-> <-添加监听
    eg.addListener(document, "keyup", function (e) {
        e = e||event;
        //<-
        if(e.keyCode === 37){
            eg.prvePhoto();

        }
        //->
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

    while(!((eg.showNum>=eg.groupshowNum)&&(eg.showNum<eg.groupshowNum+eg.groupSize))){
        --eg.groupNum;
        eg.showPhotos(eg.groupNum);
    };
};

eg.nextPhoto = function () {
    eg.showNum ++;
    if(eg.showNum===eg.photoNum){
        eg.showNum =0;
    };
    eg.showBig();

    while(!((eg.showNum>=eg.groupshowNum)&&(eg.showNum<eg.groupshowNum+eg.groupSize))){
        ++eg.groupNum;
        eg.showPhotos(eg.groupNum);
    };
};

eg.init();


eg.getElementsByClassName = function (className, element) {
    if(document.getElementsByClassName){
        return (element||document).getElementsByClassName(className);
    }
    let children = (element||document).getElementsByTagName("*");
    let elements = [];
    for(let i = 0;i<children.length;i++) {
        let child = children[i];
        let classNames = child.className.split(" ");
        for(let j = 0;j<classNames.length; j++) {
            if (child.classNames[j] === className) {
                elements.push(child);
                break;
            }
        }

    }
    return elements;
};