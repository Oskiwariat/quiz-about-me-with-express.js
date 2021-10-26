function gameRoute(app) {
  let goodAnswers = 0;
  let isGameOver = false;
  let isFiftyFiftyUsed = false;
  let isFriendCallUsed = false;

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
        text: "To koło ratunkowe zostało już użyte",
        fiftyButtonDisabled: true,
      });
    }
    isFiftyFiftyUsed = true;

    res.json({
      isFiftyFiftyUsed,
      text: "",
    });
  });

  app.get("/help/friendcall", (req, res) => {
    if (isFriendCallUsed) {
      res.json({
        text: "To koło ratunkowe zostało już użyte",
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
        ? `Jestem w 100% pewien, że prawidłowa odpowiedź to ${answers[correctAnswer]}`
        : "Hmm no nie wiem, niestety ci nie pomogę",
    });
  });
}

module.exports = gameRoute;
