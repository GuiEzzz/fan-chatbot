// utils/openai.js

export async function sendMessageToOpenAI(message) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    return 'Erro ao enviar mensagem.';
  }
}
