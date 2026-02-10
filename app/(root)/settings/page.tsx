'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  CreditCard,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight,
  Fingerprint,
  Lock,
  Smartphone,
  Mail,
  DollarSign,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';

const GOLD = 'rgb(212, 175, 55)';

interface LinkedCard {
  id: number;
  type: 'credit' | 'debit';
  last4: string;
  bank: string;
  isPrimary: boolean;
}

const mockLinkedCards: LinkedCard[] = [
  { id: 1, type: 'credit', last4: '4532', bank: 'HDFC Bank', isPrimary: true },
  { id: 2, type: 'debit', last4: '8901', bank: 'ICICI Bank', isPrimary: false },
  { id: 3, type: 'credit', last4: '2345', bank: 'SBI Card', isPrimary: false },
];

export default function SettingsPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'account' | 'notifications' | 'security' | 'cards' | 'preferences' | 'help'>('account');
  
  // Account Preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  
  // Notification Settings
  const [paymentAlerts, setPaymentAlerts] = useState(true);
  const [billReminders, setBillReminders] = useState(true);
  const [emiReminders, setEmiReminders] = useState(true);
  const [promotions, setPromotions] = useState(false);
  
  // Security Settings
  const [pinEnabled, setPinEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  // Preferences
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('INR');
  const [theme, setTheme] = useState('system');
  
  // Linked Cards
  const [linkedCards, setLinkedCards] = useState<LinkedCard[]>(mockLinkedCards);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const setPrimaryCard = (id: number) => {
    setLinkedCards((prev) =>
      prev.map((card) => ({ ...card, isPrimary: card.id === id }))
    );
  };

  const removeCard = (id: number) => {
    setLinkedCards((prev) => prev.filter((card) => card.id !== id));
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: SettingsIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'cards', label: 'Linked Cards', icon: CreditCard },
    { id: 'preferences', label: 'Preferences', icon: Globe },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  return (
    <div className="w-full space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg" style={{ backgroundColor: `${GOLD}1a`, border: `1px solid ${GOLD}33` }}>
          <SettingsIcon className="h-5 w-5 md:h-6 md:w-6" style={{ color: GOLD }} />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold" style={{ color: GOLD }}>
            Settings
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">Manage your account and preferences</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab(tab.id as any)}
              className={cn('whitespace-nowrap', activeTab === tab.id && 'text-black')}
              style={activeTab === tab.id ? { backgroundColor: GOLD } : { borderColor: `${GOLD}33` }}
            >
              <Icon className="mr-2 h-4 w-4" />
              {tab.label}
            </Button>
          );
        })}
      </div>

      {/* Account Tab */}
      {activeTab === 'account' && (
        <div className="space-y-4">
          <Card style={{ borderColor: `${GOLD}33` }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" style={{ color: GOLD }} />
                Account Preferences
              </CardTitle>
              <CardDescription>Manage your account settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates via SMS</p>
                </div>
                <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input value={user?.email || ''} disabled />
                <p className="text-xs text-muted-foreground">Contact support to change your email</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-4">
          <Card style={{ borderColor: `${GOLD}33` }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" style={{ color: GOLD }} />
                Notification Settings
              </CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Payment Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified about all payments</p>
                </div>
                <Switch checked={paymentAlerts} onCheckedChange={setPaymentAlerts} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Bill Reminders</Label>
                  <p className="text-sm text-muted-foreground">Reminders for upcoming bills</p>
                </div>
                <Switch checked={billReminders} onCheckedChange={setBillReminders} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>EMI Reminders</Label>
                  <p className="text-sm text-muted-foreground">Reminders for EMI payments</p>
                </div>
                <Switch checked={emiReminders} onCheckedChange={setEmiReminders} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Promotions & Offers</Label>
                  <p className="text-sm text-muted-foreground">Special deals and promotions</p>
                </div>
                <Switch checked={promotions} onCheckedChange={setPromotions} />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-4">
          <Card style={{ borderColor: `${GOLD}33` }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" style={{ color: GOLD }} />
                Security Settings
              </CardTitle>
              <CardDescription>Manage your security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${GOLD}1a` }}>
                    <Lock className="h-5 w-5" style={{ color: GOLD }} />
                  </div>
                  <div className="space-y-0.5">
                    <Label>PIN Protection</Label>
                    <p className="text-sm text-muted-foreground">Secure your account with a PIN</p>
                  </div>
                </div>
                <Switch checked={pinEnabled} onCheckedChange={setPinEnabled} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${GOLD}1a` }}>
                    <Fingerprint className="h-5 w-5" style={{ color: GOLD }} />
                  </div>
                  <div className="space-y-0.5">
                    <Label>Biometric Authentication</Label>
                    <p className="text-sm text-muted-foreground">Use fingerprint or face ID</p>
                  </div>
                </div>
                <Switch checked={biometricEnabled} onCheckedChange={setBiometricEnabled} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${GOLD}1a` }}>
                    <Smartphone className="h-5 w-5" style={{ color: GOLD }} />
                  </div>
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication (2FA)</Label>
                    <p className="text-sm text-muted-foreground">Extra security with OTP</p>
                  </div>
                </div>
                <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
              </div>
              <Separator />
              <div className="space-y-3">
                <Label>Change Password</Label>
                <Button variant="outline" style={{ borderColor: `${GOLD}80` }}>
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Linked Cards Tab */}
      {activeTab === 'cards' && (
        <div className="space-y-4">
          <Card style={{ borderColor: `${GOLD}33` }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" style={{ color: GOLD }} />
                    Linked Cards & Accounts
                  </CardTitle>
                  <CardDescription>Manage your payment methods</CardDescription>
                </div>
                <Button size="sm" style={{ backgroundColor: GOLD }} className="text-black">
                  Add Card
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {linkedCards.map((card) => (
                <div
                  key={card.id}
                  className="flex items-center justify-between p-4 rounded-lg border"
                  style={{ borderColor: `${GOLD}33` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${GOLD}1a` }}>
                      <CreditCard className="h-5 w-5" style={{ color: GOLD }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">
                          {card.type === 'credit' ? 'Credit' : 'Debit'} Card •••• {card.last4}
                        </p>
                        {card.isPrimary && (
                          <Badge style={{ backgroundColor: GOLD }} className="text-black text-xs">
                            Primary
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{card.bank}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!card.isPrimary && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPrimaryCard(card.id)}
                        style={{ borderColor: `${GOLD}80` }}
                      >
                        Set Primary
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCard(card.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <div className="space-y-4">
          <Card style={{ borderColor: `${GOLD}33` }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" style={{ color: GOLD }} />
                Language & Currency
              </CardTitle>
              <CardDescription>Customize your experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                    <SelectItem value="es">Español (Spanish)</SelectItem>
                    <SelectItem value="fr">Français (French)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">₹ INR - Indian Rupee</SelectItem>
                    <SelectItem value="USD">$ USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">€ EUR - Euro</SelectItem>
                    <SelectItem value="GBP">£ GBP - British Pound</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Help & Support Tab */}
      {activeTab === 'help' && (
        <div className="space-y-4">
          <Card style={{ borderColor: `${GOLD}33` }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" style={{ color: GOLD }} />
                Help & Support
              </CardTitle>
              <CardDescription>Get help and contact support</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-between"
                style={{ borderColor: `${GOLD}33` }}
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" style={{ color: GOLD }} />
                  FAQs
                </span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="w-full justify-between"
                style={{ borderColor: `${GOLD}33` }}
              >
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4" style={{ color: GOLD }} />
                  Contact Support
                </span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="w-full justify-between"
                style={{ borderColor: `${GOLD}33` }}
              >
                <span className="flex items-center gap-2">
                  <Shield className="h-4 w-4" style={{ color: GOLD }} />
                  Privacy Policy
                </span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="w-full justify-between"
                style={{ borderColor: `${GOLD}33` }}
              >
                <span className="flex items-center gap-2">
                  <Shield className="h-4 w-4" style={{ color: GOLD }} />
                  Terms of Service
                </span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Separator />
              <div className="text-center text-sm text-muted-foreground">
                <p>Version 1.0.0</p>
                <p className="mt-1">© 2026 Hackathon. All rights reserved.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Logout Button */}
      <Card style={{ borderColor: `${GOLD}33` }}>
        <CardContent className="p-4">
          <Button
            variant="outline"
            className="w-full text-destructive hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
