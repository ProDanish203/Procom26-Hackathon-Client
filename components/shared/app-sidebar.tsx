'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { sidebarNavItems } from '@/lib/navigation';
import { useAuthStore } from '@/store/auth.store';
import { UserRole } from '@/lib/enums';
import { cn } from '@/lib/utils';

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  // Robust role fallback to ensure items are visible even during initialization
  const currentUserRole = user?.role || UserRole.USER;
  const filteredNavItems = sidebarNavItems.filter((item) => {
    if (!item.role) return true; // Show items with no role restriction
    return item.role.includes(currentUserRole as UserRole);
  });

  return (
    <Sidebar collapsible="icon" className="border-r border-gold/10 bg-sidebar shadow-none">
      <SidebarHeader className="px-3 py-6 md:py-8">
        <div className="flex items-center gap-3 px-2 group-data-[collapsible=icon]:px-0 transition-all duration-500">
          <div className="flex size-9 md:size-10 items-center justify-center rounded-xl bg-black border border-gold/30 transition-transform hover:rotate-3">
            <span className="text-sm md:text-base font-black text-gold italic">P</span>
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden animate-in fade-in slide-in-from-left-2 duration-500">
            <span className="text-[14px] md:text-[15px] font-black uppercase text-sidebar-foreground tracking-tight leading-none">Procom Bank</span>
            <span className="text-[9px] md:text-[10px] font-bold text-gold uppercase tracking-[0.3em] leading-tight mt-1 opacity-80">Prestige 2026</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="scrollbar-gold">
        {Object.entries(
          filteredNavItems.reduce((acc, item) => {
            const category = item.category || 'General';
            if (!acc[category]) acc[category] = [];
            acc[category].push(item);
            return acc;
          }, {} as Record<string, typeof filteredNavItems>)
        ).map(([category, items]) => (
          <SidebarGroup key={category} className="py-2 md:py-4">
            <div className="px-4 py-2 text-[9px] md:text-[10px] font-black uppercase text-muted-foreground tracking-[0.3em] group-data-[collapsible=icon]:hidden opacity-60">
              {category}
            </div>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1 px-1">
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.url || (item.url !== '/' && pathname.startsWith(item.url));
                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                        className={cn(
                          "w-full rounded-xl transition-all duration-300 h-10 md:h-11 shadow-none border-none",
                          isActive
                            ? "bg-gold text-black hover:bg-gold hover:text-black"
                            : "text-white hover:bg-gold/5 hover:text-gold"
                        )}
                      >
                        <Link href={item.url} className="flex items-center gap-3 px-3">
                          {Icon && <Icon className="size-4 md:size-5" />}
                          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wide">
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        {filteredNavItems.length === 0 && (
          <div className="p-10 text-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Identity Unverified
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
