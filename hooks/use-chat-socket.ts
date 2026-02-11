'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/store/auth.store';
import { getChatSocketUrl } from '@/lib/chat';

export interface UseChatSocketOptions {
  onBotMessage?: (data: { text: string; timestamp: string }) => void;
  onError?: (message: string) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export function useChatSocket(options: UseChatSocketOptions = {}) {
  const { onBotMessage, onError, onConnect, onDisconnect } = options;
  const token = useAuthStore((s) => s.token);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const callbacksRef = useRef({ onBotMessage, onError, onConnect, onDisconnect });
  callbacksRef.current = { onBotMessage, onError, onConnect, onDisconnect };

  const sendMessage = useCallback((text: string) => {
    const socket = socketRef.current;
    if (!socket?.connected) return;
    socket.emit('send-message', { text: text.trim() });
  }, []);

  useEffect(() => {
    if (!token || typeof window === 'undefined') {
      setConnected(false);
      return;
    }

    const url = getChatSocketUrl();
    const socket = io(`${url}/chat`, {
      path: '/socket.io',
      auth: { token },
      transports: ['websocket', 'polling'],
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setConnected(true);
      callbacksRef.current.onConnect?.();
    });

    socket.on('disconnect', () => {
      setConnected(false);
      callbacksRef.current.onDisconnect?.();
    });

    socket.on('bot-message', (data: { text: string; timestamp: string }) => {
      callbacksRef.current.onBotMessage?.(data);
    });

    socket.on('error', (data: { message?: string }) => {
      callbacksRef.current.onError?.(data?.message ?? 'Something went wrong');
    });

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
      socketRef.current = null;
      setConnected(false);
    };
  }, [token]);

  return { connected, sendMessage };
}
