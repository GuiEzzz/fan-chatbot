// app/api/chat/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';
import { FURIA_SYSTEM_PROMPT } from "../../../../utils/constants";

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const completeMessages = [
      { role: 'system', content: FURIA_SYSTEM_PROMPT },
      ...messages,
    ];


    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4.1-nano',
        messages: completeMessages,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    return NextResponse.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Erro na API Route:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Erro ao se comunicar com OpenAI.' }, { status: 500 });
  }
}
