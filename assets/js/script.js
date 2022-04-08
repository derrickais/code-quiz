var mainEl = document.querySelector("main");
var buttonEl = document.querySelector("button");
var olEl = document.querySelector("ol");
var h1El = document.querySelector("h1");
var pEl = document.querySelector("p");
var timerEl = document.querySelector(".timer");
var divEl = document.querySelector("div");

var h3El = document.createElement("h3");

var questionNum = 0;
var timeLeft = 75;
var time = 2;
var timeInterval;
var bannerTime;
var qAndA = [{
    question : "Commonly used data types do NOT include:",
    answers : ["strings", "booleans", "alerts", "numbers"],
    tAnswer :  "alerts"
}, {
    question : "The condition in an if/else statement is enclosed with __________",
    answers : ["quotes", "curly brackets", "parenthesis", "square brackets"],
    tAnswer :  "parenthesis"
}, {
    question : "Arrays in JavaScript can be used to store ____________",
    answers : ["numbers and strings", "other arrays", "booleans", "all of the above"],
    tAnswer :  "all of the above"
}, {
    question : "Strings values must be enclosed within ___________ when being assigned variables",
    answers : ["commas", "curly brackets", "quotes", "parenthesis"],
    tAnswer :  "quotes"
}, {
    question : "A very useful tool used during development and debugging for printing content to the debugger is",
    answers : ["JavaScript", "terminal/bash", "for loops", "console.log"],
    tAnswer :  "console.log"
}];

var startQuiz = function(event){
    
    //changes h1 into question
    h1El.textContent = qAndA[questionNum].question;
    
    //removes <p>
    pEl.textContent = "";
    
    //creates <li> for each answer
    for(i = 0; i < 4; i++){
        var liEl = document.createElement("li");
        liEl.textContent = i+1 + ". " + qAndA[questionNum].answers[i];
        olEl.appendChild(liEl);
    }

    //remove start quiz button
    buttonEl.remove()
}

//removes h3 after 5 seconds 
var bottomBanner = function(){
    h3El.style.display = "block";

    bannerTime = setInterval(function() {
        if (time > 0){
            time--;
            console.log(time);
        } else if (time == 0) {
            h3El.style.display = "none";
            mainEl.appendChild(h3El);
            time = 2;
            clearInterval(bannerTime);
        }
        
    }, 1000);
}


var checkAnswer = function(event){
    clearInterval(bannerTime);
    answer = event.target;

    correct = answer.textContent.includes(qAndA[questionNum].tAnswer)
    //checks to see if user clicked right answer 
    if (answer.localName === "ol"){
        return;
    }

    if (correct){
        h3El.textContent = "Correct!"
    }else{
        h3El.textContent = "Wrong!"
        //subtract 10 points from timer 
        if (timeLeft > 10){
            timeLeft -= 10;
        } else {
            timeLeft = 0;
            timerEl.textContent = "Timer: 0";
        }
    }
    mainEl.appendChild(h3El);

    olEl.textContent = "";
    questionNum ++;

    bottomBanner();
    
    
    //checks if there's another question before going to endQuiz()
    if (questionNum == qAndA.length){
        endQuiz();
    }else{
        startQuiz();  
    }
}

//ends quiz and gives player high score 
var endQuiz = function(event){
    
    clearInterval(timeInterval);
    timerEl.textContent = "Timer: " + timeLeft;

    h1El.textContent = "All done";
    pEl.textContent = "Your final score is " + timeLeft;
    olEl.remove();
    var h4El = document.createElement("h4");

    mainEl.setAttribute("class", "enterHS");

    divEl.innerHTML = "<form> <label for 'initials'>Enter Initials:</label> <input type='text' id='initial' name='initial' maxlength = '3'> <input type='submit' id='submit' value='Submit'></form>"
 
    
    divEl.addEventListener("submit", highScore);
}

var highScore = function(event) {
    event.preventDefault();

    var formEl = document.querySelector("form");
    var inputEl = document.querySelector("#initial");

    initials = inputEl.value;

    var hS = localStorage.getItem("highscore")

    if (hS === null){
        highScore = 0;
    }
    
    if (timeLeft > hS){
        localStorage.setItem("highscore", timeLeft)
        localStorage.setItem("initials", initials);
    }

    formEl.textContent = "";
    var buttonEl = document.createElement("button");
    buttonEl.textContent = "Play Again";

    mainEl.appendChild(buttonEl);

    buttonEl.addEventListener("click", function(){
        location.reload();
    })
}

//creates a timer that counts down from 75
var timer = function(event){
    
    timerEl.textContent = "Timer: " + timeLeft;

    timeInterval = setInterval(function() {
        if (timeLeft > 0){
            timeLeft --;
            timerEl.textContent = "Timer: " + timeLeft;
        } else if (timeLeft == 0) {
            endQuiz();
        }
    }, 1000);
    
}

//runs check answer function when user clicks in the <ol>
olEl.addEventListener("click", checkAnswer);
buttonEl.addEventListener("click", startQuiz);
buttonEl.addEventListener("click", timer);

