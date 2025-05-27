'use client';

import { useState, useRef, useEffect } from 'react';
import { sendMessageToOpenAI } from '../utils/openai';
import { motion } from 'framer-motion';

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const hasSentWelcomeMessage = useRef(false);

  useEffect(() => {
    if (hasSentWelcomeMessage.current) return;

    const welcomeMessage = "Bem-vindo ao FURIA Fan Chatbot! Como posso te ajudar hoje?";
    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: welcomeMessage },
    ]);

    hasSentWelcomeMessage.current = true;
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newUserMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    const reply = await sendMessageToOpenAI(updatedMessages);
    const botMessage = { role: 'assistant', content: reply };
    setMessages((prev) => [...prev, botMessage]);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      handleSend();
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#1A1A1D] text-white rounded-2xl shadow-lg flex flex-col h-full p-4 border border-[#444]">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-4 text-center font-poppins drop-shadow-xl">
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
            {msg.role === 'assistant' && (
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-xl">
                <img src="/furia-logo.png" alt="Bot" className="w-10 h-10 rounded-full" />
              </div>
            )}

            <motion.div
              className={`p-3 rounded-xl max-w-[75%] text-sm font-bold ${
                msg.role === 'user' ? 'bg-gray-400 text-black' : 'bg-gray-700 text-gray-100'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {msg.content}
            </motion.div>
          </div>
        ))}

        {loading && (
          <motion.p
            className="text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            FURIA está digitando...
          </motion.p>
        )}

        <div ref={chatEndRef} />
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
        <motion.button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className={`px-6 rounded-r-lg font-bold ${
            !input.trim() || loading
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-gray-400 text-black hover:bg-white-300'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </motion.button>
      </div>
    </div>
  );
}
