/**
 * Created by 李畅 on 2017/8/27.
 */

let scroll_left = document.getElementById("scroll_left");
let liArray =  scroll_left.getElementsByTagName("li");
let s_module = document.getElementsByClassName("s_module");
let colorArray = ["rgb(100,195,51)","rgb(241,84,83)","rgb(234,95,141)","rgb(10,166,232)","rgb(25,200,169)","rgb(247,169,69)","rgb(0,0,0)" ]

$(window).bind('load', function(){
    $('header .bxslider').bxSlider({
        mode:"fade",
        infiniteLoop:true,
        controls:false,
        speed:300,
        auto:true,
        autoControls:true,
    });
    // window.addEventListener("scroll",function () {
    //     alert("sadad")
    // },false)
    // window.onscroll = function () {
    //     alert("sad")
    //
    // }
});

function addHandler(target, eventType, handler){
    if(target.addEventListener){//主流浏览器
        addHandler = function(target, eventType, handler){
            target.addEventListener(eventType, handler, false);
        };
    }else{//IE
        addHandler = function(target, eventType, handler){
            target.attachEvent("on"+eventType, handler);
        };
    }
    //执行新的函数
    addHandler(target, eventType, handler);
}
$(document).scroll(function () {
    if($(document).scrollTop()<650){
        $("#scroll_left").css("display","none");
    }else if($(document).scrollTop()<730){
        $("#scroll_left").css("display","block");
        $("#scroll_head").css("display","none");
    }else if($(document).scrollTop()<2209-440){
        $("#scroll_head").css("display","block");
        liArray[1].style.backgroundColor = "rgb(98,98,98)";
    }else if($(document).scrollTop()<2704-440) {
        liArray[1].style.backgroundColor = colorArray[0];
        liArray[2].style.backgroundColor = "rgb(98,98,98)";
    }else if($(document).scrollTop()<3309-440) {
        liArray[1].style.backgroundColor = "rgb(98,98,98)";
        liArray[2].style.backgroundColor =  colorArray[1];
        liArray[3].style.backgroundColor = "rgb(98,98,98)";
    }else if($(document).scrollTop()<3804-440) {
        liArray[2].style.backgroundColor = "rgb(98,98,98)";
        liArray[3].style.backgroundColor = colorArray[2];
        liArray[4].style.backgroundColor = "rgb(98,98,98)";
    }else if($(document).scrollTop()<4408-440) {
        liArray[3].style.backgroundColor = "rgb(98,98,98)";
        liArray[4].style.backgroundColor =  colorArray[3];
        liArray[5].style.backgroundColor = "rgb(98,98,98)";
    }else if($(document).scrollTop()<4903-440) {
        liArray[4].style.backgroundColor = "rgb(98,98,98)";
        liArray[5].style.backgroundColor =  colorArray[4];
        liArray[6].style.backgroundColor = "rgb(98,98,98)";
    }else if($(document).scrollTop()<5418-440) {
        liArray[5].style.backgroundColor = "rgb(98,98,98)";
        liArray[6].style.backgroundColor =  colorArray[5];
        liArray[7].style.backgroundColor = "rgb(98,98,98)";
    }else{
        liArray[6].style.backgroundColor = "rgb(98,98,98)";
        liArray[7].style.backgroundColor = "rgb(255,0,0)";
    }

    }
);
let moduleLeftTop = document.getElementsByClassName("s_module_left_top");
for(let div of moduleLeftTop){
    let ul = div.getElementsByTagName("ul")[0];
    setInterval(function () {
        let li =ul.getElementsByTagName("li")[0] ;
        ul.removeChild(li);
        ul.appendChild(li);
    },3000)
}
for(let i = 1; i<liArray.length-2;i++){
    // alert(s_module[i-1].offsetTop)
    addHandler(liArray[i],"click",function (e) {
        // e.preventDefault();
        $(document).scrollTop(s_module[i-1].offsetTop-80);
        scroll_left_clear_color();
    })

}
//猜你喜欢
addHandler(liArray[liArray.length-2],"click",function () {
    $(document).scrollTop(document.getElementById("guess_like").offsetTop - 80);
});
addHandler(liArray[liArray.length-1],"click",function () {
    $(document).scrollTop(0);
})
function scroll_left_clear_color(){
    for(let i = 1; i<liArray.length-1;i++){
        // alert(s_module[i-1].offsetTop)
        liArray[i].style.backgroundColor ="rgb(98,98,98)";
    }
}
