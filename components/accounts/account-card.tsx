import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, TrendingUp, ShieldCheck, Eye } from "lucide-react";
import Link from 'next/link';

interface AccountCardProps {
    id: string;
    type: string;
    accountNumber: string;
    iban: string;
    balance: string;
    interestRate?: string;
    status: "Active" | "Inactive" | "Frozen" | "Closed" | "Blocked";
}

const getStatusStyle = (status: AccountCardProps['status']) => {
    switch (status) {
        case 'Active':
            return 'bg-green-500 text-white';
        case 'Inactive':
            return 'bg-gray-500 text-white';
        case 'Frozen':
            return 'bg-blue-500 text-white';
        case 'Closed':
            return 'bg-red-500 text-white';
        case 'Blocked':
            return 'bg-orange-500 text-white';
        default:
            return 'bg-gold text-black';
    }
};

export function AccountCard({ id, type, accountNumber, iban, balance, interestRate, status }: AccountCardProps) {
    return (
        <Card className="h-full flex flex-col bg-card border-2 border-gold/20 hover:shadow-xl hover:border-gold/40 transition-all duration-300">
            <div className="h-1.5 w-full bg-gold" />
            <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
                <div>
                    <CardTitle className="text-xl font-bold text-foreground">{type}</CardTitle>
                    <p className="text-xs text-muted-foreground font-mono mt-1">{accountNumber}</p>
                </div>
                <Badge className={`font-bold border-none ${getStatusStyle(status)}`}>
                    {status}
                </Badge>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col space-y-6">
                <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Available Balance</p>
                    <p className="text-3xl font-black text-foreground">{balance}</p>
                </div>

                <div className="space-y-3 pt-4 border-t border-gold/10">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground font-bold uppercase">IBAN</span>
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] text-muted-foreground truncate max-w-[150px]">{iban}</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-gold">
                                <Copy className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>
                    {interestRate && (
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground font-bold uppercase">APY / Interest</span>
                            <div className="flex items-center gap-1.5 font-bold text-gold">
                                <TrendingUp className="h-3.5 w-3.5" />
                                <span>{interestRate}</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-auto pt-4 flex gap-2">
                    <Button asChild className="flex-1 font-bold bg-gold text-black hover:bg-gold/90 shadow-md transition-opacity">
                        <Link href={`/accounts/${id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="flex-1 font-bold border-gold text-gold hover:bg-gold/10">
                        <Link href="/transactions">History</Link>
                    </Button>
                </div>

                <div className="flex items-center justify-center gap-1.5 opacity-40">
                    <ShieldCheck className="h-3 w-3 text-gold" />
                    <span className="text-[9px] text-foreground font-bold uppercase tracking-widest">Secure JSBL Banking</span>
                </div>
            </CardContent>
        </Card>
    );
}
