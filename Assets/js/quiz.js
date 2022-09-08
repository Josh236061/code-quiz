// Questions will be asked
console.log("Script loaded!");
var score = 0;
var numQuestions = 3;
const Questions = [{
    id: 0,
    q: "Javascript is which kind of language?",
    a: [{ text: "Object-Oriented", isCorrect: true },
        { text: "Object-Based", isCorrect: false },
        { text: "Procedural", isCorrect: true },
        { text: "None of the options", isCorrect: false }
    ]

},
{
    id: 1,
    q: "Which of the following keywords is used to define a variable in Javascript?",
    a: [{ text: "var", isCorrect: false, isSelected: false },
        { text: "let", isCorrect: false },
        { text: "Both of the options", isCorrect: true },
        { text: "None of the options", isCorrect: true }
    ]

},
{
    id: 2,
    q: "Upon encountering empty statements, what does the Javascript Interpreter do?",
    a: [{ text: "Throws an error", isCorrect: false },
        { text: "Ignores the statements", isCorrect: true },
        { text: "Gives a warning", isCorrect: true },
        { text: "None of the above", isCorrect: false }
    ]

}

]

// Set start
var start = true;
const startButton = document.getElementById("start-quiz");
const questionsDiv= document.getElementById("questions-div");
const timer = document.getElementById("time");
const scoreDiv = document.getElementById("score");
const highScoreDiv = document.getElementById("high-score");
highScoreDiv.innerHTML = `High Score: ${highScore(0)}`;
// Getting the result display section
var result = document.getElementsByClassName("result");
result[0].innerText = "";

console.log(startButton);
console.log(questionsDiv);
var time = 300;
var hasStarted = false;
var timerId = -1;
startButton.addEventListener("click" , function() {
    if(!hasStarted){
        time = 300;
        iterate("0");
        hasStarted = true;
        timer.innerHTML = `Time Left: ${time} seconds`;
    console.log("Start button is clicked");
    startButton.innerHTML = "End Quiz!";
    questionsDiv.style.display = "block";
    timerId = setInterval(() => {
        if(time==0){
            stopQuiz();
        }
        timer.innerHTML = `Time Left: ${time} seconds`;
        time = time - 1;
    },
    1000
    )
}
else{
    time = 0;
    result[0].innerText = "";
    timer.innerHTML = `Time Left: ${time} seconds`;
    hasStarted = false;
    highScoreDiv.innerHTML = `High Score: ${highScore(0)}`;
    clearInterval(timerId);
    startButton.innerHTML = "Start Quiz!";
    questionsDiv.style.display = "none";
}
});

function showForm(){

    form = document.getElementById("name-form");
    form.style.display = "block";
    questionsDiv.style.display = "none";
    nameButton = document.getElementById("name-button");
    nameButton.addEventListener("click",() => {
            nameInput = document.getElementById("name");
            var finName = nameInput.innerText;
            stopQuiz();
    }); 
}

// function for highscore value(s)

function highScore(score) {
    var saved = 0;
    try { saved = parseFloat(localStorage.highScore); } catch (e) { saved = 0; }
    if (!(typeof score === 'undefined')) {
       try { score = parseFloat(score); } catch (e) { score = 0; }
       if (score>saved) {
         saved = score;
         localStorage.highScore = '' + score;
       }
    }
    if (isNaN(saved)) {
       saved = 0;
       localStorage.highScore = '0';
    }
    console.log("HUaa");
    return saved;
 }

 // results function for once Quiz ends
function stopQuiz(){
    highScore(score);
    time = 0;
    score = 0;
    result[0].innerText = "";
    timer.innerHTML = `Time Left: ${time} seconds`;
    hasStarted = false;
    clearInterval(timerId);
    startButton.innerHTML = "Start Quiz!";
    questionsDiv.style.display = "none";
    location.reload();
}
// Iterate
function iterate(id) {


// Getting the question
const question = document.getElementById("question");


// Setting the question text
question.innerText = Questions[id].q;

// Getting the options
const op1 = document.getElementById('op1');
const op2 = document.getElementById('op2');
const op3 = document.getElementById('op3');
const op4 = document.getElementById('op4');
op1.style.backgroundColor = "lightskyblue";
op2.style.backgroundColor = "lightskyblue";
op3.style.backgroundColor = "lightskyblue";
op4.style.backgroundColor = "lightskyblue";

// Providing option text
op1.innerText = Questions[id].a[0].text;
op2.innerText = Questions[id].a[1].text;
op3.innerText = Questions[id].a[2].text;
op4.innerText = Questions[id].a[3].text;

// Providing the true or false value to the options
op1.value = Questions[id].a[0].isCorrect;
op2.value = Questions[id].a[1].isCorrect;
op3.value = Questions[id].a[2].isCorrect;
op4.value = Questions[id].a[3].isCorrect;

var selected = "";

// Show selection for op1
op1.addEventListener("click", () => {
    op1.style.backgroundColor = "lightgoldenrodyellow";
    op2.style.backgroundColor = "lightskyblue";
    op3.style.backgroundColor = "lightskyblue";
    op4.style.backgroundColor = "lightskyblue";
    selected = op1.value;
})

// Show selection for op2
op2.addEventListener("click", () => {
    op1.style.backgroundColor = "lightskyblue";
    op2.style.backgroundColor = "lightgoldenrodyellow";
    op3.style.backgroundColor = "lightskyblue";
    op4.style.backgroundColor = "lightskyblue";
    selected = op2.value;
})

// Show selection for op3
op3.addEventListener("click", () => {
    op1.style.backgroundColor = "lightskyblue";
    op2.style.backgroundColor = "lightskyblue";
    op3.style.backgroundColor = "lightgoldenrodyellow";
    op4.style.backgroundColor = "lightskyblue";
    selected = op3.value;
})

// Show selection for op4
op4.addEventListener("click", () => {
    op1.style.backgroundColor = "lightskyblue";
    op2.style.backgroundColor = "lightskyblue";
    op3.style.backgroundColor = "lightskyblue";
    op4.style.backgroundColor = "lightgoldenrodyellow";
    selected = op4.value;
})


// Grabbing the evaluate button
const evaluate = document.getElementsByClassName("evaluate");
result[0].innerText = "";
var isEvaluate = false;

// Evaluate method
evaluate[0].addEventListener("click", () => {
    if(!isEvaluate){
        evaluate[0].innerHTML = "Next Problem";
    if (selected == "true") {
        result[0].innerHTML = "Correct";
        result[0].style.color = "green";
        score = score + 50;
        scoreDiv.innerHTML = `Current score = ${score}`;
    } else {
        result[0].innerHTML = "Wrong";
        result[0].style.color = "red";
        time -= 50;
    }
    isEvaluate = true;
}
else{
    start = false;
    evaluate[0].innerHTML = "Evaluate";
    selected = "";
if (id < 2) {
    id++;
    
    iterate(id);
    console.log(id);
    isEvaluate = false;
}
else{
    
    showForm();
}
}

})
}
