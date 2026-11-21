const questions = [
  {
    prompt: "Who goes to the blind date in her friend's place?",
    answers: ["Shin Ha-ri", "Kang Tae-moo", "Cha Sung-hoon"],
    correctIndex: 0,
  },
  {
    prompt: "What is Kang Tae-moo's job?",
    answers: ["Chef", "Company CEO", "Teacher"],
    correctIndex: 1,
  },
  {
    prompt: "Who is Ha-ri's best friend?",
    answers: ["Jin Young-seo", "Kim Se-jeong", "Ahn Hyo-seop"],
    correctIndex: 0,
  },
];

const quizCard = document.querySelector("[data-drama-quiz-card]");
const quizProgress = document.querySelector("[data-drama-quiz-progress]");
const quizProgressBar = document.querySelector(".drama-quiz-progress");
const quizStep = document.querySelector("[data-drama-quiz-step]");
const quizQuestion = document.querySelector("[data-drama-quiz-question]");
const quizOptions = document.querySelector("[data-drama-quiz-options]");
const quizFeedback = document.querySelector("[data-drama-quiz-feedback]");
const quizNext = document.querySelector("[data-drama-quiz-next]");
const quizResult = document.querySelector("[data-drama-quiz-result]");
const quizScore = document.querySelector("[data-drama-quiz-score]");
const quizMessage = document.querySelector("[data-drama-quiz-message]");
const quizRestart = document.querySelector("[data-drama-quiz-restart]");

if (
  !quizCard || !quizProgress || !quizProgressBar || !quizStep || !quizQuestion
  || !quizOptions || !quizFeedback || !quizNext || !quizResult
  || !quizScore || !quizMessage || !quizRestart
) {
  throw new Error("The Business Proposal quiz is missing required elements.");
}

let currentQuestion = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  const question = questions[currentQuestion];
  answered = false;
  quizStep.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  quizQuestion.textContent = question.prompt;
  quizFeedback.textContent = "";
  quizOptions.replaceChildren();
  quizNext.disabled = true;
  quizNext.textContent = "Choose an answer";
  quizProgressBar.setAttribute("aria-valuenow", String(currentQuestion + 1));
  quizProgress.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

  question.answers.forEach((answer, answerIndex) => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "drama-quiz-option";
    option.textContent = answer;
    option.setAttribute("aria-pressed", "false");
    option.addEventListener("click", () => selectAnswer(answerIndex));
    quizOptions.append(option);
  });
}

function selectAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const question = questions[currentQuestion];
  const isCorrect = selectedIndex === question.correctIndex;
  if (isCorrect) score += 1;

  Array.from(quizOptions.children).forEach((option, index) => {
    option.disabled = true;
    option.setAttribute("aria-pressed", String(index === selectedIndex));
    if (index === question.correctIndex) option.classList.add("is-correct");
    if (index === selectedIndex && !isCorrect) option.classList.add("is-incorrect");
  });

  quizFeedback.textContent = isCorrect
    ? "That's right! ✨"
    : `Not quite—the answer is ${question.answers[question.correctIndex]}.`;
  quizNext.disabled = false;
  quizNext.textContent = currentQuestion === questions.length - 1
    ? "See my score"
    : "Next question";
}

quizNext.addEventListener("click", () => {
  if (!answered) return;
  if (currentQuestion < questions.length - 1) {
    currentQuestion += 1;
    renderQuestion();
    return;
  }

  quizCard.hidden = true;
  quizResult.hidden = false;
  quizScore.textContent = `You got ${score} out of ${questions.length}!`;
  quizMessage.textContent = score === questions.length
    ? "Perfect score! You know this rom-com well. 💕"
    : "Nice try! Now you know a little more about the story.";
});

quizRestart.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  quizCard.hidden = false;
  quizResult.hidden = true;
  renderQuestion();
});

renderQuestion();
