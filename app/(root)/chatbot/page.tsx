'use client';

import { useState, useCallback } from 'react';
import { useChatSocket } from '@/hooks/use-chat-socket';
import type { Message } from '@/lib/chat';
import { cn } from '@/lib/utils';
import {
  ChatHeader,
  ChatCard,
  FaqSidebar,
} from './_components';

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  type: 'bot',
  content: "Hello! I'm your AI assistant. How can I help you today?",
  timestamp: new Date(),
};

function nextId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [sending, setSending] = useState(false);
  const [showFAQs, setShowFAQs] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleBotMessage = useCallback((data: { text: string; timestamp: string }) => {
    setMessages((prev) => [
      ...prev,
      {
        id: nextId(),
        type: 'bot',
        content: data.text,
        timestamp: new Date(data.timestamp),
      },
    ]);
    setSending(false);
  }, []);

  const handleError = useCallback((message: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: nextId(),
        type: 'bot',
        content: `Sorry, something went wrong: ${message}`,
        timestamp: new Date(),
      },
    ]);
    setSending(false);
  }, []);

  const { connected, sendMessage } = useChatSocket({
    onBotMessage: handleBotMessage,
    onError: handleError,
  });

  const handleSendMessage = useCallback(() => {
    const text = inputValue.trim();
    if (!text) return;

    const userMessage: Message = {
      id: nextId(),
      type: 'user',
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setSending(true);
    sendMessage(text);
  }, [inputValue, sendMessage]);

  const handleQuickAction = useCallback(
    (label: string) => {
      setInputValue(label);
      const userMessage: Message = {
        id: nextId(),
        type: 'user',
        content: label,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setSending(true);
      sendMessage(label);
    },
    [sendMessage]
  );

  const handleFAQClick = useCallback(
    (question: string) => {
      setShowFAQs(false);
      setSelectedCategory(null);
      const userMessage: Message = {
        id: nextId(),
        type: 'user',
        content: question,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setSending(true);
      sendMessage(question);
    },
    [sendMessage]
  );

  const toggleVoiceInput = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setInputValue('What is my account balance?');
      }, 2000);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)] flex flex-col">
      <ChatHeader showFAQs={showFAQs} onToggleFAQs={() => setShowFAQs(!showFAQs)} />

      <div className="flex-1 grid gap-4 lg:grid-cols-4 min-h-0">
        <ChatCard
          className={cn(showFAQs ? 'lg:col-span-3' : 'lg:col-span-4')}
          messages={messages}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSend={handleSendMessage}
          onQuickAction={handleQuickAction}
          isRecording={isRecording}
          onToggleVoice={toggleVoiceInput}
          connected={connected}
          sending={sending}
        />

        <FaqSidebar
          show={showFAQs}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onQuestionClick={handleFAQClick}
        />
      </div>
    </div>
  );
}
