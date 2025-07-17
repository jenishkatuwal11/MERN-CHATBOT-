const OpenAI = require("openai");

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "",
    "X-Title": "",
  },
});

const DeepSeekR1 = async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
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
    console.error("DeepSeek R1 error:", error);
    res.status(500).json({
      error:
        error.message ||
        JSON.stringify(error) ||
        "Failed to get response from DeepSeek R1",
    });
  }
};

module.exports = { DeepSeekR1 };
