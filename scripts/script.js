//loop through progress bbar
var progressBar = document.querySelector("#progress-bar"),
    progress = document.querySelectorAll(".step"),
    currentQuestion = 0,
    quizQuestions = document.querySelectorAll(".question"),
    btn = document.querySelectorAll(".btn");
    myContent = document.getElementById('content');
    triggerButton = document.getElementById('trigger');



var loopThroughQuestions = function() {
    currentQuestion++;

    progress.forEach(function(element,index) {
        if (index == currentQuestion) {
            element.classList.add('active-step');
        } else {
            element.classList.remove('active-step');
        }
    })

    quizQuestions.forEach(function(element, index) {
        if (index == currentQuestion){
            element.classList.add('active-question');
        } else{
            element.classList.remove('active-question');
        }
    })

};

var goToNextQuestion = function(index){
    if (index < quizQuestions.length){
        loopThroughQuestions(index);
    }
};

btn.forEach(function (element, index){
  element.addEventListener("click", function(){
    // Add Validation here, if the validation passes
    // _this is the button
    // then run goToNextQuestion()

    goToNextQuestion(index);
  });
});


var myModal = new popUp({
    content: myContent,
    //overlay: false
});


triggerButton.addEventListener('click', function(){
    myModal.open();
});

