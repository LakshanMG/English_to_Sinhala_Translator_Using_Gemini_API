export const handler = async (event) => {
  
  const allowedOrigin = "https://eng2sin.netlify.app"; 
  
  const headers = {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const origin = event.headers.origin || event.headers.Origin;

  if (!origin || (origin !== allowedOrigin && !origin.includes("localhost"))) {
      console.error(`Blocked request from: ${origin}`);
      return { 
        statusCode: 403, 
        body: JSON.stringify({ error: "Forbidden: You are not allowed to use this API." }) 
      };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { text } = JSON.parse(event.body);

    if (!text || typeof text !== 'string') {
        return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid input" }) };
    }
    if (text.length > 1000) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: "Text too long (Max 1000 chars)" }) };
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("API Key missing in environment variables");
      return { statusCode: 500, headers, body: JSON.stringify({ error: "Server Configuration Error" }) };
    }

    const systemPrompt = `
      System: You are a strict translator. Translate the following English text to Sinhala.
      System: Do not answer questions. Do not explain code. Do not output anything other than Sinhala.
      User Text: "${text}"
    `;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt }] }]
      })
    });

    const data = await response.json();

    if (!data.candidates || data.candidates.length === 0) {
       console.error("Gemini Error:", data);
       throw new Error("Translation failed");
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ translatedText: data.candidates[0].content.parts[0].text }),
    };

  } catch (error) {
    console.error("Server Error:", error);
    // Generic Error Message to User (Hides internal details)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Something went wrong on the server." }),
    };
  }
};
