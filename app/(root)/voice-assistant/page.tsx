'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  Mic,
  MicOff,
  Volume2,
  Settings,
  Sparkles,
  MessageSquare,
  Zap,
  Clock,
  User,
  Bot,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const GOLD = 'rgb(212, 175, 55)';

interface Transcript {
  id: number;
  type: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

const quickCommands = [
  { id: 1, command: 'Check my balance', icon: Zap },
  { id: 2, command: 'Show recent transactions', icon: MessageSquare },
  { id: 3, command: 'What are my active EMIs?', icon: Clock },
  { id: 4, command: 'Help me with payments', icon: Sparkles },
];

const voiceCommandReference = [
  { category: 'Account', commands: ['Check balance', 'View account details', 'Update profile'] },
  { category: 'Transactions', commands: ['Show transactions', 'Search transaction', 'Download statement'] },
  { category: 'EMI', commands: ['Active EMIs', 'Convert to EMI', 'EMI calculator'] },
  { category: 'Payments', commands: ['Pay bills', 'Transfer money', 'Schedule payment'] },
];

export default function VoiceAssistantPage() {
  const [isListening, setIsListening] = useState(false);
  const [transcripts, setTranscripts] = useState<Transcript[]>([
    {
      id: 1,
      type: 'assistant',
      text: 'Hello! I\'m your voice assistant. Press the microphone to start speaking.',
      timestamp: new Date(),
    },
  ]);
  const [showSettings, setShowSettings] = useState(false);
  const [language, setLanguage] = useState('en-US');
  const [voicePreference, setVoicePreference] = useState('female');
  const [listeningDuration, setListeningDuration] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcripts]);

  useEffect(() => {
    if (isListening) {
      intervalRef.current = setInterval(() => {
        setListeningDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setListeningDuration(0);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isListening]);

  const toggleListening = () => {
    if (!isListening) {
      setIsListening(true);
      // Simulate voice recognition
      setTimeout(() => {
        const userTranscript: Transcript = {
          id: transcripts.length + 1,
          type: 'user',
          text: 'What is my account balance?',
          timestamp: new Date(),
        };
        setTranscripts((prev) => [...prev, userTranscript]);
        
        setTimeout(() => {
          const assistantTranscript: Transcript = {
            id: transcripts.length + 2,
            type: 'assistant',
            text: 'Your current account balance is ₹45,230. You have 2 active EMIs with a total monthly obligation of ₹12,825.',
            timestamp: new Date(),
          };
          setTranscripts((prev) => [...prev, assistantTranscript]);
          setIsListening(false);
        }, 1500);
      }, 3000);
    } else {
      setIsListening(false);
    }
  };

  const handleQuickCommand = (command: string) => {
    const userTranscript: Transcript = {
      id: transcripts.length + 1,
      type: 'user',
      text: command,
      timestamp: new Date(),
    };
    setTranscripts((prev) => [...prev, userTranscript]);

    setTimeout(() => {
      const assistantTranscript: Transcript = {
        id: transcripts.length + 2,
        type: 'assistant',
        text: generateResponse(command),
        timestamp: new Date(),
      };
      setTranscripts((prev) => [...prev, assistantTranscript]);
    }, 1000);
  };

  const generateResponse = (command: string): string => {
    const cmd = command.toLowerCase();
    if (cmd.includes('balance')) {
      return 'Your current account balance is ₹45,230.';
    } else if (cmd.includes('transaction')) {
      return 'Your last 5 transactions: Amazon ₹2,500, Starbucks ₹450, Uber ₹320, Netflix ₹799, Zomato ₹680.';
    } else if (cmd.includes('emi')) {
      return 'You have 2 active EMIs. Samsung: ₹5,625/month (8 remaining), Sony: ₹7,200/month (3 remaining).';
    } else if (cmd.includes('payment')) {
      return 'I can help you with bill payments, money transfers, or scheduled payments. What would you like to do?';
    }
    return 'I understand. How can I assist you further?';
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${GOLD}1a`, border: `1px solid ${GOLD}33` }}>
            <Volume2 className="h-5 w-5 md:h-6 md:w-6" style={{ color: GOLD }} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold" style={{ color: GOLD }}>
              Voice Assistant
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground">Speak naturally, I'll understand</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSettings(!showSettings)}
          style={{ borderColor: `${GOLD}80` }}
          className="w-fit"
        >
          <Settings className="mr-2 h-4 w-4" />
          {showSettings ? 'Hide' : 'Show'} Settings
        </Button>
      </div>

      <div className="flex-1 grid gap-4 lg:grid-cols-4 min-h-0">
        {/* Main Voice Area */}
        <Card className={cn('flex flex-col min-h-0', showSettings ? 'lg:col-span-3' : 'lg:col-span-4')} style={{ borderColor: `${GOLD}33` }}>
          <CardHeader className="pb-3 flex-shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base md:text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5" style={{ color: GOLD }} />
                Voice Interaction
              </CardTitle>
              <Badge variant="outline" style={{ borderColor: GOLD, color: GOLD }}>
                {language === 'en-US' ? 'English (US)' : language === 'en-GB' ? 'English (UK)' : 'Hindi'}
              </Badge>
            </div>
          </CardHeader>

          <Separator className="flex-shrink-0" />

          {/* Central Microphone */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-8 min-h-0">
            <div className="relative">
              {/* Pulse Animation */}
              {isListening && (
                <>
                  <div className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: `${GOLD}40` }} />
                  <div className="absolute inset-0 rounded-full animate-pulse" style={{ backgroundColor: `${GOLD}20` }} />
                </>
              )}
              
              {/* Microphone Button */}
              <Button
                size="icon"
                onClick={toggleListening}
                className={cn(
                  'relative h-24 w-24 md:h-32 md:w-32 rounded-full transition-all duration-300',
                  isListening ? 'scale-110' : 'hover:scale-105'
                )}
                style={{ backgroundColor: GOLD }}
              >
                {isListening ? (
                  <MicOff className="h-12 w-12 md:h-16 md:w-16 text-black" />
                ) : (
                  <Mic className="h-12 w-12 md:h-16 md:w-16 text-black" />
                )}
              </Button>
            </div>

            <div className="mt-6 text-center space-y-2">
              {isListening ? (
                <>
                  <p className="text-lg md:text-xl font-semibold animate-pulse" style={{ color: GOLD }}>
                    Listening...
                  </p>
                  <p className="text-sm text-muted-foreground">{formatDuration(listeningDuration)}</p>
                  <p className="text-xs text-muted-foreground">Speak clearly into your microphone</p>
                </>
              ) : (
                <>
                  <p className="text-lg md:text-xl font-semibold">Tap to speak</p>
                  <p className="text-sm text-muted-foreground">Press and hold the microphone button</p>
                </>
              )}
            </div>
          </div>

          <Separator className="flex-shrink-0" />

          {/* Quick Commands */}
          <div className="px-4 py-3 border-b flex-shrink-0">
            <p className="text-xs font-medium text-muted-foreground mb-2">Quick Voice Commands</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {quickCommands.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickCommand(item.command)}
                    className="text-xs justify-start"
                    style={{ borderColor: `${GOLD}33` }}
                  >
                    <Icon className="mr-1.5 h-3.5 w-3.5 flex-shrink-0" style={{ color: GOLD }} />
                    <span className="truncate">{item.command}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Conversation History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 max-h-64">
            <p className="text-xs font-medium text-muted-foreground mb-2">Conversation History</p>
            {transcripts.map((transcript) => (
              <div
                key={transcript.id}
                className={cn(
                  'flex gap-3',
                  transcript.type === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {transcript.type === 'assistant' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${GOLD}1a`, border: `1px solid ${GOLD}33` }}>
                    <Bot className="h-4 w-4" style={{ color: GOLD }} />
                  </div>
                )}
                
                <div
                  className={cn(
                    'max-w-[85%] sm:max-w-[80%] md:max-w-[70%] rounded-lg px-3 py-2',
                    transcript.type === 'user' ? 'text-black' : 'border'
                  )}
                  style={
                    transcript.type === 'user'
                      ? { backgroundColor: GOLD }
                      : { borderColor: `${GOLD}33`, backgroundColor: `${GOLD}0d` }
                  }
                >
                  <p className="text-sm leading-relaxed break-words">{transcript.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {transcript.timestamp.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>

                {transcript.type === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-muted">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </Card>

        {/* Settings & Reference Sidebar */}
        {showSettings && (
          <Card className="lg:col-span-1 flex flex-col min-h-0 max-h-[600px] lg:max-h-full" style={{ borderColor: `${GOLD}33` }}>
            <CardHeader className="pb-3 flex-shrink-0">
              <CardTitle className="text-base md:text-lg flex items-center gap-2">
                <Settings className="h-5 w-5" style={{ color: GOLD }} />
                Settings & Reference
              </CardTitle>
            </CardHeader>
            <Separator className="flex-shrink-0" />
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6 min-h-0">
              {/* Settings */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold">Voice Settings</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-xs">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language" className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="en-GB">English (UK)</SelectItem>
                      <SelectItem value="hi-IN">Hindi</SelectItem>
                      <SelectItem value="es-ES">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="voice" className="text-xs">Voice Preference</Label>
                  <Select value={voicePreference} onValueChange={setVoicePreference}>
                    <SelectTrigger id="voice" className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="female">Female Voice</SelectItem>
                      <SelectItem value="male">Male Voice</SelectItem>
                      <SelectItem value="neutral">Neutral Voice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  style={{ borderColor: `${GOLD}33` }}
                >
                  <Volume2 className="mr-2 h-4 w-4" style={{ color: GOLD }} />
                  Test Voice
                </Button>
              </div>

              <Separator />

              {/* Command Reference */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold">Voice Commands Reference</h3>
                {voiceCommandReference.map((ref, index) => (
                  <div key={index} className="space-y-2">
                    <p className="text-xs font-medium" style={{ color: GOLD }}>{ref.category}</p>
                    <ul className="space-y-1">
                      {ref.commands.map((cmd, cmdIndex) => (
                        <li key={cmdIndex} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <div className="mt-1 h-1 w-1 rounded-full flex-shrink-0" style={{ backgroundColor: GOLD }} />
                          <span>"{cmd}"</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
