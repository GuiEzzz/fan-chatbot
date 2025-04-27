'use client';

import Head from 'next/head';
import ChatBox from '../../components/ChatBox.jsx';
import Suggestions from '../../components/Suggestions.jsx';
import dotenv from 'dotenv';
dotenv.config();

export default function Home() {
  return (
    <>
      <Head>
        <title>FURIA Fan Chatbot</title>
      </Head>
      <main className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-10 space-x-0 md:space-x-8 flex-col md:flex-row">
        <div className="flex flex-col items-center w-full max-w-2xl bg-[#1A1A1D] p-6 rounded-lg shadow-md">
          <ChatBox />
        </div>

        <div className="flex-shrink-0 w-full max-w-xs mt-4 md:mt-0 md:w-72">
          <Suggestions />
        </div>
      </main>
    </>
  );
}
