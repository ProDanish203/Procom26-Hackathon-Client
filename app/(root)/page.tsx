'use client';

import { useAuthStore } from '@/store/auth.store';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <main className="container px-4 py-8">
      <Suspense fallback={<Skeleton className="h-10 w-full" />}>
        <div>
          <h1>Welcome {user.name}</h1>
        </div>
      </Suspense>
    </main>
  );
}
