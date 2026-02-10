import { Package, User, CreditCard, MessageCircle, Volume2, Bell, Settings, FileText } from 'lucide-react';
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
    title: 'EMI Conversion',
    url: '/emi-conversion',
    icon: CreditCard,
    role: [UserRole.USER, UserRole.ADMIN],
  },
  {
    title: 'Statements',
    url: '/statements',
    icon: FileText,
    role: [UserRole.USER, UserRole.ADMIN],
  },
  {
    title: 'AI Assistant',
    url: '/chatbot',
    icon: MessageCircle,
    role: [UserRole.USER, UserRole.ADMIN],
  },
  {
    title: 'Voice Assistant',
    url: '/voice-assistant',
    icon: Volume2,
    role: [UserRole.USER, UserRole.ADMIN],
  },
  {
    title: 'Notifications',
    url: '/notifications',
    icon: Bell,
    role: [UserRole.USER, UserRole.ADMIN],
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
    role: [UserRole.USER, UserRole.ADMIN],
  },
  {
    title: 'Profile',
    url: '/profile',
    icon: User,
    role: [UserRole.USER, UserRole.ADMIN],
  },
];
