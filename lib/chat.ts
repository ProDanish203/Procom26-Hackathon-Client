export function getChatSocketUrl(): string {
  if (typeof window === 'undefined') {
    const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    try {
      return new URL(base).origin;
    } catch {
      return 'http://localhost:8000';
    }
  }
  try {
    const base = process.env.NEXT_PUBLIC_API_URL || window.location.origin;
    return new URL(base).origin;
  } catch {
    return window.location.origin;
  }
}

export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export interface BotReply {
  text: string;
  timestamp: string;
}
