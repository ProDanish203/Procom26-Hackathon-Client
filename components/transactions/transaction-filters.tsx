'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface TransactionFiltersProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    categories: string[];
}

export function TransactionFilters({
    searchTerm,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    categories,
}: TransactionFiltersProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-2 relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-gold transition-colors" />
                    <Input
                        placeholder="Search merchants or reference numbers..."
                        className="pl-11 h-14 border-2 rounded-2xl focus-visible:ring-gold bg-white shadow-sm border-gold/10"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
                <div className="lg:col-span-2 flex items-center p-1.5 bg-gray-100 rounded-2xl border-2 overflow-x-auto scrollbar-hide border-gold/10">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => onCategoryChange(cat)}
                            className={cn(
                                "px-6 py-2.5 rounded-xl transition-all font-black uppercase text-[10px] tracking-widest whitespace-nowrap",
                                selectedCategory === cat
                                    ? "bg-black text-white shadow-lg scale-[1.02]"
                                    : "text-gray-500 hover:text-black"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
