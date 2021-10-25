function gameRoute(app) {
  let goodAnswers = 0;
  let isGameOver = false;

  const questions = [
    {
      question:
        "What is the best programming language in the world in my opinion?",
      answers: ["C++", "Python", "Java", "JavaScript"],
      correctAnswer: 3,
    },
    {
      question: "Is programming cool?",
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
}

module.exports = gameRoute;
