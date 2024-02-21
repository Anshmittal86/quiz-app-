const categoryEL = document.querySelector(".quiz-category span");
const questionEL = document.querySelector(".quiz-question");
const quizOptions = document.querySelector(".quiz-options");
const nextBtn = document.querySelector(".next-btn");
const modeBtn = document.querySelector(".mode");

async function loadQuestion() {
  try {
    const response = await fetch("https://opentdb.com/api.php?amount=10");
    const {
      results: [questionData],
    } = await response.json();
    showQuestion(questionData);
  } catch (error) {
    alert(`!Oops.. Error in fetching Quiz Data:  API is busy `);
    location.reload();
  }
}

nextBtn.addEventListener("click", function () {
  location.reload();
});


function showQuestion(data) {
  const { category, question, correct_answer, incorrect_answers } = data;
  const options = [correct_answer, ...incorrect_answers].sort(
    () => Math.random() - 0.5
  );

  categoryEL.textContent = category;
  questionEL.textContent = question;
  quizOptions.innerHTML = options
    .map((option) => `<div class="option"><p>${option}</p></div>`)
    .join("");

  quizOptions.addEventListener("click", (e) => {
    const isCorrect = e.target.textContent === correct_answer;
    e.target.classList.toggle("right-ans", isCorrect);
    e.target.classList.toggle("wrong-ans", !isCorrect);
  });
}

loadQuestion();
