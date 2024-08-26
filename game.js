var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
})
var userClickedPattern = [];
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})
function nextSequence(){
    var randomNumber = Math.random();
    randomNumber *= 4;
    randomNumber = Math.floor(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
function playSound(sound_name){
    var sound = new Audio("./sounds/"+sound_name+".mp3");
    sound.play();
}
function animatePress(currentColour){
    $("#."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#."+currentColour).removeClass("pressed");
    },100
)
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("level-title").text("Game Over, Press Any Key to Restart");
    }
}
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}