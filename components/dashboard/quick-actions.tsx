'use client';

import { Button } from "@/components/ui/button";
import { Send, Receipt, Smartphone, Plus } from "lucide-react";

const actions = [
    { label: "Transfer", icon: Send },
    { label: "Pay Bills", icon: Receipt },
    { label: "Top-up", icon: Smartphone },
    { label: "Add Money", icon: Plus },
];

export function QuickActions() {
    return (
        <div className="flex flex-wrap gap-4 w-full">
            {actions.map((action) => (
                <div key={action.label} className="flex flex-col items-center gap-2">
                    <Button
                        size="icon-lg"
                        className="text-white rounded-xl shadow-md hover:scale-105 transition-all duration-300 w-14 h-14 sm:w-16 sm:h-16 bg-gold shadow-gold/30 hover:shadow-gold/40"
                    >
                        <action.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                    </Button>
                    <span className="text-xs font-bold text-gray-700 uppercase">{action.label}</span>
                </div>
            ))}
        </div>
    );
}
