var breakTime = 300, breakTimeSet = 300, sessionTime = 1500, sessionTimeSet = 1500, running = 0, state = 1, barLength = "80%";
var audio = new Audio("http://www.gravomaster.com/alarm/sounds/Mac.WAV");

function twoDigits(number) {
     return (number < 10 ? '0' : '') + number 
}


function set(){
  $("#breakDisplay").html("Break: " + Math.floor(breakTime / 60));
  $("#sessionDisplay").html("Session length: " + Math.floor(sessionTime / 60));
  $("#chrono").html(Math.floor(sessionTime / 60) + ":" + twoDigits(sessionTime % 60)); 
}

set();

$("#breakAdd").on("click", function(){
  if (running === 0) {
    breakTimeSet = (Math.floor(breakTimeSet / 60) * 60 + 60);
    breakTime = breakTimeSet;
    set();
  }
});

$("#breakWithdraw").on("click", function(){
  if (breakTime > 60 && running === 0){
    breakTimeSet = (Math.floor(breakTime / 60) * 60 - 60);
    breakTime = breakTimeSet;
    set();
  }
});

$("#sessionAdd").on("click", function(){
  if (running === 0){
    sessionTimeSet = (Math.floor(sessionTime / 60) * 60 + 60);
    sessionTime = sessionTimeSet;
    set();
  }
});

$("#sessionWithdraw").on("click", function(){
  if (sessionTime > 60 && running === 0){
    sessionTimeSet = (Math.floor(sessionTime / 60) * 60 - 60);
    sessionTime = sessionTimeSet;
    set();
  }
});

$("#startButton").on("click", function(){
  if (running === 0) {
    running = state;
    $("#startButton").html("Stop");
    if (running === 1) {
      sessionRunning();
    } else if (running === 2) {
      breakRunning();
    }
  } else if (running === 1) {
    state = 1;
    running = 0;
    $("#startButton").html("Resume");
  } else if (running === 2) {
    state = 2;
    running = 0;
    $("#startButton").html("Resume");
  }
});

function sessionRunning(){
   var sessionChrono = setInterval(function(){
      sessionTime = Math.round((sessionTime - 0.1) * 10) / 10;
      $("#whatNow").html("Working Session");
      $("#chrono").html(Math.floor(sessionTime / 60) + ":" + twoDigits(Math.floor(sessionTime % 60)));
      barLength = ((sessionTime/sessionTimeSet) * 80).toString() + "%";
      $("#progressBar").css("width", barLength);
      
     if (sessionTime === 0) {
       sessionTime = sessionTimeSet;
       running = 2;
       clearTimeout(sessionChrono);
       audio.play();
       breakRunning();
       return;
      }
     
     if (running === 0){
       clearTimeout(sessionChrono);
     }
     
    }, 100);
}

function breakRunning(){
    var breakChrono = setInterval(function(){
      breakTime = Math.round((breakTime - 0.1) * 10) / 10;
      $("#whatNow").html("Break Time");
      $("#chrono").html(Math.floor(breakTime / 60) + ":" + twoDigits(Math.floor(breakTime % 60)));
      barLength = ((breakTime/breakTimeSet) * 80).toString() + "%";
      $("#progressBar").css("width", barLength);
      
      if (breakTime === 0) {
        breakTime = breakTimeSet;
        running = 1;
        clearTimeout(breakChrono);
        audio.play();
        sessionRunning();
        return;
      }
      
      if (running === 0){
       clearTimeout(breakChrono);
     }
    }, 100);
}
