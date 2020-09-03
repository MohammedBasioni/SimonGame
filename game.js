var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;






$(".btn").on("click", function(event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  checkanswer(userClickedPattern.length-1);
  playSound(userChosenColour);
  animatePress(userChosenColour);
});

$(document).keypress(function () {
  if (level === 0){
    level++;
    nextSequence();
  }

})


function checkanswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length){
      setTimeout(function () {
        nextSequence()
      },1000);
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
              $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = []
}

function nextSequence() {
  userClickedPattern = [];
  $("h1").text("Level " + level);
  level++;
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
            $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
