'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GOLD } from './constants';
import { MessageList } from './message-list';
import { QuickActions } from './quick-actions';
import { ChatInput } from './chat-input';
import type { Message } from '@/lib/chat';

interface ChatCardProps {
  className?: string;
  messages: Message[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onQuickAction: (label: string) => void;
  isRecording: boolean;
  onToggleVoice: () => void;
  connected: boolean;
  sending?: boolean;
}

export function ChatCard({
  className,
  messages,
  inputValue,
  onInputChange,
  onSend,
  onQuickAction,
  isRecording,
  onToggleVoice,
  connected,
  sending = false,
}: ChatCardProps) {
  return (
    <Card
      className={cn('flex flex-col min-h-0', className)}
      style={{ borderColor: `${GOLD}33` }}
    >
      <CardHeader className="pb-3 shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base md:text-lg flex items-center gap-2">
            <Bot className="h-5 w-5" style={{ color: GOLD }} />
            Chat
          </CardTitle>
          <Badge
            variant="outline"
            style={{
              borderColor: GOLD,
              color: GOLD,
            }}
          >
            <div
              className={`h-2 w-2 rounded-full mr-2 ${connected ? 'animate-pulse' : ''}`}
              style={{ backgroundColor: connected ? GOLD : 'currentColor' }}
            />
            {connected ? 'Online' : 'Offline'}
          </Badge>
        </div>
      </CardHeader>

      <Separator className="shrink-0" />

      <QuickActions onAction={onQuickAction} />

      <MessageList messages={messages} />

      <Separator className="shrink-0" />

      <ChatInput
        value={inputValue}
        onChange={onInputChange}
        onSend={onSend}
        isRecording={isRecording}
        onToggleVoice={onToggleVoice}
        disabled={!connected || sending}
      />
    </Card>
  );
}
