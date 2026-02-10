'use client';

import { useState } from 'react';
import {
    CreditCard,
    Plus,
    Layers,
    Gift,
    Sparkles,
    ArrowRight,
    TrendingUp,
    Download,
    Lock,
    Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FinancialPageHeader } from '@/components/shared/financial/financial-page-header';
import { VisualCard } from '@/components/cards/visual-card';
import { BalanceDetailsCard } from '@/components/cards/balance-details-card';
import { SecuritySettingsCard } from '@/components/cards/security-settings-card';
import { cn } from '@/lib/utils';

// Mock Data for Cards
const cards = [
    {
        id: 1,
        type: 'Debit',
        network: 'Visa Gold',
        number: '4532 1298 7654 3210',
        expiry: '12/28',
        cvv: '998',
        holder: 'ARIAN AHMED',
        status: 'Active',
        limit: 500000,
        spent: 125000,
        balance: 'Rs. 125,430.00',
    },
    {
        id: 2,
        type: 'Credit',
        network: 'MasterCard Platinum',
        number: '5412 8876 2233 4455',
        expiry: '08/30',
        cvv: '123',
        holder: 'ARIAN AHMED',
        status: 'Active',
        limit: 1000000,
        spent: 45000,
        rewards: 12450,
        balance: 'Rs. 45,200.00',
        minPayment: 'Rs. 2,260.00',
        dueDate: 'Feb 25, 2026',
    }
];

export default function CardsPage() {
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const [showNumbers, setShowNumbers] = useState(false);

    const currentCard = cards[activeCardIndex];

    return (
        <main className="flex-1 space-y-10 p-2 md:p-6 animate-in fade-in duration-700 bg-background">
            <FinancialPageHeader
                title="Card SERVICES"
                description="Ultimate control over your physical and virtual assets."
                icon={CreditCard}
                action={{
                    label: "Request New Card",
                    icon: Plus,
                    onClick: () => console.log("Request card")
                }}
            />

            <div className="grid gap-10 lg:grid-cols-2">
                <div className="space-y-8">
                    <div className="grid grid-cols-2 p-1.5 bg-muted rounded-2xl border-2 border-gold/10">
                        {cards.map((card, idx) => (
                            <button
                                key={card.id}
                                onClick={() => setActiveCardIndex(idx)}
                                className={cn(
                                    "py-4 rounded-xl transition-all font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2",
                                    activeCardIndex === idx
                                        ? "bg-gold text-black shadow-2xl scale-[1.02]"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                )}
                            >
                                <Layers className={cn("h-4 w-4", activeCardIndex === idx ? "text-black" : "text-muted-foreground")} />
                                {card.type} CARD
                            </button>
                        ))}
                    </div>

                    {currentCard.type === 'Credit' ? (
                        <div className="bg-black rounded-2xl p-6 border-2 shadow-xl flex items-center justify-between group overflow-hidden relative border-gold/40">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                                <Gift className="h-16 w-16 text-white" />
                            </div>
                            <div className="space-y-1 relative z-10">
                                <p className="text-[10px] font-black uppercase text-gold tracking-[0.2em] flex items-center gap-2">
                                    <Sparkles className="h-3 w-3" /> Loyalty Portfolio
                                </p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-black text-white tracking-tighter">{currentCard.rewards?.toLocaleString()}</span>
                                    <span className="text-xs font-black text-gold uppercase">Points</span>
                                </div>
                            </div>
                            <Button className="bg-white text-black font-black uppercase text-[10px] h-10 px-6 rounded-lg hover:bg-gold transition-colors relative z-10">
                                Redeem <ArrowRight className="ml-2 h-3 w-3" />
                            </Button>
                        </div>
                    ) : (
                        <div className="bg-card rounded-2xl p-6 border-2 shadow-md flex items-center justify-between group border-gold/10">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em] flex items-center gap-2">
                                    <TrendingUp className="h-3 w-3 text-gold" /> Monthly Utilization
                                </p>
                                <p className="text-2xl font-black text-foreground">Rs. 45,200</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <div className="h-2 w-32 bg-muted rounded-full overflow-hidden border border-border">
                                    <div className="h-full bg-gold rounded-full" style={{ width: '35%' }} />
                                </div>
                                <Button variant="ghost" className="h-8 px-0 text-[10px] font-black uppercase text-gold hover:bg-transparent">
                                    <Download className="mr-2 h-3 w-3" /> Statement
                                </Button>
                            </div>
                        </div>
                    )}

                    <VisualCard
                        {...currentCard}
                        showNumbers={showNumbers}
                        onToggleNumbers={() => setShowNumbers(!showNumbers)}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Button className="bg-gold text-black font-black uppercase h-14 rounded-2xl border-2 border-gold hover:bg-gold/90 transition-all">
                            <Lock className="mr-2 h-4 w-4" /> Block Card
                        </Button>
                        <Button variant="outline" className="font-black uppercase h-14 rounded-2xl border-2 border-gold/20 text-gold hover:bg-gold/10">
                            <Settings className="mr-2 h-4 w-4" /> Manage PIN
                        </Button>
                    </div>
                </div>

                <div className="space-y-10">
                    <BalanceDetailsCard
                        balance={currentCard.balance}
                        status={currentCard.status}
                        type={currentCard.type}
                        minPayment={currentCard.minPayment}
                        dueDate={currentCard.dueDate}
                        onSettle={() => console.log("Settle payment")}
                    />

                    <SecuritySettingsCard
                        limit={currentCard.limit}
                        onLimitChange={(v) => console.log("Limit change", v)}
                    />
                </div>
            </div>
        </main>
    );
}
