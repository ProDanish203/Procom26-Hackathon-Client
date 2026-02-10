'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  Bell,
  CreditCard,
  Receipt,
  TrendingUp,
  AlertCircle,
  Tag,
  Check,
  CheckCheck,
  Settings,
  Filter,
  ArrowUpDown,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const GOLD = 'rgb(212, 175, 55)';

interface Notification {
  id: number;
  category: 'Payments' | 'Bills' | 'EMI' | 'Alerts' | 'Promotions';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    category: 'Payments',
    title: 'Payment Successful',
    message: 'Your payment of PKR 2,500 to Amazon has been processed successfully.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    isRead: false,
    priority: 'high',
  },
  {
    id: 2,
    category: 'EMI',
    title: 'EMI Due Reminder',
    message: 'Your Samsung EMI of PKR 5,625 is due on Feb 15, 2026.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    isRead: false,
    priority: 'high',
  },
  {
    id: 3,
    category: 'Promotions',
    title: 'Special Offer: 0% EMI',
    message: 'Convert purchases above PKR 10,000 to EMI at 0% interest for 3 months!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    isRead: true,
    priority: 'low',
  },
  {
    id: 4,
    category: 'Bills',
    title: 'Electricity Bill Due',
    message: 'Your electricity bill of PKR 3,200 is due in 3 days.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    isRead: false,
    priority: 'medium',
  },
  {
    id: 5,
    category: 'Alerts',
    title: 'Low Balance Alert',
    message: 'Your account balance is below PKR 5,000. Consider adding funds.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    isRead: true,
    priority: 'medium',
  },
  {
    id: 6,
    category: 'Payments',
    title: 'Refund Processed',
    message: 'Refund of PKR 1,200 from Flipkart has been credited to your account.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36),
    isRead: true,
    priority: 'medium',
  },
  {
    id: 7,
    category: 'EMI',
    title: 'EMI Converted Successfully',
    message: 'Your purchase of PKR 45,000 has been converted to 6-month EMI.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    isRead: true,
    priority: 'high',
  },
];

const categoryIcons = {
  Payments: CreditCard,
  Bills: Receipt,
  EMI: TrendingUp,
  Alerts: AlertCircle,
  Promotions: Tag,
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'unread'>('newest');
  const [filterRead, setFilterRead] = useState<'all' | 'read' | 'unread'>('all');

  const categories = ['all', 'Payments', 'Bills', 'EMI', 'Alerts', 'Promotions'];

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const getFilteredNotifications = () => {
    let filtered = notifications;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((n) => n.category === selectedCategory);
    }

    // Filter by read status
    if (filterRead === 'read') {
      filtered = filtered.filter((n) => n.isRead);
    } else if (filterRead === 'unread') {
      filtered = filtered.filter((n) => !n.isRead);
    }

    // Sort
    if (sortBy === 'newest') {
      filtered = [...filtered].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    } else if (sortBy === 'oldest') {
      filtered = [...filtered].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    } else if (sortBy === 'unread') {
      filtered = [...filtered].sort((a, b) => (a.isRead === b.isRead ? 0 : a.isRead ? 1 : -1));
    }

    return filtered;
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const filteredNotifications = getFilteredNotifications();

  const getTimeAgo = (date: Date): string => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="w-full space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${GOLD}1a`, border: `1px solid ${GOLD}33` }}>
            <Bell className="h-5 w-5 md:h-6 md:w-6" style={{ color: GOLD }} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold" style={{ color: GOLD }}>
              Notifications
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            style={{ borderColor: `${GOLD}80` }}
          >
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
          <Button
            variant="outline"
            size="sm"
            style={{ borderColor: `${GOLD}80` }}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => {
          const count = category === 'all' 
            ? notifications.length 
            : notifications.filter((n) => n.category === category).length;
          
          return (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'whitespace-nowrap',
                selectedCategory === category && 'text-black'
              )}
              style={selectedCategory === category ? { backgroundColor: GOLD } : { borderColor: `${GOLD}33` }}
            >
              {category === 'all' ? 'All' : category}
              <Badge
                variant="secondary"
                className="ml-2"
              >
                {count}
              </Badge>
            </Button>
          );
        })}
      </div>

      {/* Filters & Sort */}
      <Card style={{ borderColor: `${GOLD}33` }}>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground mb-1.5 block">Filter by Status</Label>
              <Select value={filterRead} onValueChange={(value: any) => setFilterRead(value)}>
                <SelectTrigger className="text-sm">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Notifications</SelectItem>
                  <SelectItem value="unread">Unread Only</SelectItem>
                  <SelectItem value="read">Read Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground mb-1.5 block">Sort by</Label>
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="text-sm">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="unread">Unread First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card style={{ borderColor: `${GOLD}33` }}>
            <CardContent className="p-8 text-center">
              <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">No notifications found</p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => {
            const Icon = categoryIcons[notification.category];
            return (
              <Card
                key={notification.id}
                className={cn(
                  'transition-all hover:shadow-md cursor-pointer',
                  !notification.isRead && 'border-l-4'
                )}
                style={
                  !notification.isRead
                    ? { borderLeftColor: GOLD, borderColor: `${GOLD}33` }
                    : { borderColor: `${GOLD}33` }
                }
                onClick={() => !notification.isRead && markAsRead(notification.id)}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    {/* Icon */}
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${GOLD}1a`, border: `1px solid ${GOLD}33` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: GOLD }} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className={cn('text-sm font-semibold', !notification.isRead && 'font-bold')}>
                            {notification.title}
                          </h3>
                          <Badge
                            variant="outline"
                            className="text-xs"
                            style={{ borderColor: `${GOLD}33`, color: GOLD }}
                          >
                            {notification.category}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {getTimeAgo(notification.timestamp)}
                        </span>
                      </div>
                      
                      <p className={cn(
                        'text-sm text-muted-foreground mb-2',
                        !notification.isRead && 'font-medium text-foreground'
                      )}>
                        {notification.message}
                      </p>

                      <div className="flex items-center gap-2">
                        {!notification.isRead && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                            }}
                            className="h-7 text-xs"
                          >
                            <Check className="mr-1 h-3 w-3" />
                            Mark as Read
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="h-7 text-xs text-destructive hover:text-destructive"
                        >
                          <Trash2 className="mr-1 h-3 w-3" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Summary Footer */}
      {filteredNotifications.length > 0 && (
        <Card style={{ borderColor: `${GOLD}33` }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Showing {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}</span>
              <span>{unreadCount} unread</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
