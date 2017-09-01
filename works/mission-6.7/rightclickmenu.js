var divbox=document.getElementById("divbox");
var divmenu=document.getElementById("divmenu");
divmenu.style.display="none";
divbox.addEventListener("contextmenu",function(e){
    e.preventDefault();
    e.returnValue=false;
    divmenu.style.display="block";
    var menuWidth=divmenu.offsetWidth;
    var menuHeight=divmenu.offsetHeight;
    var clientwidth=document.documentElement.clientWidth;
    var clientheight=document.documentElement.clientHeight;
    console.log(clientwidth+" "+clientheight)
    if(menuHeight+e.pageY<=clientheight){
      divmenu.style.top=e.pageY+"px";
    }
    else{
      divmenu.style.top=e.pageY-menuHeight+"px";
    }
    if(menuWidth+e.pageX<=clientwidth){
      divmenu.style.left=e.pageX+"px";
      console.log("在鼠标右边")
    }
    else{
      divmenu.style.left=e.pageX-menuWidth+"px";
      console.log("在鼠标左边")
    }
    divbox.addEventListener("click",function(){
      divmenu.style.display="none";
    })

},false);
document.getElementsByTagName("a")[0].addEventListener("click",function(){
  alert(this.innerHTML)
},false)
document.getElementsByTagName("a")[1].addEventListener("click",function(){
  alert(this.innerHTML)
},false)
