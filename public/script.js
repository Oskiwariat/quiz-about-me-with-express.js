const h3question = document.querySelector("#h3question");

function setNextQuestion(data) {
  const { question, answers } = data;
  h3question.innerText = question;

  for (const i in answers) {
    let button = document.querySelector(`#answer${Number(i) + 1}`);
    button.innerText = answers[i];
  }
}

function showTheNextQuestion() {
  fetch("/answer", {
    method: "GET",
  })
    .then((r) => r.json())
    .then((data) => {
      setNextQuestion(data);
    });
}

showTheNextQuestion();
