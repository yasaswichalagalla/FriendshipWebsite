const photoDialog = document.querySelector(".bts-lightbox");
const photoDialogImage = document.querySelector(".bts-lightbox-image");
const photoDialogCaption = document.querySelector(".bts-lightbox-caption");
const photoDialogClose = document.querySelector(".bts-lightbox-close");

if (!photoDialog || !photoDialogImage || !photoDialogCaption || !photoDialogClose) {
  throw new Error("The BTS photo viewer is missing required elements.");
}

document.querySelectorAll(".bts-photo-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const image = trigger.querySelector("img");
    const caption = trigger.closest("figure").querySelector("figcaption > span");
    photoDialogImage.src = image.currentSrc || image.src;
    photoDialogImage.alt = image.alt;
    photoDialogCaption.textContent = caption.textContent;
    photoDialog.showModal();
  });
});

photoDialogClose.addEventListener("click", () => photoDialog.close());
photoDialog.addEventListener("click", (event) => {
  if (event.target === photoDialog) photoDialog.close();
});

const questions = [
  {
    prompt: "How many members are there in BTS?",
    answers: ["Seven", "Five", "Ten"],
    correctIndex: 0,
  },
  {
    prompt: "What is V's real name?",
    answers: ["Jimin", "Kim Taehyung", "Jung Kook"],
    correctIndex: 1,
  },
  {
    prompt: "What is the name of BTS's fan community?",
    answers: ["ARMY", "Stars", "Purple Hearts"],
    correctIndex: 0,
  },
];

const quizCard = document.querySelector("[data-quiz-card]");
const quizProgress = document.querySelector("[data-quiz-progress]");
const quizProgressBar = document.querySelector(".bts-quiz-progress");
const quizStep = document.querySelector("[data-quiz-step]");
const quizQuestion = document.querySelector("[data-quiz-question]");
const quizOptions = document.querySelector("[data-quiz-options]");
const quizFeedback = document.querySelector("[data-quiz-feedback]");
const quizNext = document.querySelector("[data-quiz-next]");
const quizResult = document.querySelector("[data-quiz-result]");
const quizScore = document.querySelector("[data-quiz-score]");
const quizMessage = document.querySelector("[data-quiz-message]");
const quizRestart = document.querySelector("[data-quiz-restart]");

if (
  !quizCard || !quizProgress || !quizProgressBar || !quizStep || !quizQuestion
  || !quizOptions || !quizFeedback || !quizNext || !quizResult
  || !quizScore || !quizMessage || !quizRestart
) {
  throw new Error("The BTS quiz is missing required elements.");
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
    option.className = "bts-quiz-option";
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
    ? "That's right! 💜"
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
    ? "Perfect score! You know your BTS facts. 💜"
    : "Nice try! Now you know a little more about BTS and V.";
});

quizRestart.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  quizCard.hidden = false;
  quizResult.hidden = true;
  renderQuestion();
});

renderQuestion();
