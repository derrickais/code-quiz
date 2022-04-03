var mainEl = document.querySelector("main");
var buttonEl = document.querySelector("button");

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
    var h1El = document.querySelector("h1");
    h1El.textContent = qAndA[1].question;
    
    //removes <p>
    var pEl = document.querySelector("p");
    pEl.remove();
    
    //creates <li> for each answer
    var ulEl = document.querySelector("ul");
    for(i = 0; i < 4; i++){
        var liEl = document.createElement("li");
        liEl.textContent = qAndA[1].answers[i];
        ulEl.appendChild(liEl);
    }

    //remove start quiz button
    buttonEl.remove()

    ulEl.addEventListener("click", checkAnswer);
}

var checkAnswer = function(event){
    console.log(event.target.textContent);
    if (event.target.textContent == qAndA[1].tAnswer){
        alert("woo");
    }else{
        alert("boo");
    }
}



buttonEl.addEventListener("click", startQuiz);

