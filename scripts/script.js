//loop through progress bbar
var progressBar = document.querySelector("#progress-bar"),
    progress = document.querySelectorAll(".step"),
    currentQuestion = 0,
    quizQuestions = document.querySelectorAll(".question"),
    btn = document.querySelectorAll(".btn");

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

    if (field.type === 'radio' && field.name) {
            var group = document.getElementsByName(field.name);
            if (group.length > 0) {
                for (var i = 0; i < group.length; i++) {
                    if (group[i].form !== field.form) continue; // Only check fields in current form
                    group[i].classList.add(localSettings.fieldClass);
                }
                field = group[group.length - 1];
            }
        };
    goToNextQuestion(index);
  });
});



