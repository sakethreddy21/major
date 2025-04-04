export async function POST(req) {
  try {
    const { text } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;

    if (!text) {
      return new Response(JSON.stringify({ error: "Text is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an AI trained to detect emotions in user text. Classify the given input into one of the following categories: sarcasm, happiness, sadness, anger, fear, surprise, disgust, or neutral.",
          },
          { role: "user", content: `Analyze the emotion in this text: "${text}"` },
        ],
        max_tokens: 10,
      }),
    });

    const data = await response.json();
    const emotion = data.choices?.[0]?.message?.content?.trim() || "Unknown";

    return new Response(JSON.stringify({ emotion }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to analyze emotion" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
