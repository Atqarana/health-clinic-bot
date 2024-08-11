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
import { Home, User, FileText, Phone, Settings } from 'lucide-react';
import logooo from './logooo.png'; // Import the image
import { Analytics } from "@vercel/analytics/react"
export default function HomePage() {
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
    <main className="flex h-screen overflow-hidden bg-gradient-to-r from-teal-300 via-blue-300 to-indigo-400">
      {/* Sidebar */}
<aside className="w-24 bg-gradient-to-r  from-blue-500 to-indigo-500 text-white flex flex-col items-center py-4">
  <div className="mb-8">
    <img src={logooo.src} alt="Health Wise Clinic" className="w-12 h-12 rounded-full" />
  </div>
  <nav className="flex flex-col items-center space-y-6">
    <a href="#home" className="p-2 rounded-lg hover:bg-blue-700 transition-colors">
      <Home size={24} />
    </a>
    <a href="#about" className="p-2 rounded-lg hover:bg-blue-700 transition-colors">
      <User size={29} />
    </a>
    <a href="#services" className="p-2 rounded-lg hover:bg-blue-700 transition-colors">
      <FileText size={29} />
    </a>
    <a href="#contact" className="p-2 rounded-lg hover:bg-blue-700 transition-colors">
      <Phone size={29} />
    </a>
  </nav>
  <div className="mt-auto">
    <button onClick={() => setConfigureOpen(true)} className="p-2 rounded-lg hover:bg-blue-700 transition-colors">
      <Settings size={29} />
    </button>
  </div>
</aside>

      {/* Main Content */}
          {/* Main Content and Chatbot Container */}
          <div className="flex-1 flex justify-between p-4 md:p-8 pt-16 ml-16">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-blue-400 to-indigo-400 opacity-30"></div>
          <div className="flex items-center justify-center mb-6 relative z-10">
            <Player
              autoplay
              loop
              src={animationData}
              style={{ height: '300px', width: '400px' }}
            />
            <Analytics/>
          </div>
          <div className="text-center mb-8 px-4 md:px-8 relative z-10">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Welcome to Health Wise</h1>
            <p className="text-base md:text-lg text-gray-600">
              At Health Wise Clinic, we are dedicated to providing the best healthcare services to ensure your well-being. Our expert team is here to assist you with all your health-related needs. Feel free to ask our chatbot any questions you may have!
            </p>
          </div>
        </div>

        {/* Chatbot Section */}
        <section className='chatbot-section flex flex-col w-full md:w-[400px] h-[500px] bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 shadow-lg rounded-2xl p-8 md:p-8 m-4 md:m-8'>
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
           <Analytics/>
          <form className='flex items-center gap-2 mt-4' onSubmit={handleSend}>
            <input
              onChange={handleInputChange}
              value={input}
              className='flex-1 text-sm md:text-base outline-none bg-gradient-to-r from-[#ffffff] via-[#f5f5f5] to-[#e0e0e0] border border-gray-300 rounded-lg p-2 shadow-sm'
              placeholder='Send a message...'
            />
            <Analytics/>
            <button type="submit" className='bg-gradient-to-r from-[#4a90e2] to-[#50e3c2] text-white rounded-lg p-2 shadow-md hover:from-[#357abd] hover:to-[#4ec1a1] flex items-center'>
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path d="M2.925 5.025L9.18333 7.70833L2.91667 6.875L2.925 5.025ZM9.175 12.2917L2.91667 14.975V13.125L9.175 12.2917ZM1.25833 2.5L1.25 8.33333L13.75 10L1.25 11.6667L1.25833 17.5L18.75 10L1.25833 2.5Z" fill="#fff"/>
              </svg>
              <span className='hidden md:inline-block font-semibold text-sm ml-2'>Send</span>
            </button>
          </form>
        </section>
      </div>

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