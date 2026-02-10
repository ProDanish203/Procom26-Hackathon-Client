'use client';

import { Upload, BrainCircuit } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface UploadSectionProps {
    onUpload: () => void;
    isUploading: boolean;
}

export function UploadSection({ onUpload, isUploading }: UploadSectionProps) {
    return (
        <div className="max-w-3xl mx-auto py-20">
            <Card
                className={cn(
                    "border-4 border-dashed rounded-[40px] p-2 transition-all duration-500 bg-white",
                    isUploading ? "opacity-50 scale-95 border-gold" : "hover:border-gold hover:bg-gold/5 border-gold/33"
                )}
            >
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                    <div className="w-24 h-24 rounded-full bg-gold/10 flex items-center justify-center animate-bounce">
                        <Upload className="h-10 w-10 text-gold" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-black text-black uppercase tracking-tight">Upload Your Statement</h3>
                        <p className="text-sm text-gray-500 max-w-sm mx-auto">Drag and drop your PDF or CSV bank statement here for instant AI analysis.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button onClick={onUpload} disabled={isUploading} className="h-14 px-10 rounded-2xl font-black uppercase tracking-tighter text-white shadow-xl bg-gold">
                            {isUploading ? "Processing..." : "Browse Files"}
                        </Button>
                    </div>
                    {isUploading && (
                        <div className="w-full max-w-md px-10 space-y-2">
                            <Progress value={65} className="h-2 bg-gold/22" />
                            <p className="text-[10px] font-black uppercase text-gold animate-pulse">Running AI OCR & Pattern Recognition...</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}
