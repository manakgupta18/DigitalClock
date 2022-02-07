var display1 = document.getElementById("display1");
var display2 = document.getElementById("display2");
var s_timer = document.getElementById("s_timer");
var b_timer = document.getElementById("b_timer");
var count = 1;
var s_time = 20;
var b_time = 5;
var s_min;
var b_min;
var s_second = 0;
var b_second = 0;
var run = true;

document.getElementById("s_plus").addEventListener('click',function(){
  s_time++;
  s_timer.innerHTML=s_time+" min";
  if(s_time==2)
    document.getElementById("s_minus").disabled=false;
});

document.getElementById("b_plus").addEventListener('click',function(){
  b_time++;
  b_timer.innerHTML=b_time+" min";
  if(b_time==2)
    document.getElementById("b_minus").disabled=false;
});

document.getElementById("s_minus").addEventListener('click',function(){
  s_time--;
  s_timer.innerHTML=s_time+" min";
  if(s_time==1)
    document.getElementById("s_minus").disabled=true;
});

document.getElementById("b_minus").addEventListener('click',function(){
  b_time--;
  b_timer.innerHTML=b_time+" min";
  if(b_time==1)
    document.getElementById("b_minus").disabled=true;
});

document.getElementById("start").addEventListener('click',function(){

  if(s_min==null)
    s_min=s_time;
  if(b_min==null)
    b_min=b_time;

  document.getElementById("s_plus").disabled=true;
  document.getElementById("s_minus").disabled=true;
  document.getElementById("b_plus").disabled=true;
  document.getElementById("b_minus").disabled=true;

  document.getElementById("start").style.display="none";
  document.getElementById("pause").style.display="initial";

  if(run)
    session_fun(s_min,s_second);
  else
    break_fun(b_min,b_second);
});

function session_fun(min,second=0){

  setTimeout(function(){
    display2.style.display="none";
    display1.style.display="initial";
    document.getElementById("head").innerHTML="Session "+count;
    document.getElementById("dial").style.backgroundColor="#00a0b0";
  },1000);

  document.getElementById("pause").addEventListener('click',function(){
    clearInterval(session_interval);
    document.getElementById("pause").style.display="none";
    document.getElementById("start").style.display="initial";
    s_min=min;
    s_second=second;
    run=true;
  });

  document.getElementById("reset").addEventListener('click',function(){
    clearInterval(session_interval);
    display1.innerHTML="";
    display2.innerHTML="";
    document.getElementById("s_plus").disabled=false;
    document.getElementById("s_minus").disabled=false;
    document.getElementById("b_plus").disabled=false;
    document.getElementById("b_minus").disabled=false;
    document.getElementById("pause").style.display="none";
    document.getElementById("start").style.display="initial";
    s_min=null;
    b_min=null;
    s_second=0;
    b_second=0;
  });

  var session_interval = setInterval(function(){
    var str;
    if(second>9)
      str=min+" : "+second;
    else
      str=min+" : 0"+second;
    if(min<10)
      str="0"+str;
    display1.innerHTML=str;
    second--;
    if(min==0&&second==-1){
      clearInterval(session_interval);
      break_fun(b_time);
    }
    if(second==-1){
      second=59;
      min--;
      }
  },1000);
}


function break_fun(min,second=0){

  setTimeout(function(){
    display1.style.display="none";
    display2.style.display="initial";
    document.getElementById("head").innerHTML="Break!";
    document.getElementById("dial").style.backgroundColor="#eb6841";
  },1000);

  document.getElementById("pause").addEventListener('click',function(){
    clearInterval(break_interval);
    document.getElementById("pause").style.display="none";
    document.getElementById("start").style.display="initial";
    b_min=min;
    b_second=second;
    run=false;
  });

  document.getElementById("reset").addEventListener('click',function(){
    clearInterval(break_interval);
    display1.innerHTML="";
    display2.innerHTML="";
    document.getElementById("s_plus").disabled=false;
    document.getElementById("s_minus").disabled=false;
    document.getElementById("b_plus").disabled=false;
    document.getElementById("b_minus").disabled=false;
    display2.style.display="none";
    display1.style.display="initial";
    document.getElementById("pause").style.display="none";
    document.getElementById("start").style.display="initial";
    document.getElementById("dial").style.backgroundColor="#00a0b0";
    s_min=null;
    b_min=null;
    s_second=0;
    b_second=0;
  });

  var break_interval = setInterval(function(){
    var str;
    if(second>9)
      str=min+" : "+second;
    else
      str=min+" : 0"+second;
    if(min<10)
      str="0"+str;
    display2.innerHTML=str;
    second--;
    if(min==0&&second==-1){
      clearInterval(break_interval);
      count++;
      session_fun(s_time);
    }
    if(second==-1){
      second=59;
      min--;
      }
  },1000);
}