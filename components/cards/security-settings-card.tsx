'use client';

import { ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface SecuritySettingsCardProps {
    limit: number;
    onLimitChange?: (val: number[]) => void;
}

export function SecuritySettingsCard({ limit, onLimitChange }: SecuritySettingsCardProps) {
    return (
        <Card className="border-2 shadow-sm bg-white border-gold/10">
            <CardHeader className="pb-4 border-b border-gold/5">
                <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-gold" />
                    Security Settings
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <Label className="font-bold text-black uppercase text-xs">Online Payments</Label>
                        <p className="text-[10px] text-gray-500 font-medium italic">Required for E-commerce</p>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-gold" />
                </div>

                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <Label className="font-bold text-black uppercase text-xs">International Access</Label>
                        <p className="text-[10px] text-gray-500 font-medium italic">Global ATM & POS usage</p>
                    </div>
                    <Switch className="data-[state=checked]:bg-gold" />
                </div>

                <div className="space-y-5 pt-4 border-t border-dashed border-gold/30">
                    <div className="flex justify-between items-center font-black text-xs uppercase text-gray-700">
                        <span>Usage Limit</span>
                        <span className="text-gold">Rs. {limit.toLocaleString()}</span>
                    </div>
                    <Slider
                        defaultValue={[limit / 2]}
                        max={limit}
                        step={5000}
                        onValueChange={onLimitChange}
                        className="[&_[role=slider]]:bg-gold [&_[role=slider]]:border-gold"
                    />
                </div>
            </CardContent>
        </Card>
    );
}
