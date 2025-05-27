'use client';

import Head from 'next/head';
import ChatBox from '../../components/ChatBox';
import Suggestions from '../../components/Suggestions.jsx';
import dotenv from 'dotenv';
dotenv.config();
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>FURIA Fan Chatbot</title>
      </Head>

      <header className="w-full bg-[#1A1A1D]/80 backdrop-blur-md text-white px-6 py-4 flex justify-between items-center shadow-md fixed top-0 left-0 z-50 border-b border-zinc-800">
        <h1 className="text-lg font-bold tracking-wide">FURIA Fan Chatbot</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-md border border-yellow-500 text-yellow-400 hover:bg-yellow-600 hover:text-white transition-colors font-semibold text-sm"
        >
          Sair
        </button>
      </header>

      {/* Espaço para compensar o cabeçalho fixo */}
      <div className="mt-28" />

      <main className="h-[calc(100vh-7rem)] bg-[#0F0F0F] flex items-start justify-center p-6 space-x-0 md:space-x-8 flex-col md:flex-row">
        <div className="flex flex-col items-center w-full max-w-2xl bg-[#1A1A1D] p-6 rounded-lg shadow-none h-full">
          <ChatBox />
        </div>

        <div className="flex-shrink-0 w-full max-w-xs self-center">
          <Suggestions />
        </div>
      </main>
    </>
  );
}
