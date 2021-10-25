function gameRoute(app) {
  let goodAnswers = 0;
  let isGameOver = false;

  const questions = [
    {
      question: "Jaki jest najlepszy język programowania na świecie wg mnie?",
      answers: ["C++", "Fortran", "Java", "JavaScript"],
      correctAnswer: 3,
    },
    {
      question: "Czy programowanie jest fajne?",
      answers: ["Tak średnio", "Nie sądze", "Może", "Uwielbiam programować!"],
      correctAnswer: 3,
    },
    {
      question: "Kto jest moim ulubionym piłkarzem?",
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
      const { question, answers } = nextQuestion;

      res.json({
        question,
        answers,
      });
    }
  });
}

module.exports = gameRoute;
