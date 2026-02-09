import { Package, User } from 'lucide-react';
import { UserRole } from './enums';

export interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  role?: UserRole[];
}

export const sidebarNavItems: NavItem[] = [
  {
    title: 'Home',
    url: '/',
    icon: Package,
    role: [UserRole.USER, UserRole.ADMIN],
  },
  {
    title: 'Profile',
    url: '/profile',
    icon: User,
    role: [UserRole.USER, UserRole.ADMIN],
  },
];
