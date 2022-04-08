olEl = document.querySelector("ol");
clearbtn = document.querySelector("#clearbtn");

var createHighScore = function() {
    var liEl = document.createElement("li")
    
    if (localStorage.getItem("highscore") === null){
        liEl.textContent = "No current high score"
    } else {
        liEl.textContent = localStorage.getItem("initials") + ", " + localStorage.getItem("highscore") 
    }
    

    olEl.appendChild(liEl);
} 

var clearHighScore = function(event) {
    var liEl = document.querySelector("li");
    
    localStorage.clear();

    liEl.textContent = "No current high score"
    olEl.appendChild(liEl);
}

createHighScore();
clearbtn.addEventListener("click", clearHighScore);
