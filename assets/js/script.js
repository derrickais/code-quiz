var mainEl = document.querySelector("main");
var buttonEl = document.querySelector("button");
var olEl = document.querySelector("ol");
var h1El = document.querySelector("h1");
var pEl = document.querySelector("p");
var timerEl = document.querySelector(".timer");

var h3El = document.createElement("h3");

var questionNum = 0;
var timeLeft = 75;
var timeInterval;
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

var checkAnswer = function(event){
    console.log(event.target.textContent);
    
    answer = event.target.textContent.includes(qAndA[questionNum].tAnswer)
    //checks to see if user clicked right answer 
    if (answer){
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
    
    //checks if there's another question before going to endQuiz()
    if (questionNum == qAndA.length){
        endQuiz();
    }else{
        startQuiz();  
    }
}

var endQuiz = function(){
    clearInterval(timeInterval);
    timerEl.textContent = "Timer: " + timeLeft;

    h1El.textContent = "All done";
    pEl.textContent = "Your final score is " + timeLeft;
    olEl.textContent = "";
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

