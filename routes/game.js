function gameRoute(app) {
  let goodAnswers = 0;
  let isGameOver = false;
  let isFiftyFiftyUsed = false;
  let isFriendCallUsed = false;
  let isAudienceHelpUsed = false;

  const questions = [
    {
      question:
        "What is the best programming language in the world in my opinion?",
      answers: ["C++", "Python", "Java", "JavaScript"],
      correctAnswer: 3,
    },
    {
      question: "Do you think that programming is cool for me?",
      answers: [
        "Yes on average",
        "I don't think so",
        "Maybe",
        "I love programming!",
      ],
      correctAnswer: 3,
    },
    {
      question: "Who's my favourite footbal player?",
      answers: [
        "Robert Lewandowski",
        "Neymar",
        "Cristiano Ronaldo",
        "Lionel Messi",
      ],
      correctAnswer: 3,
    },
    {
      question: "Which colour is my favourite",
      answers: ["Red", "Pink", "Black", "White"],
      correctAnswer: 2,
    },
    {
      question: "When did I start learning programming?",
      answers: [
        "1 year 3 months ago",
        "10 months ago",
        "2 years ago",
        "7 months ago",
      ],
      correctAnswer: 3,
    },
    {
      question: "Why can't I continue my football adventure?",
      answers: [
        "I'm lazy",
        "I'm bad",
        "I have heart disease",
        "Clubs don't want me",
      ],
      correctAnswer: 2,
    },
  ];

  app.get("/answer", (req, res) => {
    if (goodAnswers === questions.length) {
      res.json({
        winner: true,
      });
    } else if (isGameOver) {
      res.json({
        loser: true,
      });
    } else {
      let nextQuestion = questions[goodAnswers];
      let { question, answers } = nextQuestion;

      res.json({
        question,
        answers,
      });
    }
  });

  app.post("/getanswer/:index", (req, res) => {
    let { index } = req.params;

    let theQuestion = questions[goodAnswers];

    let isAnswerGood = theQuestion.correctAnswer === Number(index);

    if (isAnswerGood) {
      goodAnswers++;
    } else {
      res.json({
        loser: true,
      });
    }

    res.json({
      isAnswerGood,
      goodAnswers,
    });
  });

  app.get("/help/fiftyfifty", (req, res) => {
    if (isFiftyFiftyUsed) {
      res.json({
        text: "This lifeline is already used",
        fiftyButtonDisabled: true,
      });
    }
    isFiftyFiftyUsed = true;

    res.json({
      isFiftyFiftyUsed,
      text: "Now you have only two answers to pick!",
    });
  });

  app.get("/help/friendcall", (req, res) => {
    if (isFriendCallUsed) {
      res.json({
        text: "This lifeline is already used",
        friendCallButtonDisabled: true,
      });
    }
    isFriendCallUsed = true;

    let theQuestions = questions[goodAnswers];

    let { correctAnswer, answers } = theQuestions;

    let doesFriendKnow = Math.random() < 0.5;

    res.json({
      isFriendCallUsed,
      text: doesFriendKnow
        ? `I am 100% sure the correct answer is ${answers[correctAnswer]}`
        : "Hmm, i don't know. Unfortunately i can't help you",
    });
  });

  app.get("/help/audiencehelp", (req, res) => {
    if (isAudienceHelpUsed) {
      res.json({
        text: "This lifeline is already used",
        audienceHelpButtonDisabled: true,
      });
    }
    isAudienceHelpUsed = true;

    let question = questions[goodAnswers];

    const { answers, correctAnswer } = question;

    let whatIsTheAudienceAnswer = Math.random() > 0.5 ? true : false;

    let goodAnswer = `${answers[correctAnswer]} - ${Math.floor(
      Math.random() * (85 - 50) + 50
    )}%`;

    let badAnswer = `${
      answers[Math.floor(Math.random() * (4 - 0) + 0)]
    } - ${Math.floor(Math.random() * (50 - 39) + 39)}%`;

    res.json({
      isAudienceHelpUsed,
      text: "Do you think this is the correct answer?",
      response: whatIsTheAudienceAnswer
        ? `The answer most selected by the audience is: ${goodAnswer}`
        : `The answer most selected by the audience is: ${badAnswer}`,
    });
  });
}

module.exports = gameRoute;
