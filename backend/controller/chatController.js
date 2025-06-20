const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.MERN_GEMINFLASH,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5173",
    "X-Title": "MERN Chatbot",
  },
});

const GeminiFlashLite = async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-lite-preview-06-17",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = completion.choices?.[0]?.message?.content || "No reply";

    res.json({ reply });
  } catch (error) {
    console.error("Gemini Flash Lite error:", error);
    res
      .status(500)
      .json({ error: "Failed to get response from Gemini Flash Lite" });
  }
};

module.exports = { GeminiFlashLite };
