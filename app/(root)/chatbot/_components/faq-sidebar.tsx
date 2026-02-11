'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FileText, HelpCircle, ChevronRight } from 'lucide-react';
import { faqCategories, GOLD } from './constants';

interface FaqSidebarProps {
  show: boolean;
  selectedCategory: number | null;
  onSelectCategory: (id: number | null) => void;
  onQuestionClick: (question: string) => void;
}

export function FaqSidebar({
  show,
  selectedCategory,
  onSelectCategory,
  onQuestionClick,
}: FaqSidebarProps) {
  if (!show) return null;

  return (
    <Card
      className="lg:col-span-1 flex flex-col min-h-0 max-h-[600px] lg:max-h-full"
      style={{ borderColor: `${GOLD}33` }}
    >
      <CardHeader className="pb-3 flex-shrink-0">
        <CardTitle className="text-base md:text-lg flex items-center gap-2">
          <FileText className="h-5 w-5" style={{ color: GOLD }} />
          FAQs
        </CardTitle>
      </CardHeader>
      <Separator className="shrink-0" />
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        {selectedCategory === null ? (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground mb-3">Browse by Category</p>
            {faqCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant="outline"
                  className="w-full justify-start text-sm"
                  onClick={() => onSelectCategory(category.id)}
                  style={{ borderColor: `${GOLD}33` }}
                >
                  <Icon className="mr-2 h-4 w-4 shrink-0" style={{ color: GOLD }} />
                  <span className="flex-1 text-left">{category.title}</span>
                  <ChevronRight className="h-4 w-4 shrink-0" />
                </Button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSelectCategory(null)}
              className="mb-2"
            >
              ← Back to Categories
            </Button>
            <Separator />
            {faqCategories
              .find((cat) => cat.id === selectedCategory)
              ?.questions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3 px-3"
                  onClick={() => onQuestionClick(question)}
                  style={{ borderColor: `${GOLD}33` }}
                >
                  <HelpCircle className="mr-2 h-4 w-4 shrink-0" style={{ color: GOLD }} />
                  <span className="text-sm">{question}</span>
                </Button>
              ))}
          </div>
        )}
      </div>
    </Card>
  );
}
