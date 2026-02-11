'use client';

import { MessageCircle, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GOLD } from './constants';

interface ChatHeaderProps {
  showFAQs: boolean;
  onToggleFAQs: () => void;
}

export function ChatHeader({ showFAQs, onToggleFAQs }: ChatHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
      <div className="flex items-center gap-3">
        <div
          className="p-2 rounded-lg"
          style={{ backgroundColor: `${GOLD}1a`, border: `1px solid ${GOLD}33` }}
        >
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
        onClick={onToggleFAQs}
        style={{ borderColor: `${GOLD}80` }}
        className="w-fit"
      >
        <HelpCircle className="mr-2 h-4 w-4" />
        {showFAQs ? 'Hide' : 'Show'} FAQs
      </Button>
    </div>
  );
}
