'use client';

import Head from 'next/head';
import ChatBox from '../../components/ChatBox.jsx';
import dotenv from 'dotenv';
dotenv.config();


export default function Home() {
  return (
    <>
      <Head>
        <title>FURIA Fan Chatbot</title>
      </Head>
      <main className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-4">
        <ChatBox />
      </main>
    </>
  );
}