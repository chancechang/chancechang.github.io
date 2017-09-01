var grade = {
  "gradetable":
  [
    {
      "name" : "李易峰","Chinese" : 99, "Math" : 97
    },
    {
      "name" : "李易","Chinese" : 80, "Math" : 93
    },
    {
      "name" : "李华","Chinese" : 79, "Math" : 47
    },
    {
      "name" : "杨幂","Chinese" : 95, "Math" : 90
    },
    {
      "name" : "刘恺威","Chinese" :93, "Math" : 77
    },
    {
      "name" : "刘欢","Chinese" : 90, "Math" : 100
    }
  ]
}
var a=[];
var table = document.getElementsByTagName("table")[0];
const th=table.innerHTML;
var i, j, tablelen, tr, td, total;
var content = grade.gradetable;
tablelen = content.length;
showgrade();

function push(order){
  a.splice(0,a.length);
  for(j=0;j<content.length;j++){
    a.push(content[j][order])
  }
  console.log(a.join(","))
}

function showgrade(){
  var tr=document.getElementsByTagName("tr");
  for(j=1; j<tr.length;){
    table.removeChild(table.lastChild)
  }
  for(i=0; i<tablelen; i++){
    total = 0;
    tr = document.createElement("tr");
    for(j in content[i]){
      td = document.createElement("td");
      text = document.createTextNode(content[i][j]);
      if(typeof content[i][j] == "number" ){
        total += content[i][j];
      }
      td.appendChild(text);
      tr.appendChild(td);
    }
    td = document.createElement("td");
    text = document.createTextNode(total);
    td.appendChild(text);
    tr.appendChild(td);
    table.appendChild(tr);
  }
}
//快速排序
function quickSort(array, left, right,json){
    var le=left;
    var ri=right;
    var w,arr;
    var t=parseInt((left+right)/2)
    var bool=true;
    if(le ==ri){
      return ;
    }
    while(bool){
      left=le;
      right=ri;
      bool=false;
      while(left<t){
        if(array[left] <= array[t]){
          left ++;
        }
        else{
          bool=true;
          w=json[t];
          json[t]=json[left];
          json[left]=w;
          arr=array[left];

          array[left]=array[t];
          array[t]=arr
          left ++;
        }
      }
      while (t<right) {
          if(array[t]<array[right]){
            right--;
          }
          else{
            bool=true;
            w=json[t];
            json[t]=json[right];
            json[right]=w;
            arr=array[right];
            array[right]=array[t];
            array[t]=arr
            right--;
          }
      }
    }
    if(le < t){
      quickSort(array,le,t,json);
    }
     if(t < ri){
      quickSort(array,t+1,ri,json);
    }
}


document.getElementById("upChinese").addEventListener("click",function(){
  push("Chinese");
  quickSort(a,0,a.length-1,content);
  showgrade();
},false)
document.getElementById("downChinese").addEventListener("click",function(){
  push("Chinese");
  quickSort(a,0,a.length-1,content);
  content=content.reverse();
  showgrade();
},false)
document.getElementById("upMath").addEventListener("click",function(){
  push("Math");
  quickSort(a,0,a.length-1,content);
  showgrade();
},false)
document.getElementById("downMath").addEventListener("click",function(){
  push("Math");
  quickSort(a,0,a.length-1,content);
  content=content.reverse();
  showgrade();
},false)
document.getElementById("upTotal").addEventListener("click",function(){
  a.splice(0,a.length);
  for(j=0;j<content.length;j++){
    a.push(content[j]["Math"]+content[j]["Chinese"])
  }
  quickSort(a,0,a.length-1,content);
  showgrade();
},false)
document.getElementById("downTotal").addEventListener("click",function(){
  a.splice(0,a.length);
  for(j=0;j<content.length;j++){
    a.push(content[j]["Math"]+content[j]["Chinese"])
  }
  quickSort(a,0,a.length-1,content);
  content=content.reverse();
  showgrade();
},false)
