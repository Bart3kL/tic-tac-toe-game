import { useState, useEffect } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey:
    "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",
  dangerouslyAllowBrowser: true,
});

const useOpenAIStream = (prompt: string | null) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (!prompt) return;

    setLoading(true);
    setResponse("");

    const fetchData = async () => {
      try {
        const stream = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `If ai won, write something funny like "tomorrow I'll let you win, don't worry". If someone other than Ai wins, congratulate and write that next time you have no chance with me`,
            },
            { role: "user", content: prompt },
          ],
          stream: true,
        });

        for await (const chunk of stream) {
          const content = chunk.choices[0].delta?.content || "";
          setResponse((prevResponse) => prevResponse + content);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error streaming AI response:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [prompt]);

  return { loading, response };
};

export default useOpenAIStream;
