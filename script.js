document.addEventListener("DOMContentLoaded", () => {
  let startPage = document.querySelector(".start-quiz");
  let startBtn = document.querySelector(".start-quiz h1");
  let quizContainer = document.querySelector(".quiz-container");
  let queContainer = document.querySelector(".question-container");
  let progress = document.querySelector(".progress");
  let queCompleted = document.querySelector(".que-completed h2");
  let next = document.querySelector(".next h2");
  let result = document.querySelector(".result");

  
  startBtn.addEventListener("click", () => {
    startPage.classList.add("none");
    
    quizContainer.classList.remove("none");
  });
  
  const questions = [
    {
      question: "What is the value of (a - b)²?",
      options: ["a² + b²", "a² - 2ab + b²", "a² + 2ab + b²", "2a - 2b"],
    answer: "a² - 2ab + b²",
  },
  {
    question: "What is the formula for the volume of a cube?",
    options: ["l x b x h", "s³", "πr²h", "2(l + b)"],
    answer: "s³",
  },
  {
    question: "What is the solution of the linear equation 2x + 3 = 7?",
    options: ["x = 1", "x = 2", "x = 3", "x = 4"],
    answer: "x = 2",
  },
  {
    question: "Which of the following is a rational number?",
    options: ["√2", "π", "1/3", "e"],
    answer: "1/3",
  },
  {
    question: "What is the value of (x + 3)(x - 3)?",
    options: ["x² - 9", "x² + 9", "x² + 6x + 9", "x² - 6x + 9"],
    answer: "x² - 9",
  },
  {
    question: "What is the area of a triangle with base 10 cm and height 5 cm?",
    options: ["50 cm²", "25 cm²", "30 cm²", "60 cm²"],
    answer: "25 cm²",
  },
  {
    question: "The value of x in the equation x/5 = 3 is:",
    options: ["x = 8", "x = 10", "x = 15", "x = 20"],
    answer: "x = 15",
  },
  {
    question: "What is the sum of the angles of a triangle?",
    options: ["90°", "180°", "270°", "360°"],
    answer: "180°",
  },
  {
    question: "Which of the following is a perfect square?",
    options: ["48", "64", "50", "70"],
    answer: "64",
  },
  {
    question: "What is the value of (2x + 3)(2x - 3)?",
    options: ["4x² + 9", "4x² - 9", "4x² + 6x - 9", "4x² - 6x + 9"],
    answer: "4x² - 9",
  }
];



let queLen = Object.keys(questions).length;
progress.style.width = `${(1*100)/queLen}%`;

queCompleted.innerText = `1/${queLen}`

let score = 0;
  let userAnswers = [];
  
  function addQuestion(index) {
    queContainer.innerHTML = `
        <h1>
          Q.${index + 1}. ${questions[index].question}
        </h1>
        <div class="options">
          <div class="option-container">
            <input id="in1" type="radio" name="option" value="${
              questions[index].options[0]
            }"/>
            <label for="in1">${questions[index].options[0]}</label>
          </div>
          <div class="option-container">
            <input id="in2" type="radio" name="option" value="${
              questions[index].options[1]
            }" />
            <label for="in2">${questions[index].options[1]}</label>
          </div>
          <div class="option-container">
            <input id="in3" type="radio" name="option" value="${
              questions[index].options[2]
            }" /> 
            <label for="in3">${questions[index].options[2]}</label>
          </div>
          <div class="option-container">
          <input id="in4" type="radio" name="option" value="${
            questions[index].options[3]
            }"/> 
            <label for="in4">${questions[index].options[3]}</label>
          </div>
        </div>
    `;

    submit(index);
    
    checkAns(index);
    isAnswered = false;
  }
  
  function checkAns(index) {
    let inputs = document.querySelectorAll("input[name='option']");

    let isAnswered = false;

    inputs.forEach((input) => {
      input.addEventListener("change", () => {
        if (isAnswered) {
          return;
        } else {
          isAnswered = true;
        }
        inputs.forEach((btn) => {
          if (btn !== input) {
            btn.disabled = true;
          }
        });

        let selectedValue = input.value;
        let correctAns = questions[index].answer;
        userAnswers.push(selectedValue);
        console.log(userAnswers);
        if (selectedValue == correctAns) {
          let parent = input.parentElement;
          parent.style.backgroundColor = "rgb(17, 194, 17)";
          score++;
          console.log(score);
        } else {
          let parent = input.parentElement;
          parent.style.backgroundColor = "rgb(255, 39, 39)";
        }
      });
    });
  }

  let options = document.querySelector(".options");
  let optionContainer = document.querySelectorAll(".option-container");

  console.log(options);

  function changeProgress() {
    queCompleted.innerHTML = `
    ${noQue}/${queLen}
    `;

    progress.style.width = `${(noQue * 100) / queLen}%`;
  }

  let index = 0;
  let noQue = 1;

  addQuestion(index);

  if (index < queLen - 1) {
    next.addEventListener("click", () => {
      index++;
      noQue++;
      addQuestion(index);
      changeProgress();
    });
  }

  let userAns = [];
  
    function submit(currindex) {
      if (currindex == queLen-1) {
        next.innerText = "Submit";
        next.addEventListener("click", () => {
          quizContainer.classList.add("none");
          result.classList.remove("none");
          showResult();
        });
      }
    }
  
  function showResult() {
    let resultBox = document.querySelector(".result h1");
    resultBox.innerHTML = `Your Score = ${score}`;
    for (let index = 0; index < queLen; index++) {
    showAnswers(index);
    }
    
  }
  // showResult();
  
  function showAnswers(index) {
      let answers = document.querySelector(".answers");
      let createdDiv = document.createElement("div");
      createdDiv.classList.add("created-div")
      createdDiv.innerHTML = 
      `
      <h1>
      Q.${index + 1}. ${questions[index].question}
      </h1>
      <p1>Correct Answer : ${questions[index].answer}</p1><br>
      <p2>Your Answer : ${userAnswers[index]}</p2>
      `;
      answers.appendChild(createdDiv);
  }
});