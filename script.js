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
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlink and Text Markup Language",
      "Home Tool Markup Language"
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Which CSS property is used to change text color?",
    options: ["font-color", "text-color", "color", "background-color"],
    answer: "color",
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["String", "Number", "Boolean", "Character"],
    answer: "Character",
  },
  {
    question: "What is the purpose of React?",
    options: [
      "Database management",
      "Building user interfaces",
      "Server-side scripting",
      "Styling web pages"
    ],
    answer: "Building user interfaces",
  },
  {
    question: "Which hook is used to manage state in React?",
    options: ["useEffect", "useState", "useContext", "useRef"],
    answer: "useState",
  },
  {
    question: "Which HTTP method is used to send data to a server?",
    options: ["GET", "POST", "DELETE", "HEAD"],
    answer: "POST",
  },
  {
    question: "What does REST stand for?",
    options: [
      "Remote State Transfer",
      "Representational State Transfer",
      "Relational State Transfer",
      "Request State Transfer"
    ],
    answer: "Representational State Transfer",
  },
  {
    question: "Which framework is commonly used with Node.js?",
    options: ["Django", "Flask", "Express", "Laravel"],
    answer: "Express",
  },
  {
    question: "Which database is NoSQL?",
    options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
    answer: "MongoDB",
  },
  {
    question: "What is the default port number for a Node.js server?",
    options: ["3000", "80", "5000", "8080"],
    answer: "3000",
  },
  {
    question: "Which command is used to install packages in Node.js?",
    options: ["node install", "npm install", "npm start", "node start"],
    answer: "npm install",
  },
  {
    question: "What is middleware in Express?",
    options: [
      "A database",
      "A function that handles requests before response",
      "A frontend framework",
      "A routing method"
    ],
    answer: "A function that handles requests before response",
  },
  {
    question: "Which status code means 'Not Found'?",
    options: ["200", "301", "404", "500"],
    answer: "404",
  },
  {
    question: "What does CRUD stand for?",
    options: [
      "Create, Read, Update, Delete",
      "Copy, Run, Update, Deploy",
      "Create, Remove, Upload, Download",
      "Connect, Read, Use, Deploy"
    ],
    answer: "Create, Read, Update, Delete",
  },
  {
    question: "Which tool is used for version control?",
    options: ["Git", "NPM", "Docker", "Webpack"],
    answer: "Git",
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