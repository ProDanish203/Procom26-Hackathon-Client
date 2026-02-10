'use client';

import { Users, Plus, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Participant {
    id: number;
    name: string;
    share: number;
}

interface ParticipantSelectorProps {
    participants: Participant[];
    onAdd: () => void;
    onRemove: (id: number) => void;
    onNameChange: (id: number, name: string) => void;
}

export function ParticipantSelector({
    participants,
    onAdd,
    onRemove,
    onNameChange,
}: ParticipantSelectorProps) {
    return (
        <Card className="border-4 bg-card rounded-[40px] overflow-hidden shadow-2xl border-gold">
            <CardHeader className="p-6 md:p-8 border-b-2 border-gold/10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <CardTitle className="text-lg md:text-xl font-black uppercase text-foreground flex items-center gap-3">
                        <Users className="h-5 md:h-6 w-5 md:w-6 text-gold" /> Add Members
                    </CardTitle>
                    <Button
                        onClick={onAdd}
                        className="w-full sm:w-auto bg-gold text-black px-6 font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-gold/90 transition-all h-10"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Participant
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {participants.map((p, idx) => (
                        <div key={p.id} className="relative group p-4 md:p-6 rounded-3xl border-2 hover:border-gold/50 bg-muted/50 hover:bg-card transition-all border-gold/10">
                            <button
                                onClick={() => onRemove(p.id)}
                                className="absolute top-3 md:top-4 right-3 md:right-4 p-1.5 bg-red-500/10 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                            >
                                <X className="h-3 w-3" />
                            </button>

                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gold/10 text-gold border-2 border-gold/20 flex items-center justify-center font-black text-base md:text-lg shadow-lg group-hover:scale-110 transition-transform shrink-0">
                                    {String.fromCharCode(65 + idx)}
                                </div>
                                <div className="flex-1 space-y-1 min-w-0">
                                    <p className="font-black text-[10px] uppercase text-muted-foreground tracking-widest">Member {idx + 1}</p>
                                    <Input
                                        value={p.name}
                                        onChange={(e) => onNameChange(p.id, e.target.value)}
                                        className="h-8 md:h-10 border-none bg-transparent p-0 text-lg md:text-xl font-black uppercase tracking-tight focus-visible:ring-0 text-foreground"
                                        placeholder="Enter Name"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
