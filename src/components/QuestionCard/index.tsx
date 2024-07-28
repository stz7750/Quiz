import React from "react";
import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";
import AppButton from "../AppButton";

interface QuestionCardProps {
  question: string;
  category: string;
  totalQuestions?: number;
  questionNumber?: number;
  checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  category,
  totalQuestions,
  questionNumber,
  checkAnswer,
}) => {
  return (
    <>
      <Box bg={"white"} w={"100%"}>
        <Box
          mb={6}
          fornSize={"md"}
          fontWeight={"bold"}
          textTransform={"uppercase"}
        >
          Your Progress : {questionNumber} / {totalQuestions}
        </Box>
      </Box>
      <Box fortSize={"sm"} mb={1}>
        {category}
      </Box>
      <Heading as={"h1"} size={"lg"}>
        <p dangerouslySetInnerHTML={{ __html: question }} />
      </Heading>
      <Flex direction={"column"}>
        <Box w={"100%"} mt={4} mb={4}>
          <AppButton
            value={"true"}
            colorScheme={"purple"}
            variant={"outline"}
            onClick={checkAnswer}
            width={"full"}
          />
        </Box>
        <Spacer />
        <Box w={"100%"} mb={4}>
          <AppButton
            value={"false"}
            colorScheme={"purple"}
            variant={"outline"}
            onClick={checkAnswer}
            width={"full"}
          />
        </Box>
      </Flex>
    </>
  );
};

export default QuestionCard;
