'use client';

import { useAuthStore } from '@/store/auth.store';
import { ArrowRight, ShieldCheck, Landmark, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const GOLD = '#D4AF37';

export default function Home() {
  const { user } = useAuthStore();

  return (
    <main className="flex flex-1 flex-col items-center justify-center p-6 text-center space-y-12 animate-in fade-in duration-1000 bg-white">
      <div className="space-y-6">
        <div className="flex items-center justify-center mb-4">
          <div className="p-4 rounded-3xl shadow-xl border-2" style={{ borderColor: `${GOLD}33`, backgroundColor: `${GOLD}0d` }}>
            <Landmark className="h-12 w-12" style={{ color: GOLD }} />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-tight" style={{ color: GOLD }}>
            AI-POWERED <br /> PREMIUM BANKING
          </h1>
          <p className="text-base md:text-lg font-medium text-gray-500 max-w-[600px] mx-auto">
            Smart financial management with the gold standard of security and intelligence.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Button asChild size="lg" className="flex-1 font-bold text-white shadow-xl h-14 rounded-xl hover:opacity-90 transition-all" style={{ backgroundColor: GOLD, boxShadow: `0 8px 20px ${GOLD}4d` }}>
          <Link href="/dashboard" className="flex items-center justify-center">
            Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="flex-1 h-14 rounded-xl font-bold border-2" style={{ borderColor: `${GOLD}33`, color: GOLD }}>
          <Link href="/accounts" className="flex items-center justify-center">View Accounts</Link>
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 opacity-60">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4" style={{ color: GOLD }} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-black">JSBL Secured</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4" style={{ color: GOLD }} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-black">AI Recommendations</span>
        </div>
      </div>
    </main>
  );
}
