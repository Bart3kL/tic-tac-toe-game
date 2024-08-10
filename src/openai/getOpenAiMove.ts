import { openai } from "./client";

export const getOpenAiMove = async (prompt: string): Promise<number> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 10,
      temperature: 0.7,
    });

    const aiMoveText = response.choices[0].message.content!.trim();
    const aiMove = parseInt(aiMoveText, 10);
    return Number.isNaN(aiMove) ? -1 : aiMove;
  } catch (error) {
    console.error("Error fetching AI move:", error);
    return -1;
  }
};
