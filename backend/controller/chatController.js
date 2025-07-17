const OpenAI = require("openai");

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5173",
    "X-Title": "MERN Chatbot",
  },
});

const GeminiChat = async (req, res) => {
  const { message, imageUrl } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-exp:free", // Using Gemini 2.0 Flash model
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: message, // User message
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl, // The URL of the image sent by the user
              },
            },
          ],
        },
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content || "No reply from Gemini 2.0";

    res.json({ reply }); // Send the response back to the frontend
  } catch (error) {
    console.error(
      "Gemini 2.0 Flash error:",
      error?.response?.data || error.message
    );
    res.status(500).json({
      error:
        error?.response?.data?.error?.message ||
        error.message ||
        "Failed to get response from Gemini 2.0 Flash",
    });
  }
};

module.exports = { GeminiChat };
