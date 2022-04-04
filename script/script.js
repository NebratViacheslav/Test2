const DATA = [
  {
    question: 'Вопрос 1',
    answers: [
      {
        id: 1,
        value: 'Ответ 1',
        correct: true
      },
      {
        id: 2,
        value: 'Ответ 2',
        correct: false
      },
      {
        id: 3,
        value: 'Ответ 3',
        correct: false
      }
    ]
  },

  {
    question: 'Вопрос 2',
    answers: [
      {
        id: 4,
        value: 'Ответ 1',
        correct: true
      },
      {
        id: 5,
        value: 'Ответ 2',
        correct: false
      },
      {
        id: 6,
        value: 'Ответ 3',
        correct: false
      }
    ]
  }
];

let result = {};

const quiz = document.getElementById('quiz');
const questions = document.getElementById('questions');
const indicator = document.getElementById('indicator');
const results = document.getElementById('results');
const buttonNext = document.getElementById('button-next');
const buttonRestart = document.getElementById('button-restart');

const renderQuestions = (index) => {

  renderIndicator(index+1);
  questions.dataset.currentStep = index;

  const renderAnswers = () => DATA[index].answers
    .map((answer) => `
      <li>
        <label>
          <input class="answer-input" type="radio" name=${index} value=${answer.id}>
          ${answer.value}
        </label>
      </li>
      `)
    .join('');
    
  questions.innerHTML = `
    <div class="quiz-questions-item">
      <div class="quiz-questions-item__question">${DATA[index].question}</div>
      <ul class="quiz-questions-item__answers">${renderAnswers()}</ul>
    </div>
  `;
};

const renderResults = () => {
  let content = '';

  const getClassname = (answer, questionIndex) => {
    let classname = '';

    if (!answer.correct && answer.id === Number(result[questionIndex])) {
      classname = 'answer--invalid';
    } else if (answer.correct) {
      classname = 'answer--valid';
    }

    return classname;
  };

  const getAnswers = (questionIndex) => DATA [questionIndex].answers
  .map((answer) => `<li class= ${getClassname(answer, questionIndex)}> ${answer.value}</li>`)
  .join('');
  
  DATA.forEach((question, index) => {

    content += `
      <div class="quiz-results-item">
        <div class="quiz-results-item__question">${question.question}</div>
        <ul class="quiz-results-item__answers">${getAnswers(index)}</ul>
      </div>
    `;
  });

  results.innerHTML = content;
};

const renderIndicator = (currentStep) => {
  indicator.innerHTML = `
  ${currentStep}/${DATA.length}`
};

quiz.addEventListener('change', (event) => {
  if (event.target.classList.contains('answer-input')){
    console.log('Input');
    result [event.target.name] = event.target.value;
    buttonNext.disabled = false;
    console.log(result);
  }
});

quiz.addEventListener('click', (event) => {
if (event.target.classList.contains('button-next')){
  buttonNext.disabled = true;
  const nextQuestionIndex = Number(questions.dataset.currentStep) + 1;
  
  if (DATA.length === nextQuestionIndex){
    questions.classList.add('questions--hidden');
    indicator.classList.add('indicator--hidden');
    results.classList.add('indicator--visible');
    buttonNext.classList.add('button-next--hidden');
    buttonRestart.classList.add('button-resturt--visible');
    renderResults();
  } else {
    renderQuestions(nextQuestionIndex);
  }

}
if (event.target.classList.contains('button-restart')){
  result = {};
  results.innerHTML = '';

  questions.classList.remove('questions--hidden');
  indicator.classList.remove('indicator--hidden');
  results.classList.remove('indicator--visible');
  buttonNext.classList.remove('button-next--hidden');
  buttonRestart.classList.remove('button-resturt--visible');

  renderQuestions(0);
}
});

renderQuestions(0);