'use client';

import { Button } from "@/components/ui/button";
import { MessageCircle, Mic } from "lucide-react";

export function ChatbotWidget() {
    return (
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
            <Button
                size="icon"
                className="h-12 w-12 rounded-full text-white shadow-xl hover:scale-110 active:scale-95 transition-all bg-[#222]"
            >
                <Mic className="h-6 w-6" />
            </Button>
            <Button
                size="icon"
                className="h-14 w-14 rounded-full text-white shadow-2xl hover:scale-110 active:scale-95 transition-all animate-bounce-slow bg-gold shadow-gold/40 hover:shadow-gold/50"
            >
                <MessageCircle className="h-7 w-7" />
            </Button>
        </div>
    );
}
