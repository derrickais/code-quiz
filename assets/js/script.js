var mainEl = document.querySelector("main");
var buttonEl = document.querySelector("button");
var ulEl = document.querySelector("ul");
var h3El = document.createElement("h3");
var h1El = document.querySelector("h1");
var pEl = document.querySelector("p");
var timerEl = document.querySelector(".timer");


var questionNum = 0;
var timeLeft = 75;
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
    tAnswer :  "curly brackets"
}];

var startQuiz = function(event){
    
    //changes h1 into question
    h1El.textContent = qAndA[questionNum].question;
    
    //removes <p>
    pEl.textContent = "";
    
    //creates <li> for each answer
    for(i = 0; i < 4; i++){
        var liEl = document.createElement("li");
        liEl.textContent = qAndA[questionNum].answers[i];
        ulEl.appendChild(liEl);
    }

    //remove start quiz button
    buttonEl.remove()
}

var checkAnswer = function(event){
    console.log(event.target.textContent);
    
    //checks to see if user clicked right answer 
    if (event.target.textContent == qAndA[questionNum].tAnswer){
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

    ulEl.textContent = "";
    questionNum ++;
    
    //checks if there's another question before going to endQuiz()
    if (questionNum == qAndA.length){
        endQuiz();
    }else{
        startQuiz();  
    }
}

var endQuiz = function(){
    h1El.textContent = "All done";
    pEl.textContent = "Your final score is";
    ulEl.textContent = "";

}
//creates a timer that counts down from 75
var timer = function(event){
    
    timerEl.textContent = "Timer: " + timeLeft;

    var timeInterval = setInterval(function() {
        if (timeLeft > 0){
            timeLeft --;
            timerEl.textContent = "Timer: " + timeLeft;
        } else {
            clearInterval(timeInterval);
            endQuiz();
        }
    }, 1000);
    
}

//runs check answer function when user clicks in the <ul>
ulEl.addEventListener("click", checkAnswer);
buttonEl.addEventListener("click", startQuiz);
buttonEl.addEventListener("click", timer);

