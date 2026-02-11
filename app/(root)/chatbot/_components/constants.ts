import {
  DollarSign,
  CreditCard,
  TrendingUp,
  HelpCircle,
  User,
  Sparkles,
  FileText,
} from 'lucide-react';

export const GOLD = 'rgb(212, 175, 55)';

export const quickActions = [
  { id: 1, label: 'Check Balance', icon: DollarSign },
  { id: 2, label: 'Recent Transactions', icon: CreditCard },
  { id: 3, label: 'EMI Calculator', icon: TrendingUp },
  { id: 4, label: 'FAQs', icon: HelpCircle },
] as const;

export const faqCategories = [
  {
    id: 1,
    title: 'Account & Security',
    icon: User,
    questions: [
      'How do I reset my password?',
      'How to enable two-factor authentication?',
      'How to update my profile information?',
    ],
  },
  {
    id: 2,
    title: 'Transactions',
    icon: CreditCard,
    questions: [
      'How to view transaction history?',
      'What are the transaction limits?',
      'How to dispute a transaction?',
    ],
  },
  {
    id: 3,
    title: 'EMI & Payments',
    icon: TrendingUp,
    questions: [
      'How to convert purchase to EMI?',
      'What is the EMI interest rate?',
      'How to prepay my EMI?',
    ],
  },
  {
    id: 4,
    title: 'Rewards & Offers',
    icon: Sparkles,
    questions: [
      'How to redeem reward points?',
      'What are the current offers?',
      'How to check my reward balance?',
    ],
  },
] as const;
