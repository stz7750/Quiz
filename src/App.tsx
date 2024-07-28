import "./App.css";
import { useEffect, useState } from "react";
import { IQuestion, IUserAnswer } from "./services/type.ts";
import { getQuestionList } from "./services/FectchQuestions.tsx";
import { Difficulty, totalQuestions } from "./constants";
import AppSpinner from "./components/Spinner";
import { Box, Heading } from "@chakra-ui/react";
import AppButton from "./components/AppButton";
import QuestionCard from "./components/QuestionCard";

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [userAnswer, setUserAnswer] = useState<IUserAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const fectchQuestions = async () => {
      const qeustionListiong = await getQuestionList(
        totalQuestions,
        Difficulty.EASY,
      );
      setQuestions(qeustionListiong);
      setLoading(false);
    };
    fectchQuestions();
  }, []);

  const startQuizGame = (): void => {
    setStartQuiz(true);
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (gameOver) return;

    const chosenAnswer = e.currentTarget.innerText;
    const correct = questions[questionNumber]?.correct_answer === chosenAnswer;

    //정답?
    if (correct) setScore((previous) => previous + 1);
    //
    const answserObject = {
      question: questions[questionNumber]?.questions,
      answer: chosenAnswer,
      correct,
      correctAnswer: questions[questionNumber]?.correct_answer,
    };
    setUserAnswer([...answserObject]);
  };
  const nextQuestion = () => {
    const nextQuestion = questionNumber + 1;
    if (totalQuestions === nextQuestion) {
      setGameOver(true);
    }
    setQuestionNumber(nextQuestion);
  };
  const replayQuiz = () => {
    setStartQuiz(false);
    setGameOver(false);
    setQuestionNumber(0);
    setScore(0);
    setUserAnswer([]);
  };
  return (
    <main>
      {loading && (
        <div className={"app-spinner"}>
          <AppSpinner
            speed={"0.65s"}
            emptyColor={"gray.200"}
            color={"purple"}
            size={"lg"}
            thickness={"5px"}
          ></AppSpinner>
        </div>
      )}

      {userAnswer.length === questionNumber &&
      !gameOver &&
      !loading &&
      !startQuiz ? (
        <div className={"greetion-Box"}>
          <Box
            boxShadow={"base"}
            p={"6"}
            rounded={"md"}
            bg={"white"}
            maxW={"560px"}
          >
            <Heading as={"h2"} size={"lg"} mb={2}>
              퀴즈 앱
            </Heading>
            <p>
              참 또는 거짓으로 대답 할 수 있는 {totalQuestions}개의 질문이
              제시됩니다.
            </p>
            <AppButton
              value={"start Quiz Game"}
              colorScheme={"purple"}
              variant={"solid"}
              onClick={startQuizGame}
            />
          </Box>
        </div>
      ) : null}
      {!loading && !gameOver && startQuiz && (
        <Box
          boxShadow={"base"}
          p={"6"}
          rounded={"md"}
          bg={"white"}
          maxW={"560px"}
        >
          <QuestionCard
            question={questions[questionNumber].questions}
            category={questions[questionNumber].category}
            checkAnswer={checkAnswer}
            totalQuestions={totalQuestions}
            questionNumber={questionNumber}
          />
          <AppButton
            value={"Next Question"}
            colorScheme={"purple"}
            variant={"soild"}
            onClick={nextQuestion}
            className={"next-button"}
            disabled={
              userAnswer.length === questionNumber + 1 &&
              questionNumber !== totalQuestions
                ? false
                : true
            }
          />
        </Box>
      )}
      {gameOver && (
        <>
          <Box
            boxShadow={"base"}
            p={"6"}
            rounded={"md"}
            bg={"white"}
            maxW={"560px"}
          >
            <Box mb={"4"}>
              <Box fontWeight={"bold"} as={"h3"} fontSize={"4xl"}>
                Game Over!
              </Box>
              <Box as={"h3"} fontsize={"xl"}>
                your score is {score}/{totalQuestions}
              </Box>
            </Box>
            {userAnswer.map((answer, idx) => (
              <Box key={idx}>
                <div className={"answer-list"}>
                  <Box fontSize={"md"} fontWeight={"bold"}>
                    Q.
                    <p dangerouslySetInnerHTML={{ __html: answer.question }} />
                  </Box>
                  <ul>
                    <li>You answered : {answer.answer}</li>
                    <li>Corrrct answer :{answer.correctAnswer}</li>
                  </ul>
                </div>
              </Box>
            ))}
            <AppButton
              value={"replay Quiz"}
              colorScheme={"purple"}
              variant={"solid"}
              onClick={replayQuiz}
            />
          </Box>
        </>
      )}
    </main>
  );
}

export default App;
