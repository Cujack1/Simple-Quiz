// Buttons
const startBtn = document.querySelector(".start-btn");
const nextBtn = document.querySelector(".quiz-body__next");
const previousBtn = document.querySelector(".quiz-body__previous");

// Question and Answer
const questions = document.getElementById("question");
const answersUL = document.getElementById("answers");
const answer1 = document.querySelector(".l1");
const answer2 = document.querySelector(".l2");
const answer3 = document.querySelector(".l3");
const answer4 = document.querySelector(".l4");

// Question Database
// Correct answers are always index[0] in 'answers[]' array.
const questionDatabase = [
  {
    id: 0,
    $question:
      "Guitar Anatomy: Where on the guitar do you place your hands to play notes?",
    answers: [
      { true: "Neck/Fretboard" },
      { false: "Body" },
      { false: "The Cutaway" },
      { false: "Anywhere" },
    ],
    message:
      "While it is true that you can hit or play anywhere on the guitar to make sounds, the neck is where the primary section of the guitar for producing notes. Sometimes you are using the guitar as a percussive instruemnt, sometimes you are plucking other sections of the string to produce interesting sounds. But the neck is the main place for playing notes.",
  },
  {
    id: 1,
    $question: "What do most guitars use to adjust tuning on the strings?",
    answers: [
      { true: "Tuning Knobs" },
      { false: "Floating Bridge" },
      { false: "String Bend" },
      { false: "Adjust Action" },
    ],
    message:
      "While most floating bridges do have 'fine-tuners' on them, most guitars do not have floating bridges. Most guitars just use the tuning knobs on the headstock to adjust to whatever tuning the player wants. For guitars with floating bridges: These guitars usually also have tuning locks at the end of the fretboard, right before the headstock, that prevent the guitar from coming out of tune. Therefore, any small tuning issue due to your strings stretching can be fixed with the fine-tuners on the bridge, versus a normal guitar which goes out of tune because a string moves around in the tuning knob. Tuning locks prevent a string from moving around in the tuning knob.",
  },
  {
    id: 100,
    $question: "",
    answers: [{ true: "" }, { false: "" }, { false: "" }, { false: "" }],
    message: "",
  },
];

// Some Helpful Variables
let answerOrder = [];
let select1;
let select2;
let select3;
let select4;

let checkAnswerOrder = [];
let alreadyAsked = [];
let randomID;
let chosenQuestion;
let selections;
let selectionsLength;
const clickable = document.querySelectorAll(".clickable");

// =============================================================================================

// Initialization of the Quiz
startBtn.addEventListener("click", start);
function start() {
  // 1. Hide the start button to signify the beginning of the Quiz
  startBtn.classList.add("fade-away");

  getQuestions();
}

async function getQuestions() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve((randomID = 0));
      //   resolve((randomID = Math.floor(Math.random() * 5 + 1)));
    }, 500);
  });

  randomizeAnswers();
}

function randomizeAnswers() {
  // Generate a number between 0 - 3, check if that number is already in 'answerOrder[]', if it's not, then add it.
  for (i = 0; answerOrder.length < 4; i++) {
    let someNumber = Math.floor(Math.random() * 4);
    console.log("some number: ", someNumber);
    if (answerOrder.includes(someNumber)) {
      someNumber = 0;
    } else answerOrder.push(someNumber);
  }
  console.log("answer order: ", answerOrder);

  select1 = answerOrder[0];
  select2 = answerOrder[1];
  select3 = answerOrder[2];
  select4 = answerOrder[3];

  // Now that there is a random order of answers, populate those answers to the DOM
  populateQuestionAndAnswerHTML();
}

function populateQuestionAndAnswerHTML() {
  // Define variables for flexibility
  chosenQuestion = questionDatabase[0];
  selections = chosenQuestion.answers;
  selectionsLength = chosenQuestion.answers.length;

  // Populate the question
  questions.innerHTML = chosenQuestion.$question;

  console.log("selections: ", selections);
  console.log("@ '0': ", answerOrder[0]);

  // Populate answers in HTML as unordered list.
  for (key of selections) {
    console.log(chosenQuestion.answers[0]);

    answer1.innerHTML = selections[select1];
    answer1.addEventListener("click", checkAnswer);
    answer1.classList.add("clickable");

    answer2.innerHTML = selections[select2];
    answer2.addEventListener("click", checkAnswer);
    answer2.classList.add("clickable");

    answer3.innerHTML = selections[select3];
    answer3.addEventListener("click", checkAnswer);
    answer3.classList.add("clickable");

    answer4.innerHTML = selections[select4];
    answer4.addEventListener("click", checkAnswer);
    answer4.classList.add("clickable");
  }
}

function checkAnswer() {
  // Remove event listeners and clickability from list items
  clickable.forEach((li) => {
    li.removeEventListener("click", checkAnswer);
    li.classList.remove("clickable");
  });

  // Check if the selected answer is correct - display message accordingly
  for (key in selections[0]) {
    if (this.innerHTML === selections[0][key]) {
      console.log("good Job!");
      this.classList.add("correct");
    } else {
      console.log(chosenQuestion.message);
      this.classList.add("incorrect");
    }
  }
  nextOrPrevious();
}

function nextOrPrevious() {
  console.log("next previous is called");
  nextBtn.addEventListener("click", next);
  previousBtn.addEventListener("click", previous);
}

function next() {
  console.log("someone clicked NEXT... Must've been me! ");
  nextBtn.removeEventListener("click", next);
  previousBtn.removeEventListener("click", previous);
  getQuestions();
}

function previous() {
  console.log("someone clicked PREVIOUS... Must've been me! ");
}
