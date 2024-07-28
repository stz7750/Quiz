import axios from "axios";

const baseUrl = "https://opentdb.com/api.php?amount=";

export const getQuestionList = async (
  amount: number,
  difficulty: string,
): Promise<any> => {
  try {
    const response = await axios.get(
      `${baseUrl}+${amount}&difficulty=${difficulty}&type=boolean`,
    );
    return response.data.results;
  } catch (e) {
    throw new Error("통신 실패");
  }
};
