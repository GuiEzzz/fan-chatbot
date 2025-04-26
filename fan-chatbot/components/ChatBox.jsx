'use client';

import { useState } from 'react';
import { sendMessageToOpenAI } from '../utils/openai';

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newUserMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setLoading(true);

    const reply = await sendMessageToOpenAI(input);
    const botMessage = { role: 'assistant', content: reply };
    setMessages((prev) => [...prev, botMessage]);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      handleSend();
    }
  };  

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#1A1A1D] text-white rounded-2xl shadow-lg flex flex-col h-[85vh] p-4 border border-[#444]">
      <h1 className="text-3xl font-bold mb-4 text-center text-white-400 font-mono">
        FURIA Fan Chatbot
      </h1>

      <div className="flex-1 overflow-y-auto space-y-4 p-2 border border-[#333] rounded bg-[#0F0F0F]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 ${
              msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            {/* Avatar */}
            {msg.role === 'assistant' ? (
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-xl">
                <img src="/furia-logo.png" alt="Bot" className="w-10 h-10 rounded-full" />
              </div>
            ) : (
              null
           )}

            {/* Message bubble */}
            <div
              className={`p-3 rounded-xl max-w-[75%] text-sm font-bold ${
                msg.role === 'user'
                  ? 'bg-gray-400 text-black'
                  : 'bg-gray-700 text-gray-100'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <p className="text-sm text-gray-400">FURIA está digitando...</p>
        )}
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-1 p-3 rounded-l-lg bg-[#222] text-white border border-[#444] focus:outline-none focus:ring-1 focus:ring-gray-400"
          placeholder="Pergunte algo sobre o time, jogadores..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className={`px-6 rounded-r-lg font-bold ${
            !input.trim() || loading
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-gray-400 text-black hover:bg-white-300'
          }`}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>

      </div>
    </div>
  );
}