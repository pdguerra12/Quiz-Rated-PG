// initial variables for script
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionContainer = document.getElementById("question-container");
var questionElement = document.getElementById('question');
var answerButtons = document.getElementById("answer-btns");
// questions and answers for quiz
var questions = [
    {
        question: "The condition in an if/else statement is enclosed with _______.",
        answers: [
            { text: "1. quotes", correct: false },
            { text: "2. curly brackets", correct: false },
            { text: "3. parenthesis", correct: true },
            { text: "4. square brackets", correct: false }
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store ______.",
        answers: [
            { text: "1. numbers and strings", correct: false },
            { text: "2. other arrays", correct: false },
            { text: "3. booleans", correct: false },
            { text: "4. all of the above", correct: true }
        ]
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        answers: [
            { text: "1. commas", correct: false },
            { text: "2. curly brackets", correct: false },
            { text: "3. quotes", correct: true },
            { text: "4. parenthesis", correct: false }
        ]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            { text: "1. JavaScript", correct: false },
            { text: "2. terminal/bash", correct: false },
            { text: "3. for loops", correct: false },
            { text: "4. console.log", correct: true }
        ]
    }
];
// variables for every time the user takes this quiz, the questions shuffle.
let shuffledQuestions, currentQuestion;

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
    currentQuestion++;
    setNextQuestion();
})
// starting the quiz
function startQuiz() {
    startButton.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestion = 0;
    questionContainer.classList.remove("hide");
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestion]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    };
}
// selecting answers for the questions
function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestion + 1) {
        nextButton.classList.remove("hide");
    } else {
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
    };
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("incorrect");
    };
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("incorrect");
};