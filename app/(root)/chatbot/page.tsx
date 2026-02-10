'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  MessageCircle,
  Send,
  Mic,
  MicOff,
  Bot,
  User,
  Sparkles,
  DollarSign,
  CreditCard,
  HelpCircle,
  Clock,
  TrendingUp,
  FileText,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const GOLD = 'rgb(212, 175, 55)';

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const quickActions = [
  { id: 1, label: 'Check Balance', icon: DollarSign },
  { id: 2, label: 'Recent Transactions', icon: CreditCard },
  { id: 3, label: 'EMI Calculator', icon: TrendingUp },
  { id: 4, label: 'FAQs', icon: HelpCircle },
];

const faqCategories = [
  {
    id: 1,
    title: 'Account & Security',
    icon: User,
    questions: [
      'How do I reset my password?',
      'How to enable two-factor authentication?',
      'How to update my profile information?',
    ],
  },
  {
    id: 2,
    title: 'Transactions',
    icon: CreditCard,
    questions: [
      'How to view transaction history?',
      'What are the transaction limits?',
      'How to dispute a transaction?',
    ],
  },
  {
    id: 3,
    title: 'EMI & Payments',
    icon: TrendingUp,
    questions: [
      'How to convert purchase to EMI?',
      'What is the EMI interest rate?',
      'How to prepay my EMI?',
    ],
  },
  {
    id: 4,
    title: 'Rewards & Offers',
    icon: Sparkles,
    questions: [
      'How to redeem reward points?',
      'What are the current offers?',
      'How to check my reward balance?',
    ],
  },
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showFAQs, setShowFAQs] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        type: 'bot',
        content: generateBotResponse(inputValue),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('balance')) {
      return 'Your current account balance is ₹45,230. Would you like to see a detailed breakdown?';
    } else if (input.includes('transaction')) {
      return 'Your last 5 transactions: Amazon (₹2,500), Starbucks (₹450), Uber (₹320), Netflix (₹799), Zomato (₹680). Need more details?';
    } else if (input.includes('emi')) {
      return 'You have 2 active EMIs. Total monthly obligation: ₹12,825. Next payment due on Feb 15. Would you like to see more details?';
    } else if (input.includes('help') || input.includes('faq')) {
      return 'I can help you with: Account management, Transactions, EMI conversions, Rewards, and more. What would you like to know?';
    } else {
      return 'I understand you\'re asking about "' + userInput + '". Let me help you with that. Could you provide more details?';
    }
  };

  const handleQuickAction = (label: string) => {
    setInputValue(label);
    handleSendMessage();
  };

  const handleFAQClick = (question: string) => {
    setInputValue(question);
    setShowFAQs(false);
    setSelectedCategory(null);
    handleSendMessage();
  };

  const toggleVoiceInput = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        setIsRecording(false);
        setInputValue('What is my account balance?');
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${GOLD}1a`, border: `1px solid ${GOLD}33` }}>
            <MessageCircle className="h-5 w-5 md:h-6 md:w-6" style={{ color: GOLD }} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold" style={{ color: GOLD }}>
              AI Assistant
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground">Always here to help you</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFAQs(!showFAQs)}
          style={{ borderColor: `${GOLD}80` }}
          className="w-fit"
        >
          <HelpCircle className="mr-2 h-4 w-4" />
          {showFAQs ? 'Hide' : 'Show'} FAQs
        </Button>
      </div>

      <div className="flex-1 grid gap-4 lg:grid-cols-4 min-h-0">
        {/* Main Chat Area */}
        <Card className={cn('flex flex-col min-h-0', showFAQs ? 'lg:col-span-3' : 'lg:col-span-4')} style={{ borderColor: `${GOLD}33` }}>
          <CardHeader className="pb-3 flex-shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base md:text-lg flex items-center gap-2">
                <Bot className="h-5 w-5" style={{ color: GOLD }} />
                Chat
              </CardTitle>
              <Badge variant="outline" style={{ borderColor: GOLD, color: GOLD }}>
                <div className="h-2 w-2 rounded-full mr-2 animate-pulse" style={{ backgroundColor: GOLD }} />
                Online
              </Badge>
            </div>
          </CardHeader>

          <Separator className="flex-shrink-0" />

          {/* Quick Actions */}
          <div className="px-4 py-3 border-b flex-shrink-0">
            <p className="text-xs font-medium text-muted-foreground mb-2">Quick Actions</p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(action.label)}
                    className="text-xs"
                    style={{ borderColor: `${GOLD}33` }}
                  >
                    <Icon className="mr-1.5 h-3.5 w-3.5" style={{ color: GOLD }} />
                    {action.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-3',
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.type === 'bot' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${GOLD}1a`, border: `1px solid ${GOLD}33` }}>
                    <Bot className="h-4 w-4" style={{ color: GOLD }} />
                  </div>
                )}
                
                <div
                  className={cn(
                    'max-w-[85%] sm:max-w-[80%] md:max-w-[70%] rounded-lg px-3 md:px-4 py-2.5',
                    message.type === 'user'
                      ? 'text-black'
                      : 'border'
                  )}
                  style={
                    message.type === 'user'
                      ? { backgroundColor: GOLD }
                      : { borderColor: `${GOLD}33`, backgroundColor: `${GOLD}0d` }
                  }
                >
                  <p className="text-sm leading-relaxed break-words">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>

                {message.type === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-muted">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <Separator className="flex-shrink-0" />

          {/* Input Area */}
          <div className="p-3 md:p-4 flex-shrink-0">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="pr-12 text-sm md:text-base"
                  disabled={isRecording}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={toggleVoiceInput}
                  style={isRecording ? { color: GOLD } : {}}
                >
                  {isRecording ? (
                    <MicOff className="h-4 w-4 animate-pulse" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isRecording}
                className="text-black flex-shrink-0"
                style={{ backgroundColor: GOLD }}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {isRecording && (
              <p className="text-xs text-center mt-2 animate-pulse" style={{ color: GOLD }}>
                Listening...
              </p>
            )}
          </div>
        </Card>

        {/* FAQ Sidebar */}
        {showFAQs && (
          <Card className="lg:col-span-1 flex flex-col min-h-0 max-h-[600px] lg:max-h-full" style={{ borderColor: `${GOLD}33` }}>
            <CardHeader className="pb-3 flex-shrink-0">
              <CardTitle className="text-base md:text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" style={{ color: GOLD }} />
                FAQs
              </CardTitle>
            </CardHeader>
            <Separator className="flex-shrink-0" />
            <div className="flex-1 overflow-y-auto p-4 min-h-0">
              {selectedCategory === null ? (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground mb-3">Browse by Category</p>
                  {faqCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <Button
                        key={category.id}
                        variant="outline"
                        className="w-full justify-start text-sm"
                        onClick={() => setSelectedCategory(category.id)}
                        style={{ borderColor: `${GOLD}33` }}
                      >
                        <Icon className="mr-2 h-4 w-4 flex-shrink-0" style={{ color: GOLD }} />
                        <span className="flex-1 text-left">{category.title}</span>
                        <ChevronRight className="h-4 w-4 flex-shrink-0" />
                      </Button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCategory(null)}
                    className="mb-2"
                  >
                    ← Back to Categories
                  </Button>
                  <Separator />
                  {faqCategories
                    .find((cat) => cat.id === selectedCategory)
                    ?.questions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start text-left h-auto py-3 px-3"
                        onClick={() => handleFAQClick(question)}
                        style={{ borderColor: `${GOLD}33` }}
                      >
                        <HelpCircle className="mr-2 h-4 w-4 flex-shrink-0" style={{ color: GOLD }} />
                        <span className="text-sm">{question}</span>
                      </Button>
                    ))}
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
