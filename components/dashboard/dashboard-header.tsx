'use client';

import { LayoutDashboard } from "lucide-react";

interface DashboardHeaderProps {
    userName: string;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gold/20">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 uppercase font-bold text-[10px] tracking-wider text-gold">
                    Personalized Banking Experience
                </div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight flex items-center gap-3 text-gold">
                    <LayoutDashboard className="h-8 w-8" />
                    DASHBOARD
                </h1>
                <p className="text-sm font-medium text-muted-foreground">
                    Welcome back, <span className="font-bold text-foreground">{userName}</span>
                </p>
            </div>
            <div className="flex items-center gap-3 bg-card p-3 rounded-xl border-2 shadow-sm border-gold/20">
                <div className="p-2 rounded-lg bg-gold/10">
                    <LayoutDashboard className="h-5 w-5 text-gold" />
                </div>
                <div>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase leading-none mb-1">Last Login</p>
                    <p className="text-xs font-bold text-foreground leading-none">Today, 10:45 AM</p>
                </div>
            </div>
        </div>
    );
}
