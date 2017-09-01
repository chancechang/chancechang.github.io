/**
 * Created by 李畅 on 2017/7/2.
 */
let canvas = document.getElementById("canvas");
let control = document.getElementById("control");
let context = canvas.getContext("2d");
let controlCtx = control.getContext('2d');
let snake = {};
snake.score=0;
init();
//生成位置为x,y的方块，包含颜色
snake.square = function (x,y,color) {
    let context = canvas.getContext("2d");
    x = x+1;
    y = y+1;
    let x1 = x+18;
    let y1 = y+18;
    context.beginPath();
    context.moveTo(x,y);
    context.lineTo(x1,y);
    context.lineTo(x1,y1);
    context.lineTo(x,y1);
    context.lineTo(x,y);
    let x2 = x+2;
    let y2 = y+2;
    context.fillStyle = color;
    context.fillRect(x2, y2, 14, 14);
    context.strokeStyle = "black";
    context.stroke();
}

//清除位置为x,y的方块
snake.clearSquare = function (x,y) {
    let context = canvas.getContext("2d");
    context.clearRect(x,y,20,20);
    context.fillStyle= "#E0E0E0";
    context.fillRect(x,y,20,20);
    context.stroke();
};
//初始化canvas画布,适用于三种模式
function init() {
    snake.body=[];
    snake.head = 0;
    snake.direction=["left","up","right","down"];
    snake.dir = 0;
    snake.foodPos=[];
    snake.eat=false;
    snake.step =0;
    snake.schema1 = false;
    snake.schema2 = false;
    snake.schema3 = false;
    context.fillStyle = "#E0E0E0";
    context.fillRect(0, 0, 600, 600);
    controlCtx.font = "bold 30px Arial";
    controlCtx.textAlign = "start";
    controlCtx.textBaseline = "top";
    controlCtx.fillStyle = "#ADADAD";
    controlCtx.clearRect(30,40,150,200);
    controlCtx.fillText("得分：", 30, 150);
    controlCtx.fillText(Math.floor(snake.score), 120, 150);
    controlCtx.fillText("步数：", 30, 190);
    controlCtx.fillText(snake.step, 120, 190);
    document.getElementById("filter").style.display="none";
};
//得分的展示
snake.controlShow=function () {
    controlCtx.clearRect(120,150,80,30);
    controlCtx.clearRect(120,190,80,30);
    controlCtx.fillText(Math.floor(snake.score), 120, 150);
    controlCtx.fillText(snake.step, 120, 190);
    if(snake.schema2||snake.schema3){
        controlCtx.clearRect(120, 40,80,30);
        controlCtx.fillText(snake.Level, 120, 40);
    }

};
//确定模式后第一次初始化
snake.init = function () {
    if(snake.schema2||snake.schema3){
        controlCtx.fillText("Level:", 30, 40);
        controlCtx.fillText(snake.Level, 120, 40);
    } else{
        controlCtx.clearRect(30, 40,170,30);
    }
    //放置障碍物
    if(snake.schema3){
        //alert(snake.wall[snake.Level-1])

        for(let i=0;i<snake.wall[snake.Level-1].length;i++){
            let smallwall = snake.wall[snake.Level-1][i];
            console.log(smallwall[0]+" "+smallwall[1]);
            snake.square(smallwall[0],smallwall[1],"black")
        }
    }
    //初始化蛇
    let initSnake = function () {
        snake.body=[];
        let wallcrash = false;
        let randomX = Math.floor(Math.random()*26)*20;//含0不含1,不包含26,最大值是25，25是第26个格子
        let randomY = Math.floor(Math.random()*26)*20;
        snake.head=0;
        //得到蛇身体位置
        for(let i =0;i<5;i++){
            //检查是否与障碍物冲突
            if(snake.schema3){
                for(let i=0;i<snake.wall[snake.Level-1].length;i++){
                    let smallwall = snake.wall[snake.Level-1][i];
                    if(smallwall[0]==randomX&&smallwall[1]==randomY){
                        wallcrash = true;
                        //alert("crash")
                        break;
                    }
                }
            }
            if(wallcrash){
                initSnake();
                break;
            }else{
                snake.body.push([randomX,randomY]) ;
                if(Math.random()>0.5){
                    randomY = randomY+20;
                }else{
                    randomX = randomX+20;
                }
            }

        }
    }
    initSnake();
    //画出蛇
    for(let j=0;j<snake.body.length;j++){
        let smallbody = snake.body[j];
        snake.square(smallbody[0],smallbody[1],"blue");
    }

    //确定初始移动方向
    if(snake.body[snake.head][0]==snake.body[snake.head+1][0]){
        snake.dir = 1;
    } else{
        snake.dir = 0;
    }
    //发放食物
    snake.food();
    //运行蛇
    if(snake.runTime){
        clearInterval(snake.runTime);
        snake.runTime=null;
    };
    snake.run();
}
snake.headPos = function () {
    let posX,posY;//蛇头位置
    //判断蛇头方向,对snake.head计算得出目前蛇头的位置
    if(snake.direction[snake.dir]=="up"){
        posX = snake.body[snake.head][0];
        posY = snake.body[snake.head][1]-20;
    } else if(snake.direction[snake.dir]=="left"){
        posX = snake.body[snake.head][0]-20;
        posY = snake.body[snake.head][1];
    } else if(snake.direction[snake.dir]=="down"){
        posX = snake.body[snake.head][0];
        posY = snake.body[snake.head][1]+20;
    } else{
        posX = snake.body[snake.head][0]+20;
        posY = snake.body[snake.head][1];
    }
    //判断出界
    if(posX<0||posX>580||posY<0||posY>580){
        alert("撞墙了，游戏结束");
        snake.over();
    }
    //躲避模式的撞墙
    if(snake.schema3){
        let j = snake.wall[snake.Level-1].length;
        while(j>0){
            j--;
            let smallwall = snake.wall[snake.Level-1][j];
            if(smallwall[0]==posX&&smallwall[1]==posY){
                alert("撞墙了，游戏结束");
                snake.over();
            }
        }
    }
    //判断撞自己
    for(let i =0;i<snake.body.length;i++){
        if(snake.body[i][0]==posX && snake.body[i][1]==posY){
            alert("撞到自己了，游戏结束");
            snake.over();
            break;
        }
    }
    return [posX,posY];
}
//蛇的移动
snake.move = function () {
    let pos = snake.headPos();
    //蛇头这一步在食物上，先清空食物
    if((pos[0]==snake.foodPos[0]) && (pos[1]==snake.foodPos[1])){
        snake.clearSquare(snake.foodPos[0],snake.foodPos[1]);
    }
    snake.square(pos[0],pos[1],"blue");
    if(snake.head ==0){
        //蛇头变换
        snake.head = snake.body.length-1;
    } else{
        snake.head = snake.head-1;
    }
    snake.clearSquare(snake.body[snake.head][0],snake.body[snake.head][1]);
    snake.body[snake.head]=[pos[0],pos[1]];

    //吃食物
    if((pos[0]==snake.foodPos[0]) && (pos[1]==snake.foodPos[1])){
        snake.eat=true;
    }
}
//生成食物
snake.food=function () {
    let t = 0;
    let randomX = Math.floor(Math.random()*30)*20;//含0不含1
    let randomY = Math.floor(Math.random()*30)*20;
    let bool = true;
    //判断食物是否撞蛇
    let i = snake.body.length;
    while(i>0){
        i--;
        if( snake.body[i][0]==randomX&&snake.body[i][1]){
            bool=false;
            break;
        }
    }
    //判断食物是否会撞墙
    if(snake.schema3){
        let j = snake.wall[snake.Level-1].length;
        while(j>0){
            j--;
            let smallwall = snake.wall[snake.Level-1][j];
            if(smallwall[0]==randomX&&smallwall[1]==randomY){
                bool=false;
                //alert("food crash wall");
                break;
            }
        }
    }

    //普通模式食物放10次都冲突，说明蛇身已占满屏幕
    if(snake.schema1&&t>=10){
        snake.success();
    }
    if(bool){
        snake.square(randomX,randomY,"red");
        snake.foodPos = [randomX,randomY];
    } else{
        t++;
        snake.food();
    }
}


snake.run =function () {
    snake.runTime = setInterval(function () {
        if(snake.eat){//吃食物就停一步
            snake.eat=false;
            //处理蛇头和蛇尾，后台需要处理的数据个数
            let change = snake.body.length-snake.head-1;
            let pos = snake.headPos();
            snake.square(pos[0],pos[1],"blue");//蛇移动完成
            //后台操作
            //从后往前原则
            snake.body.push([snake.body[snake.body.length-1][0],snake.body[snake.body.length-1][1]]);
            for(let i=change;i>=1;i--){
                snake.body[snake.head+i]=snake.body[snake.head+i-1];
            }
            snake.body[snake.head]=[pos[0],pos[1]];
            snake.food();
            snake.score+=10;
        } else{
            snake.move();
            snake.score+=0.2;
        }
        snake.step+=1;
        snake.controlShow();
        //普通模式、躲避模式运行一会加速
        if(snake.step%10==0 && snake.intervalTime>200&&(snake.schema1||snake.schema3)){
            snake.addSpeed();
            if(snake.runTime){
                clearInterval(snake.runTime);
                snake.runTime=null;
                snake.run();
            }
        }
        //过关模式，每一关蛇的移动速度不变
        if(snake.schema2&&snake.body.length>=10){
            snake.Level++;//关数更新，加速
            if(snake.intervalTime>200){
                snake.addSpeed();
                //清除移动
                if(snake.runTime){
                    clearInterval(snake.runTime);
                }
                //弹出filter，3s后消失，关数更新，重启
                snake.filter("<p>Level "+snake.Level+" is coming "+"</p>");
                setTimeout(function () {
                    init();
                    snake.schema2 = true;
                    snake.init();
                    snake.controlShow();
                },3000);
            } else{
                snake.success();
            }
        }
        //躲避模式，蛇运行到一定长度过关,过关后清空，右侧关数变化
        if(snake.schema3&&snake.body.length>=10){
            snake.Level++;
            //判断是否通过全关
            if(snake.Level<3){
                if(snake.runTime){
                    clearInterval(snake.runTime);
                }
                //弹出filter，3s后消失，关数更新，重启
                snake.filter("<p>Level "+snake.Level+" is coming "+"</p>");
                setTimeout(function () {
                    init();
                    snake.schema3 = true;
                    snake.init();
                    snake.controlShow();
                },3000);
            } else{
                snake.success();
            }
        }
    },snake.intervalTime);
};
snake.filter = function (text) {
    //弹出遮盖布
    let filter = document.getElementById("filter");
    if(filter.style.display=="none"||filter.style.display==""){
        filter.innerHTML="";
        filter.style.display="block";
        filter.style.left = canvas.offsetLeft+"px";
        filter.innerHTML=text;
    } else{
        filter.style.display="none";
        if(snake.runTime){
            clearInterval(snake.runTime);
            snake.runTime=null;
        }
        snake.run();
    }
}
snake.stop = function () {
    if(snake.runTime){
        clearInterval(snake.runTime);
        snake.runTime=null;
    };
    snake.filter("<p>"+"Game Stop "+"</p>");
}
snake.over=function () {
    //清空移动信息
    if(snake.runTime){
        clearInterval(snake.runTime);
        snake.runTime=null;
    };
    snake.filter("<p>"+"Game Over "+"</p><br>"+"<p>"+"Score: "+Math.floor(snake.score)+"</p>");
    setTimeout(function () {
        snake.step=0;
        snake.score =0;
        init();
    },3000);

};
snake.success = function () {
    if(snake.runTime){
        clearInterval(snake.runTime);
        snake.runTime=null;
    };
    snake.filter("<p>"+"Congratulations ！"+"</p>");
    setTimeout(function () {
        snake.step=0;
        snake.score =0;
        init();
    },3000);
};
//加速；
snake.addSpeed=function () {
    snake.intervalTime = snake.intervalTime - 200;
};
document.getElementById("one").addEventListener("click",function (e) {
    init();
    snake.score=0;
    snake.intervalTime = 1000;
    snake.schema1 =true;
    snake.init();
    this.blur();
},false);
document.getElementById("two").addEventListener("click",function (e) {
    //初始化
    init();
    snake.score=0;
    snake.intervalTime = 1000;
    snake.schema2=true;
    snake.Level = 1;
    snake.init();
    this.blur();
},false);

document.getElementById("three").addEventListener("click",function () {
    //初始化
    init();
    snake.score=0;
    snake.intervalTime = 1000;
    snake.schema3=true;
    snake.Level = 1;
    snake.wall=[[[80,80],[480,480],[80,480],[480,80],[80,100],[480,500],[80,500],[480,100],[100,80],[460,480],[100,480],[460,80]],    [[80,280],[280,80],[520,280],[280,520],[60,280],[100,280]]];
    snake.init();
    this.blur();
},false);
document.addEventListener("keydown",function(e){
    if(e&&e.keyCode==37){
        if(snake.dir!=2){
            snake.dir =0;
        }
    } else if(e&&e.keyCode==38){
        if(snake.dir!=3){
            snake.dir =1;
        }
    } else if(e&&e.keyCode==39){

        if(snake.dir!=0){
            snake.dir =2;
        }
    }else if(e&&e.keyCode==40){
        if(snake.dir!=1){
            snake.dir =3;
        }
    }else if(e&&e.keyCode==32){
        snake.stop();
    }
},false);



