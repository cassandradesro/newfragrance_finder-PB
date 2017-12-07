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
    var field = document.querySelector('[type="radio"]');
    var error = validate.hasError(field);

    if (!error && index < quizQuestions.length) {
        loopThroughQuestions(index);
    }
};

btn.forEach(function (element, index){
  element.addEventListener("click", function(){
    goToNextQuestion(index);
  });
});

validate.init();

var myModal = new popUp({
    content: myContent,
    //overlay: false
});

triggerButton.addEventListener('click', function(){
    myModal.open();
});

