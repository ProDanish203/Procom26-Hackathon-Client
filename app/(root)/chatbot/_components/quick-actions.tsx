'use client';

import { Button } from '@/components/ui/button';
import { quickActions, GOLD } from './constants';

interface QuickActionsProps {
  onAction: (label: string) => void;
}

export function QuickActions({ onAction }: QuickActionsProps) {
  return (
    <div className="px-4 py-3 border-b shrink-0">
      <p className="text-xs font-medium text-muted-foreground mb-2">Quick Actions</p>
      <div className="flex flex-wrap gap-2">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.id}
              variant="outline"
              size="sm"
              onClick={() => onAction(action.label)}
              className="text-xs"
              style={{ borderColor: `${GOLD}33` }}
            >
              <Icon className="mr-1.5 h-3.5 w-3.5" style={{ color: GOLD }} />
              {action.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
