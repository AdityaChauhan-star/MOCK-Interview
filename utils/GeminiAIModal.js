const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function sendMessage(input) {
  try {
    console.log(model);
    
    const result = await model.generateContent([input]);

    return result.response.text();
  } catch (error) {
    console.error('Error in sendMessage:', error);
    throw error;
  }
}

module.exports = { sendMessage };
