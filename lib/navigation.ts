import { Package, User, CreditCard, MessageCircle, Volume2, Bell, Settings, FileText, BarChart3, CalendarDays, Users, Globe } from 'lucide-react';
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
  {
    title: 'Statements',
    url: '/statements',
    icon: FileText,
    role: [UserRole.USER, UserRole.ADMIN],
    category: 'Banking',
  },

  // ADVANCED FINANCIAL TOOLS
  {
    title: 'Statement Analyzer',
    url: '/analyzer',
    icon: BarChart3,
    role: [UserRole.USER, UserRole.ADMIN],
    category: 'AI Tools',
  },
  {
    title: 'Recurring Bills',
    url: '/bills',
    icon: CalendarDays,
    role: [UserRole.USER, UserRole.ADMIN],
    category: 'Management',
  },
  {
    title: 'Split Payments',
    url: '/split',
    icon: Users,
    role: [UserRole.USER, UserRole.ADMIN],
    category: 'Management',
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
    category: 'Support',
  },
  {
    title: 'Voice Assistant',
    url: '/voice-assistant',
    icon: Volume2,
    role: [UserRole.USER, UserRole.ADMIN],
    category: 'Support',
  },
  {
    title: 'Notifications',
    url: '/notifications',
    icon: Bell,
    role: [UserRole.USER, UserRole.ADMIN],
    category: 'Account',
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
    role: [UserRole.USER, UserRole.ADMIN],
    category: 'Account',
  },
];
