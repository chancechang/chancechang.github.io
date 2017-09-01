/**
 * Created by 李畅 on 2017/7/15.
 */
const calc = document.getElementById("calc");
const equation = document.getElementById("equation");
const result = document.getElementById("result");
const defConstant = document.getElementById("defConstant");
let calculate = equation.value.trim();
let calculator={};
Math.a = 23;
let constantList = {"e":Math.E,"π":Math.PI,"a":Math.a};
Math.avg = function (...values) {
    //alert(values.length)
    let sum =0;
    for(var i of values){
        sum = sum+Number(i)
    }
    //alert("sum:"+sum)
    return sum/values.length;
};
Math.sina = function (...rests) {
    return Math.sin(2*Math.PI*Number(rests[0])/360).toFixed(2);
}
Math.cosa = function (...rests) {
    return  Math.cos(2*Math.PI*Number(rests[0])/360).toFixed(2)
};
Math.tana = function (...rests) {
    return Math.tan(2*Math.PI*Number(rests[0])/360).toFixed(2);
};
Math.cota = function (...rests) {
    return 1/Math.tan(2*Math.PI*Number(rests[0])/360).toFixed(2)
};
Math.loga = function (...rests) {
    return (Math.log(Number(rests[0]))/Math.log(10)).toFixed(2);
};
Math.lna = function (...rests) {
    //ln(100)==Math.log(100)/Math.log(Math.E)
    return (Math.log(Number(rests[0]))/Math.log(Math.E)).toFixed(2)
}
let FuncList = {"abs":Math.abs,"avg":Math.avg,"sin":Math.sina,"cos":Math.cosa,
    "tan":Math.tana,"cot":Math.cota,"log":Math.loga,"ln":Math.lna}
let operateSign = ["+","-","*","/","%","^"]
let numList=[];
let signList = [];
String.prototype.replaceAll = function(s1,s2){
    return this.replace(new RegExp(s1,"gm"),s2);
};

calculator.compute=function () {
    calculate = equation.value.trim();
    //替换函数
    for(let key in FuncList){
        while(calculate.indexOf(key+"(")!=-1){
            //要替换掉的字符
            let str = calculate.substring(calculate.indexOf(key),calculate.indexOf(")",calculate.indexOf(key)))+")";
            //alert(str);
            let t = str.substring(key.length+1,str.length-1);
            // alert("t:"+t);
            let m = t.split(",");
            // alert(m)
            calculate = calculate.replace(str, FuncList[key](...m));//replace不改变原来的值
            // alert("calcuate:"+calculate);
        }
    }

    //替换常量
    for(let key in constantList){
        calculate=calculate.replaceAll(key,constantList[key]);
    }
    //进行计算
    //中缀表达式转后缀表达式
    let sufdixArray = calculator.getSuffix(calculate);
//处理后缀表达式；
    calculator.proSuffix (sufdixArray);
};
let fun;
calc.addEventListener("click",function () {

    calculator.compute();
    result.innerText=calculate;
},false);
defConstant.addEventListener("click",function () {
    document.getElementById("defCon").style.display = "block";
},false);
document.getElementById("conAdd").addEventListener("click",function () {
    let conName = document.getElementById("conName").value.trim();
    Math[conName] =Number(document.getElementById("conValue").value.trim());
    constantList[conName] = Math[conName];
    document.getElementById("defCon").style.display = "none";
},false);

document.getElementById("defFunction").addEventListener("click",function () {
    document.getElementById("defFun").style.display = "block";

},false);

document.getElementById("funAdd").addEventListener("click",function () {
    let funName = document.getElementById("funName").value.trim();
    let funPara = document.getElementById("funPara").value.trim();
    let funParaArray = funPara.split(",");
    //alert(funParaArray);
    let funValue = document.getElementById("funValue").value.trim();
    let abcArray =  funValue.split(/[+\-*()%/^]+/);
    if(abcArray[abcArray.length-1]==""){
        abcArray.pop();
    }
    let operateArray=[];
    let re =/([+\-*/%^()])/g;
    let tempR;
    while(tempR = re.exec(funValue))
    {
        operateArray.push(tempR[1])
    }
    let m=0,n=0;
    //alert(operateArray);
    let real = [];
    for(let i = 0;i<funValue.length;){
        if(abcArray[m]&&abcArray[m].startsWith(funValue[i])){
            for(let j = 0;j<funParaArray.length;j++){
                if(funParaArray[j]==abcArray[m]){
                    // alert(funParaArray[j]);
                    real.push(j);
                    i = i+funParaArray[j].length;
                }
            }
            m++;
        }
        if(operateArray[n]&&operateArray[n]==funValue[i]){
            real.push(operateArray[n])
            i++;
            n++;
        }
    }
    // alert(real);

    let fun = function (...funParaArray) {
        let t="";
        for(let i of real){
            if(typeof i=="number"){
                t = t+funParaArray[i]
            }else{
                t = t+i;
            }
        }

        return t;

    };
    FuncList[funName]=fun;
    document.getElementById("defFun").style.display = "none";
},false);



calculator.getPrior=function(a){
    if(a=="+"||a=="-"){
        return 1;
    }else if(a=="("){
        return 0;
    }else{
        return 2;
    }
};
calculator.getSuffix = function (calculate) {
    let sufdixArray=[];
    let stack = [];
    let numArray =  calculate.split(/[+\-*()%/^]+/);
   // alert(numArray)
    if(numArray[numArray.length-1]==""){
        numArray.pop();
    }
    let operateArray = [];
    let t=0;
    let re =/([+\-*/%^()])/g;
    let tempR;
    while( tempR = re.exec(calculate))
    {
        operateArray.push(tempR[1])
    }
    let searchNum = 0;
    let searchOpera = 0;
    for(let i = 0;i<numArray.length;){
        if(calculate.indexOf(numArray[i],searchNum)<calculate.indexOf(operateArray[t],searchOpera)||(!operateArray[t])){
            //数字在前
            searchNum = calculate.indexOf(numArray[i],searchNum)+1;
            // alert("输出："+numArray[i]);
            sufdixArray.push(Number(numArray[i]));
            i++;
        } else if(operateArray[t]||stack[0]){
            searchOpera=calculate.indexOf(operateArray[t],searchOpera)+1;
            //alert("searchOpera"+searchOpera)

            //符号在前
            if(stack.length==0||operateArray[t]=="("||stack[stack.length-1]=="("){
                // alert("进栈："+operateArray[t]);
                stack.push(operateArray[t])//进栈
            } else if(operateArray[t]==")"){
                while(true){
                    let m = stack.pop();//出栈
                    if(m=="("){
                        break;
                    } else{
                        // alert("输出："+m);
                        sufdixArray.push(m);//输出
                    }
                }

            } else if((stack[stack.length-1]=="+"||stack[stack.length-1]=="-")&&(operateArray[t]!="+"&&operateArray[t]!="-")){
                stack.push(operateArray[t]);
                // alert("进栈："+operateArray[t]);
            } else {
                let m = stack.pop();
                // alert("出栈输出："+m);
                sufdixArray.push(m);
                while(stack[0]&&(calculator.getPrior(stack[stack.length-1])>=calculator.getPrior(operateArray[t]))){
                    m = stack.pop();
                    // alert("出栈输出输出："+m);
                    sufdixArray.push(m);
                }//优先级相同
                stack.push(operateArray[t]);
                // alert("进栈："+operateArray[t]);
            }
            t++;
        }

        //如果数字全部输出，依次出栈
        if(i==numArray.length&&t==operateArray.length){
            while(!operateArray[t]&&stack[0]){
                let m = stack.pop();//出栈
                sufdixArray.push(m);//输出
                // alert("出栈输出："+m)
            }


        }
        //数字全部输出，符号没有全部输出，那么符号一定是“）”
        if(i==numArray.length&&t==operateArray.length-1){
            while(true){
                let m = stack.pop();//出栈
                if(m=="("){
                    //alert("(出栈");
                    break;
                } else{
                    //alert("输出："+m);
                    // alert("出栈输出："+m)
                    sufdixArray.push(m);//输出
                }
            }
           while(stack[0]){
               let m = stack.pop();//出栈
               // alert("出栈输出："+m)
               sufdixArray.push(m);//输出
           }
        }
    }
    //alert(sufdixArray)
    return sufdixArray;
}
calculator.proSuffix = function (sufdixArray) {
    let stack = [];
    //处理后缀表达式
    //sufdixArray
    for(let i = 0;i<sufdixArray.length;i++){
        if(typeof sufdixArray[i] =="number"){
            //alert(sufdixArray[i])
            stack.push(sufdixArray[i]);
        }else{
            //为符号
            let m = stack.pop();
            let n = stack.pop();
            let t;
            switch (sufdixArray[i]){
                case "+":
                    t=n+m;
                    break;
                case "-":
                    t=n-m;
                    break;
                case "*":
                    t=n*m;
                    break;
                case "/":
                    t=n/m;
                    break;
                case "%":
                    t=n%m;
                    break;
                case "^":
                    t=Math.pow(n,m);
                    break;

            }
            //alert(t);
            stack.push(t);
            if(i==sufdixArray.length-1){
                calculate=t;
            }
        }
    }
}

