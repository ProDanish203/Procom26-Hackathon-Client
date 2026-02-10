'use client';

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FinancialPageHeaderProps {
    title: string;
    description: string;
    icon: LucideIcon;
    subtitle?: string;
    subtitleIcon?: LucideIcon;
    action?: {
        label: string;
        icon: LucideIcon;
        onClick: () => void;
    };
}

export function FinancialPageHeader({
    title,
    description,
    icon: Icon,
    subtitle,
    subtitleIcon: SubtitleIcon,
    action,
}: FinancialPageHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gold/20">
            <div className="flex flex-col gap-1">
                {subtitle && (
                    <div className="flex items-center gap-2 uppercase font-bold text-[10px] tracking-wider text-gold">
                        {SubtitleIcon && <SubtitleIcon className="h-4 w-4" />}
                        {subtitle}
                    </div>
                )}
                <h1 className="text-3xl md:text-4xl font-black tracking-tight flex items-center gap-3 uppercase text-gold">
                    <div className="p-3 rounded-2xl bg-black shadow-xl border border-gold/20 flex items-center justify-center shrink-0">
                        <Icon className="h-7 w-7 text-gold" />
                    </div>
                    {title}
                </h1>
                <p className="text-sm font-medium text-gray-500">{description}</p>
            </div>
            {action && (
                <Button
                    onClick={action.onClick}
                    className="font-black uppercase text-[10px] tracking-widest bg-gold text-white shadow-xl hover:opacity-90 h-11 px-6 rounded-xl transition-all"
                >
                    <action.icon className="mr-2 h-4 w-4" /> {action.label}
                </Button>
            )}
        </div>
    );
}
