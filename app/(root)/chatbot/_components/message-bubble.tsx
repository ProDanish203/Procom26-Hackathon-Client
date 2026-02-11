'use client';

import type { ReactNode } from 'react';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { GOLD } from './constants';
import type { Message } from '@/lib/chat';

interface MessageBubbleProps {
  message: Message;
}

const markdownComponents = {
  p: ({ children }: { children?: ReactNode }) => <p className="mb-2 last:mb-0">{children}</p>,
  ul: ({ children }: { children?: ReactNode }) => <ul className="list-disc list-inside mb-2 space-y-0.5">{children}</ul>,
  ol: ({ children }: { children?: ReactNode }) => <ol className="list-decimal list-inside mb-2 space-y-0.5">{children}</ol>,
  li: ({ children }: { children?: ReactNode }) => <li className="text-sm">{children}</li>,
  strong: ({ children }: { children?: ReactNode }) => <strong className="font-semibold">{children}</strong>,
  em: ({ children }: { children?: ReactNode }) => <em>{children}</em>,
  code: ({ children }: { children?: ReactNode }) => (
    <code className="rounded bg-black/10 px-1 py-0.5 text-xs font-mono">{children}</code>
  ),
  pre: ({ children }: { children?: ReactNode }) => <pre className="overflow-x-auto rounded p-2 bg-black/10 text-xs my-2">{children}</pre>,
  h1: ({ children }: { children?: ReactNode }) => <h1 className="text-base font-semibold mt-2 mb-1">{children}</h1>,
  h2: ({ children }: { children?: ReactNode }) => <h2 className="text-sm font-semibold mt-2 mb-1">{children}</h2>,
  h3: ({ children }: { children?: ReactNode }) => <h3 className="text-sm font-medium mt-1 mb-0.5">{children}</h3>,
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.type === 'user';
  const timestamp = message.timestamp instanceof Date
    ? message.timestamp
    : new Date(message.timestamp);

  return (
    <div
      className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${GOLD}1a`, border: `1px solid ${GOLD}33` }}
        >
          <Bot className="h-4 w-4" style={{ color: GOLD }} />
        </div>
      )}

      <div
        className={`max-w-[85%] sm:max-w-[80%] md:max-w-[70%] rounded-lg px-3 md:px-4 py-2.5 ${
          isUser ? 'text-black' : 'border'
        }`}
        style={
          isUser
            ? { backgroundColor: GOLD }
            : { borderColor: `${GOLD}33`, backgroundColor: `${GOLD}0d` }
        }
      >
        {isUser ? (
          <p className="text-sm leading-relaxed wrap-break-word">{message.content}</p>
        ) : (
          <div className="text-sm leading-relaxed wrap-break-word [&>*:last-child]:mb-0">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {message.content}
            </ReactMarkdown>
          </div>
        )}
        <p className="text-xs mt-1 opacity-70">
          {timestamp.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>

      {isUser && (
        <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-muted">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}
