import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, TrendingUp, ShieldCheck } from "lucide-react";
import Link from 'next/link';

const GOLD = '#D4AF37';

interface AccountCardProps {
    type: string;
    accountNumber: string;
    iban: string;
    balance: string;
    interestRate?: string;
    status: "Active" | "Inactive";
}

export function AccountCard({ type, accountNumber, iban, balance, interestRate, status }: AccountCardProps) {
    return (
        <Card className="h-full flex flex-col bg-white border-2 hover:shadow-xl transition-all duration-300" style={{ borderColor: `${GOLD}33` }}>
            <div className="h-1.5 w-full" style={{ backgroundColor: GOLD }} />
            <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
                <div>
                    <CardTitle className="text-xl font-bold text-black">{type}</CardTitle>
                    <p className="text-xs text-gray-500 font-mono mt-1">{accountNumber}</p>
                </div>
                <Badge className="font-bold border-none" style={{ backgroundColor: GOLD, color: 'white' }}>
                    {status}
                </Badge>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col space-y-6">
                <div className="space-y-1">
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Available Balance</p>
                    <p className="text-3xl font-black text-black">{balance}</p>
                </div>

                <div className="space-y-3 pt-4 border-t" style={{ borderColor: `${GOLD}1a` }}>
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400 font-bold uppercase">IBAN</span>
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] text-gray-600 truncate max-w-[150px]">{iban}</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-gold">
                                <Copy className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>
                    {interestRate && (
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400 font-bold uppercase">APY / Interest</span>
                            <div className="flex items-center gap-1.5 font-bold" style={{ color: GOLD }}>
                                <TrendingUp className="h-3.5 w-3.5" />
                                <span>{interestRate}</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-auto pt-4 flex gap-2">
                    <Button asChild className="flex-1 font-bold text-white shadow-md hover:opacity-90 transition-opacity" style={{ backgroundColor: GOLD }}>
                        <Link href="/statements">Statements</Link>
                    </Button>
                    <Button asChild variant="outline" className="flex-1 font-bold" style={{ borderColor: GOLD, color: GOLD }}>
                        <Link href="/transactions">History</Link>
                    </Button>
                </div>

                <div className="flex items-center justify-center gap-1.5 opacity-40">
                    <ShieldCheck className="h-3 w-3" style={{ color: GOLD }} />
                    <span className="text-[9px] text-black font-bold uppercase tracking-widest">Secure JSBL Banking</span>
                </div>
            </CardContent>
        </Card>
    );
}
