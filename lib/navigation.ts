import { Package, User, CreditCard, MessageCircle, Settings, FileText, CalendarDays, Users, Globe } from 'lucide-react';
import { UserRole } from './enums';

export interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  role?: UserRole[];
  category?: string;
}

export const sidebarNavItems: NavItem[] = [
  // MAIN NAVIGATION
  {
    title: 'Home',
    url: '/',
    icon: Package,
    role: [UserRole.USER, UserRole.ADMIN],
    category: 'General',
  },
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Package,
    role: [UserRole.USER, UserRole.ADMIN],
    category: 'General',
  },
  {
    title: 'Accounts',
    url: '/accounts',
    icon: User,
    role: [UserRole.USER, UserRole.ADMIN],
    category: 'Banking',
  },
  {
    title: 'Transactions',
    url: '/transactions',
    icon: FileText,
    role: [UserRole.USER, UserRole.ADMIN],
    category: 'Banking',
  },
  {
    title: 'Payments Hub',
    url: '/payments',
    icon: CreditCard,
    role: [UserRole.USER, UserRole.ADMIN],
    category: 'Banking',
  },
  {
    title: 'Card Services',
    url: '/cards',
    icon: CreditCard,
    role: [UserRole.USER, UserRole.ADMIN],
    category: 'Banking',
  },
  {
    title: 'EMI Conversion',
    url: '/emi-conversion',
    icon: CreditCard,
    role: [UserRole.USER, UserRole.ADMIN],
    category: 'Banking',
  },

  // ADVANCED FINANCIAL TOOLS
  {
    title: 'Recurring Bills',
    url: '/bills',
    icon: CalendarDays,
    role: [UserRole.USER, UserRole.ADMIN],
    category: 'Banking',
  },
  {
    title: 'Currency Analyzer',
    url: '/currency',
    icon: Globe,
    role: [UserRole.USER, UserRole.ADMIN],
    category: 'AI Tools',
  },

  // ASSISTANCE & SETTINGS
  {
    title: 'AI Assistant',
    url: '/chatbot',
    icon: MessageCircle,
    role: [UserRole.USER, UserRole.ADMIN],
    category: 'AI Tools',
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
    role: [UserRole.USER, UserRole.ADMIN],
    category: 'Account',
  },
  {
    title: 'Profile',
    url: '/profile',
    icon: User,
    role: [UserRole.USER, UserRole.ADMIN],
    category: 'Account',
  }
];
