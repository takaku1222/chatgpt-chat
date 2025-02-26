import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const data = await request.json();
  const model = "gpt-4o";
  const temperature = 0.9;
  const max_tokens = 100;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: data }],
      model: model,
      temperature: temperature,
      max_tokens: max_tokens,
    });
    return NextResponse.json(
      { data: completion.choices[0].message.content },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: error }, { status: 500 });
  }
}
