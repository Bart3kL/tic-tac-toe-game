import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey:
    "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",
  dangerouslyAllowBrowser: true,
});

export const openAIClient = async (prompt: string): Promise<number> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
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
