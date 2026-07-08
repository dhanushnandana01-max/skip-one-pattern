var buttoncolors=["red","blue","green","yellow"];
var gamepattern=[];
var userclickedpattern=[];
var start=false;
var level=0;
var expectedPattern = [];

$(document).keydown(function(){
    if(!start){
        start=true;
        nextSequence();
    }
});

$(".btn").click(function(){
    var userchosencolor=$(this).attr("id");
    userclickedpattern.push(userchosencolor);
    playSound(userchosencolor);
    animatePress(userchosencolor);
    checkAnswer(userclickedpattern.length-1);           
});

function checkAnswer(currentLevel) {
 
if(expectedPattern[currentLevel]===userclickedpattern[currentLevel]){
    if(userclickedpattern.length===expectedPattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
}

else{
    playSound("wrong");
    $("body").addClass("game-over");
    $(".level-title").text("game over ,press any key to restart");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },1000);
    startOver();
}

}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play().catch(function(){});
}

function nextSequence(){
    userclickedpattern=[];
    level++;
    $(".level-title").text("Level "+level);
    var randomnumber=Math.floor(Math.random()*4);
    var randomchosencolor=buttoncolors[randomnumber];
    gamepattern.push(randomchosencolor);
    if ((gamepattern.length - 1) % 2 === 0) {
    expectedPattern.push(randomchosencolor);
}

    $("#"+randomchosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomchosencolor);
}

function startOver(){
    level=0;
    gamepattern=[];
    userclickedpattern=[];
    start=false;
    expectedPattern =[ ];
};
