// app/api/chat/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';
import { FURIA_SYSTEM_PROMPT } from "../../../../utils/constants";

const API_KEY = process.env.STEAM_API_KEY; 
const SERVER_ID = 'YOUR_SERVER_ID'; // Substitua pelo ID do servidor ou torneio

export async function POST(req) {
  try {
    const { message } = await req.json();

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4.1-nano',
        messages: [{ role: 'user', content: message },
                   { role: 'system', content: FURIA_SYSTEM_PROMPT }
        ],
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

// Rota para Status do Jogo CS:GO
export async function GET() {
    try {
      const response = await axios.get('http://api.steampowered.com/IGameServersService/GetGameServers/v1', {
        params: {
          key: API_KEY,
          filter: 'csgo',
          server_id: SERVER_ID,
        }
      });
  
      const gameData = response.data;
  
      return new NextResponse(JSON.stringify(gameData), { status: 200 });
    } catch (error) {
      console.error('Erro ao buscar dados ao vivo do CS:GO:', error);
      return new NextResponse('Erro ao buscar status do jogo', { status: 500 });
    }
  }