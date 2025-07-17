const { OpenAI } = require("openai");

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5173",
    "X-Title": "MERN Chatbot",
  },
});

const LlamaChat = async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3.3-70b-instruct:free",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content || "No reply from Llama 3.3";
    res.json({ reply });
  } catch (error) {
    console.error("Llama 3.3 error:", error?.response?.data || error.message);
    res.status(500).json({
      error:
        error?.response?.data?.error?.message ||
        error.message ||
        "Failed to get response from Llama 3.3",
    });
  }
};

module.exports = { LlamaChat };
