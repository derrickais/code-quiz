//creates variables 
var olEl = document.querySelector("ol");
var clearbtn = document.querySelector("#clearbtn");

//displays high score as a list element 
var createHighScore = function() {
    var liEl = document.createElement("li");
    
    if (localStorage.getItem("highscore") === null){
        liEl.textContent = "No current high score";
    } else {
        liEl.textContent = localStorage.getItem("initials") + ", " + localStorage.getItem("highscore");
    }
    

    olEl.appendChild(liEl);
};

//allows clear high score button to clear local storage 
var clearHighScore = function() {
    var liEl = document.querySelector("li");
    
    localStorage.clear();

    liEl.textContent = "No current high score";
    olEl.appendChild(liEl);
};


createHighScore();
clearbtn.addEventListener("click", clearHighScore);
