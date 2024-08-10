"use client";
import { useEffect, useRef, useState } from 'react';
import Bubble from '../components/Bubble';
import { useChat, Message } from 'ai/react';
import Configure from '../components/Configure';
import PromptSuggestionRow from '../components/PromptSuggestions/PromptSuggestionsRow';
import ThemeButton from '../components/ThemeButton';
import useConfiguration from './hooks/useConfiguration';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from './doctor.json';

export default function Home() {
  const { append, messages, input, handleInputChange, handleSubmit } = useChat();
  const { useRag, llm, similarityMetric, setConfiguration } = useConfiguration();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [configureOpen, setConfigureOpen] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e, { options: { body: { useRag, llm, similarityMetric } } });
  };

  const handlePrompt = (promptText: string) => {
    const msg: Message = { id: crypto.randomUUID(), content: promptText, role: 'user' };
    append(msg, { options: { body: { useRag, llm, similarityMetric } } });
  };

  return (
    <main className="flex h-screen overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 p-4 md:p-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 opacity-30"></div>
        <div className="flex items-center justify-center mb-6 relative z-10">
          <Player
            autoplay
            loop
            src={animationData}
            style={{ height: '400px', width: '300px' }}
          />
        </div>
        <div className="text-center mb-8 px-4 md:px-8 relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Welcome to Health Wise Clinic</h1>
          <p className="text-base md:text-lg text-gray-600">
            At Health Wise Clinic, we are dedicated to providing the best healthcare services to ensure your well-being. Our expert team is here to assist you with all your health-related needs. Feel free to ask our chatbot any questions you may have!
          </p>
        </div>
      </div>
      <section className='chatbot-section flex flex-col w-full md:w-[400px] bg-white bg-opacity-60 backdrop-blur-lg shadow-lg rounded-lg p-4 md:p-6'>
        <div className='chatbot-header pb-4'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <h1 className='text-xl md:text-2xl font-semibold text-gray-800'>Health Wise Clinic</h1>
            </div>
            <div className='flex gap-2'>
              <ThemeButton />
            </div>
          </div>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Patient Support Bot
          </p>
        </div>
        <div className='flex-1 relative overflow-y-auto'>
          <div className='absolute w-full'>
            {messages.map((message, index) => (
              <Bubble ref={messagesEndRef} key={`message-${index}`} content={message} />
            ))}
          </div>
        </div>
        {(!messages || messages.length === 0) && (
          <PromptSuggestionRow onPromptClick={handlePrompt} />
        )}
        <form className='flex items-center gap-2 mt-4' onSubmit={handleSend}>
          <input
            onChange={handleInputChange}
            value={input}
            className='flex-1 text-sm md:text-base outline-none bg-gradient-to-r from-[#ffffff] via-[#f5f5f5] to-[#e0e0e0] border border-gray-300 rounded-lg p-2 shadow-sm'
            placeholder='Send a message...'
          />
          <button type="submit" className='bg-gradient-to-r from-[#4a90e2] to-[#50e3c2] text-white rounded-lg p-2 shadow-md hover:from-[#357abd] hover:to-[#4ec1a1] flex items-center'>
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path d="M2.925 5.025L9.18333 7.70833L2.91667 6.875L2.925 5.025ZM9.175 12.2917L2.91667 14.975V13.125L9.175 12.2917ZM1.25833 2.5L1.25 8.33333L13.75 10L1.25 11.6667L1.25833 17.5L18.75 10L1.25833 2.5Z" fill="#fff"/>
            </svg>
            <span className='hidden md:inline-block font-semibold text-sm ml-2'>Send</span>
          </button>
        </form>
      </section>
      <Configure
        isOpen={configureOpen}
        onClose={() => setConfigureOpen(false)}
        useRag={useRag}
        llm={llm}
        similarityMetric={similarityMetric}
        setConfiguration={setConfiguration}
      />
    </main>
  );
}
