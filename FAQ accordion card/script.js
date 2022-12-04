let arrows = document.querySelectorAll(".arrow");
let index = null;
let lastArrow = null;
let lastQuestion = null;
let lastText = null;

function openQuestion() { 
    lastArrow.add('arrow-up');
    lastQuestion.remove('answer-closed');
    lastText.add('question-active');
}

function closeQuestion() {
    lastArrow.remove('arrow-up');
    lastQuestion.add('answer-closed');
    lastText.remove('question-active');
}

function extractElements(e) {
    lastArrow = e.target.classList;
    lastQuestion = e.target.parentNode.parentNode.nextSibling.nextSibling.classList;
    lastText = e.target.parentNode.previousSibling.previousSibling.classList;
}

window.addEventListener('resize', (e) => {
    console.log(window.innerWidth);
})

arrows.forEach((arrow, i) => {
    arrow.addEventListener('click', (e) => {        

        // No question was selected before 
        if(index === null) {
            index = i;
            extractElements(e);        
            openQuestion();

        // The same question was selected 
        } else if(index === i) {
            index = null;
            closeQuestion();

        // Another question was selected
        } else {
            closeQuestion();
            extractElements(e);
            openQuestion();
            index = i;
        }
    })
})


