// const optionRadio = document.querySelector(".option input");
// const quizScoreDisplay = document.querySelector(
//   ".quiz-score .quiz-score-count"
// );
// const nextBtn = document.querySelector(".next-btn");

// const questionEL = document.querySelector(".quiz-question");
// const categoryEL = document.querySelector(".quiz-category span");

// async function loadQuestion() {
//   try {
//     const APIUrl = "https://opentdb.com/api.php?amount=10";
//     const result = await fetch(`${APIUrl}`);
//     const data = await result.json();
//     showQuestion(data.results[1]);
//   } catch (error) {
//     alert(`API call vifal ho gaya: ${error.message}`);
//     location.reload();
//   }
// }

// nextBtn.addEventListener("click", function () {
//   location.reload();
// });

// function showQuestion(data) {
//   let optionDisplay = document.querySelector(".quiz-options");
//   let category = data.category;
//   let question = data.question;
//   let correctAnswer = data.correct_answer;
//   let incorrectAnswer = data.incorrect_answers;
//   let optionsList = incorrectAnswer;

//   let randomPosition = Math.ceil(Math.random() * incorrectAnswer.length);

//   optionsList.splice(randomPosition, 0, correctAnswer);
//   categoryEL.innerHTML = category;
//   questionEL.innerHTML = question;
//   console.log(optionsList);
//   for (opt of optionsList) {
//     optionDisplay.innerHTML += `<div class="option">
//     <p>
//       ${opt}
//     </p>
//   </div>`;

//   let options = document.querySelectorAll(".option");
//   options.forEach((option) => {
//     option.addEventListener("click", function (e) {
//       let userChoice = e.target.innerText;
//       let userChoiceContainer = e.target;
//       if (userChoice == correctAnswer) {
//         userChoiceContainer.classList.add("right-ans");
//       } else {
//         userChoiceContainer.classList.add("wrong-ans");
//       }
//     });
//   });
//   }
// }


// loadQuestion();


const categoryEL = document.querySelector(".quiz-category span");
const questionEL = document.querySelector(".quiz-question");
const quizOptions = document.querySelector(".quiz-options");
const nextBtn = document.querySelector(".next-btn");

async function loadQuestion() {
  try {
    const response = await fetch("https://opentdb.com/api.php?amount=10");
    const { results: [questionData] } = await response.json();
    showQuestion(questionData);
  } catch (error) {
    alert(`API call failed: ${error.message}`);
    location.reload();
  }
}

nextBtn.addEventListener("click", function () {
  location.reload();
});

function showQuestion(data) {
  const { category, question, correct_answer, incorrect_answers } = data;
  const options = [correct_answer, ...incorrect_answers].sort(() => Math.random() - 0.5);

  categoryEL.textContent = category;
  questionEL.textContent = question;
  quizOptions.innerHTML = options.map((option) => `<div class="option">${option}</div>`).join("");

  quizOptions.addEventListener("click", (e) => {
    const isCorrect = e.target.textContent === correct_answer;
    e.target.classList.toggle("right-ans", isCorrect);
    e.target.classList.toggle("wrong-ans", !isCorrect);
  });
}

loadQuestion();
