import { CellValue } from "../machines/ticTacToeMachine";
import { openAIClient } from "./client";

export const getAiMove = async (grid: CellValue[]): Promise<number> => {
  const newArray = grid.map((value, index) => ({
    index: index,
    itBelongsAlreadyToSamone: value !== null,
  }));

  const prompt = `
  ##Array:
    [${JSON.stringify(newArray)}].

        You are provided with an array of objects, each containing an "index" (a number from 0 to 8) and a boolean property "itBelongsAlreadyToSamone".

        Your task is to select a number from the "index" properties in the array, but only those that have "itBelongsAlreadyToSamone": false. You should respond with only the number, nothing more.

        Please follow these steps:

        1. Examine each object in the array.
        2. Identify objects where "itBelongsAlreadyToSamone": false.
        3. From these objects, extract the "index" value.
        4. Respond with one of these "index" values.

        ### Examples

        1. Given the array:

        [
        {"index":0,"itBelongsAlreadyToSamone":true},
        {"index":1,"itBelongsAlreadyToSamone":false},
        {"index":2,"itBelongsAlreadyToSamone":false},
        {"index":3,"itBelongsAlreadyToSamone":true}
        ]

        You can choose from the indices 1 or 2. So, you should respond with either 1 or 2.

        2. Given the array:

        [
        {"index":0,"itBelongsAlreadyToSamone":true},
        {"index":1,"itBelongsAlreadyToSamone":true},
        {"index":2,"itBelongsAlreadyToSamone":false},
        {"index":3,"itBelongsAlreadyToSamone":false},
        {"index":4,"itBelongsAlreadyToSamone":false}
        ]

        You can choose from the indices 2, 3, or 4. So, you should respond with one number from 2, 3, or 4.

        3. Given the array:

        [
        {"index":0,"itBelongsAlreadyToSamone":false}
        ]

        You can only choose the index 0. So, you should respond with 0.

        ### Key Points

        - Do not choose any index where "itBelongsAlreadyToSamone" is true.
        - Only respond with the number of an eligible index.
        - Do not provide any additional text or explanation.

        Make sure to follow these instructions precisely.
    `;

  const aiMove = await openAIClient(prompt);

  return aiMove;
};
