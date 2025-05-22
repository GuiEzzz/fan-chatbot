'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (data.success) {
        router.push('/chat');
    } else {
      setErrorMessage('Usuário ou senha incorretos. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Login FURIA Fan Chatbot
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {errorMessage && (
            <div className="bg-red-600/10 text-red-400 border border-red-600 rounded-md px-4 py-2 text-sm font-medium">
              {errorMessage}
            </div>
          )}
          <div>
            <label className="text-sm text-zinc-400 block mb-1 font-bold">Usuário</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
              required
            />
          </div>
          <div>
            <label className="text-sm text-zinc-400 block mb-1 font-bold">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-2 pr-11 bg-zinc-800 text-white border border-zinc-700 rounded-md placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 sm:p-1.5 rounded-full transition-colors"
                aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-yellow-500 hover:text-yellow-300" />
                ) : (
                  <Eye className="w-5 h-5 text-yellow-400 hover:text-yellow-300" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-700 transition-colors text-white font-semibold py-2 rounded-md shadow-md"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
