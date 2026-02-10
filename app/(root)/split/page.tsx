'use client';

import { useState } from 'react';
import {
    Users,
    Zap,
    History,
    Target,
    TrendingUp
} from 'lucide-react';
import { FinancialPageHeader } from '@/components/shared/financial/financial-page-header';
import { FinancialStatCard } from '@/components/shared/financial/stat-card';
import { BillInput } from '@/components/split/bill-input';
import { ParticipantSelector } from '@/components/split/participant-selector';
import { SplitBreakdown } from '@/components/split/split-breakdown';

export default function SplitBillPage() {
    const [totalAmount, setTotalAmount] = useState('12000');
    const [description, setDescription] = useState('Dinner at Kolachi');
    const [participants, setParticipants] = useState([
        { id: 1, name: 'Taha Ahmed', share: 0 },
        { id: 2, name: 'Zainab Faisal', share: 0 },
        { id: 3, name: 'Usman Ali', share: 0 },
    ]);

    const addParticipant = () => {
        setParticipants([...participants, { id: Date.now(), name: '', share: 0 }]);
    };

    const removeParticipant = (id: number) => {
        if (participants.length > 1) {
            setParticipants(participants.filter(p => p.id !== id));
        }
    };

    const updateName = (id: number, name: string) => {
        setParticipants(participants.map(p => p.id === id ? { ...p, name } : p));
    };

    return (
        <main className="flex-1 space-y-10 p-2 md:p-6 animate-in fade-in duration-700 bg-gray-50/30">
            <FinancialPageHeader
                title="Split Bill"
                description="Effortless expense sharing with real-time settlement tracking."
                icon={Users}
                action={{
                    label: "Split History",
                    icon: History,
                    onClick: () => console.log("View history")
                }}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FinancialStatCard label="Pending Receivables" value="Rs. 45,200" icon={TrendingUp} color="green" />
                <FinancialStatCard label="Total Groups" value="12" icon={Users} color="black" />
                <FinancialStatCard label="Live Splits" value="4" icon={Zap} color="gold" />
            </div>

            <div className="grid gap-10 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-10">
                    <BillInput
                        totalAmount={totalAmount}
                        onAmountChange={setTotalAmount}
                        description={description}
                        onDescriptionChange={setDescription}
                    />

                    <ParticipantSelector
                        participants={participants}
                        onAdd={addParticipant}
                        onRemove={removeParticipant}
                        onNameChange={updateName}
                    />
                </div>

                <div className="space-y-10">
                    <SplitBreakdown
                        totalAmount={Number(totalAmount)}
                        participants={participants}
                        onFinalize={() => console.log("Finalize split")}
                    />
                </div>
            </div>
        </main>
    );
}
