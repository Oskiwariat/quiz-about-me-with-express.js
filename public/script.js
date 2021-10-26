let h3question = document.querySelector("#h3question");
let goodAnswersCounter = document.querySelector("#good-answers");
let gameBoardDiv = document.querySelector("#game-board");
let fiftyFiftyButton = document.querySelector("#fiftyfifty");
let lifeLinesDiv = document.querySelector("#lifelines");

function setNextQuestion(data) {
  let { question, answers } = data;
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

function sendAnswer(data) {
  const { goodAnswers, isAnswerGood } = data;
  if (goodAnswers === 6) {
    lifeLinesDiv.style.display = "none";
    gameBoardDiv.style.display = "none";
    let congratulationsMessage = document.createElement("h1");
    congratulationsMessage.className = "congratulationsmessage";
    congratulationsMessage.innerText =
      "Huge congratulations! I didn't think you could guess my questions so easily! ";
    document.body.appendChild(congratulationsMessage);
  }

  if (isAnswerGood) {
    goodAnswersCounter.innerText = goodAnswers;
    showTheNextQuestion();
  } else {
    lifeLinesDiv.style.display = "none";
    gameBoardDiv.style.display = "none";

    let playAgainMessage = document.createElement("h1");
    playAgainMessage.className = "playagainmessage";
    playAgainMessage.innerText =
      "Nothing happened, you can try to guess this question until you succeed! Would you like to try again?";
    document.body.appendChild(playAgainMessage);

    let playAgainButton = document.createElement("button");
    playAgainButton.className = "playagainbutton";
    playAgainButton.innerText = "Play Again";

    playAgainButton.addEventListener("click", () => {
      playAgainMessage.style.display = "none";
      playAgainButton.style.display = "none";
      gameBoardDiv.style.display = "block";
      lifeLinesDiv.style.display = "block";
    });
    document.body.appendChild(playAgainButton);
  }
}

function handleAnswerButtonClick(answerButtonIndex) {
  fetch(`/getanswer/${answerButtonIndex}`, {
    method: "POST",
  })
    .then((r) => r.json())
    .then((data) => {
      sendAnswer(data);
    });
}

let buttons = document.querySelectorAll(".answer-btn");
for (const button of buttons) {
  button.addEventListener("click", (event) => {
    let answerButtonIndex = event.target.dataset.index;
    handleAnswerButtonClick(answerButtonIndex);
  });
}

function fiftyFiftyButtonClick(data) {
  const { isFiftyFiftyUsed } = data;
  let buttons = document.querySelectorAll(".answer-btn");
  buttons[0].innerText = "";
  buttons[1].innerText = "";
  fiftyFiftyButton.setAttribute("disabled", "true");
  fiftyFiftyButton.style.opacity = "0";

  if (isFiftyFiftyUsed) {
    console.log("You use Fifty-fifty lifeline!");
  }
}

function fiftyFiftyLifeLine() {
  fetch("/help/fiftyfifty", {
    method: "GET",
  })
    .then((r) => r.json())
    .then((data) => {
      fiftyFiftyButtonClick(data);
    });
}

fiftyFiftyButton.addEventListener("click", fiftyFiftyLifeLine);
