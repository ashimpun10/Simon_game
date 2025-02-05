var buttonColors=["red","blue","green","yellow"];
var level=0;
var gamePattern=[];
var userClickedPattern=[];
var randomNumber;
var randomChosenColor;
var userChosenColor;
function nextSequence(){
     randomNumber=Math.floor((Math.random()*3));
     randomChosenColor=buttonColors[randomNumber];
     $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    gamePattern.push(randomChosenColor);
}

var start=true;
//Sound for start
document.addEventListener("keydown",function(){
    if(start){
        level=0;
        level++;
        $("h1").text("Level "+level);
        nextSequence();
        start=false;
    }
});

//User click
$(".btn").click(function(){
    userChosenColor=this.id;
   userClickedPattern.push(userChosenColor);
   playSound(userChosenColor);
   animatePress(userChosenColor);
   setTimeout(function(){
    document.querySelector("#"+userChosenColor).classList.remove("pressed");
   },100);
//Receiving click and checking answer and restarting if wrong
    var i=0;
    while(i<userClickedPattern.length){
        if(gamePattern[i]===userClickedPattern[i]){
            i++;
        }
        else{
            document.querySelector("body").classList.add("game-over");
            setTimeout(function(){
            document.querySelector("body").classList.remove("game-over");
            $("h1").text("Game Over! Press any key to restart");
            var f=new Audio("sounds/wrong.mp3");
            f.play();
        },300)
         start=true;
         poping(gamePattern);
         poping(userClickedPattern);
        break;
        }
}
//Checking array and new level
    if((gamePattern.length!=1 && gamePattern.length===userClickedPattern.length) || ((gamePattern.length===1 && gamePattern[0]===userClickedPattern[0]))){
        var n=gamePattern.length;
        poping(gamePattern);
        poping(userClickedPattern);
        n++;
        level++;
        if(!start){
            $("h1").text("Level "+level);
            for(var j=1;j<=n;j++){
            setTimeout(nextSequence,1000*(j-(j-1)));
        }
    }
}
});

function playSound(name){
    var audio = new Audio("sounds/"+name+'.mp3');
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
}

function poping(arr){
    var m=arr.length;
    for(var k=0;k<m;k++){
        arr.pop();
    }
}