'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, MicOff } from 'lucide-react';
import { GOLD } from './constants';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isRecording: boolean;
  onToggleVoice: () => void;
  disabled?: boolean;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  isRecording,
  onToggleVoice,
  disabled = false,
}: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="p-3 md:p-4 flex-shrink-0">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            ref={inputRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="pr-12 text-sm md:text-base"
            disabled={isRecording || disabled}
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={onToggleVoice}
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
          onClick={onSend}
          disabled={!value.trim() || isRecording || disabled}
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
  );
}
