'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  CheckCircle2,
  XCircle,
  Download,
  Share2,
  Home,
  Repeat,
  Star,
  Receipt,
  Calendar,
  CreditCard,
  User,
  Building,
  Hash,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const GOLD = 'rgb(212, 175, 55)';

interface PaymentDetails {
  status: 'success' | 'failure';
  transactionId: string;
  amount: number;
  recipient: string;
  recipientAccount: string;
  date: Date;
  paymentMethod: string;
  category: string;
  description?: string;
  failureReason?: string;
}

// Mock payment data - in real app, this would come from URL params or API
const mockPayment: PaymentDetails = {
  status: 'success',
  transactionId: 'TXN20260210123456',
  amount: 2500,
  recipient: 'Amazon India',
  recipientAccount: 'amazon@upi',
  date: new Date(),
  paymentMethod: 'HDFC Credit Card ••••4532',
  category: 'Shopping',
  description: 'Payment for order #402-1234567-8901234',
};

export default function PaymentConfirmationPage() {
  const router = useRouter();
  const [payment] = useState<PaymentDetails>(mockPayment);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleDownloadReceipt = () => {
    // Simulate download
    console.log('Downloading receipt...');
  };

  const handleShareReceipt = () => {
    // Simulate share
    console.log('Sharing receipt...');
  };

  const handleRepeatPayment = () => {
    console.log('Repeating payment...');
  };

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4 md:space-y-6">
      {/* Status Card */}
      <Card
        className="border-2"
        style={{
          borderColor: payment.status === 'success' ? GOLD : '#666',
          backgroundColor: payment.status === 'success' ? `${GOLD}0d` : 'transparent',
        }}
      >
        <CardContent className="p-6 md:p-8 text-center">
          <div className="flex justify-center mb-4">
            {payment.status === 'success' ? (
              <div
                className="p-4 rounded-full"
                style={{ backgroundColor: `${GOLD}1a`, border: `2px solid ${GOLD}` }}
              >
                <CheckCircle2 className="h-12 w-12 md:h-16 md:w-16" style={{ color: GOLD }} />
              </div>
            ) : (
              <div className="p-4 rounded-full bg-muted border-2 border-muted-foreground">
                <XCircle className="h-12 w-12 md:h-16 md:w-16 text-muted-foreground" />
              </div>
            )}
          </div>

          <h1
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ color: payment.status === 'success' ? GOLD : undefined }}
          >
            {payment.status === 'success' ? 'Payment Successful!' : 'Payment Failed'}
          </h1>

          <p className="text-3xl md:text-4xl font-bold mb-2">
            PKR {payment.amount.toLocaleString('en-IN')}
          </p>

          <p className="text-sm text-muted-foreground">
            {payment.status === 'success'
              ? 'Your payment has been processed successfully'
              : payment.failureReason || 'Your payment could not be processed'}
          </p>

          {payment.status === 'success' && (
            <Badge
              className="mt-4"
              style={{ backgroundColor: GOLD, color: 'black' }}
            >
              Transaction ID: {payment.transactionId}
            </Badge>
          )}
        </CardContent>
      </Card>

      {/* Transaction Details */}
      <Card style={{ borderColor: `${GOLD}33` }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" style={{ color: GOLD }} />
            Transaction Details
          </CardTitle>
          <CardDescription>Complete information about your transaction</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${GOLD}1a` }}>
                <User className="h-4 w-4" style={{ color: GOLD }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Recipient</p>
                <p className="font-medium truncate">{payment.recipient}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${GOLD}1a` }}>
                <Building className="h-4 w-4" style={{ color: GOLD }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Account</p>
                <p className="font-medium truncate">{payment.recipientAccount}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${GOLD}1a` }}>
                <Calendar className="h-4 w-4" style={{ color: GOLD }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Date & Time</p>
                <p className="font-medium">
                  {payment.date.toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-sm text-muted-foreground">
                  {payment.date.toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${GOLD}1a` }}>
                <CreditCard className="h-4 w-4" style={{ color: GOLD }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Payment Method</p>
                <p className="font-medium truncate">{payment.paymentMethod}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${GOLD}1a` }}>
                <Hash className="h-4 w-4" style={{ color: GOLD }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Transaction ID</p>
                <p className="font-medium text-sm">{payment.transactionId}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${GOLD}1a` }}>
                <Clock className="h-4 w-4" style={{ color: GOLD }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Category</p>
                <Badge variant="outline" style={{ borderColor: GOLD, color: GOLD }}>
                  {payment.category}
                </Badge>
              </div>
            </div>
          </div>

          {payment.description && (
            <>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground mb-1">Description</p>
                <p className="text-sm">{payment.description}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Receipt Actions */}
      <Card style={{ borderColor: `${GOLD}33` }}>
        <CardHeader>
          <CardTitle className="text-lg">Receipt Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleDownloadReceipt}
              style={{ borderColor: `${GOLD}80` }}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>
            <Button
              variant="outline"
              onClick={handleShareReceipt}
              style={{ borderColor: `${GOLD}80` }}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share Receipt
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Related Actions */}
      {payment.status === 'success' && (
        <Card style={{ borderColor: `${GOLD}33` }}>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleRepeatPayment}
                style={{ borderColor: `${GOLD}80` }}
              >
                <Repeat className="mr-2 h-4 w-4" />
                Repeat Payment
              </Button>
              <Button
                variant="outline"
                onClick={handleAddToFavorites}
                style={
                  isFavorite
                    ? { backgroundColor: GOLD, color: 'black' }
                    : { borderColor: `${GOLD}80` }
                }
              >
                <Star className={cn('mr-2 h-4 w-4', isFavorite && 'fill-current')} />
                {isFavorite ? 'Added to Favorites' : 'Add to Favorites'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          className="flex-1 text-black"
          style={{ backgroundColor: GOLD }}
          onClick={() => router.push('/')}
        >
          <Home className="mr-2 h-4 w-4" />
          Return to Dashboard
        </Button>
        {payment.status === 'failure' && (
          <Button
            variant="outline"
            className="flex-1"
            style={{ borderColor: `${GOLD}80` }}
            onClick={() => router.back()}
          >
            Try Again
          </Button>
        )}
      </div>

      {/* Support Note */}
      <Card style={{ borderColor: `${GOLD}33` }}>
        <CardContent className="p-4 text-center text-sm text-muted-foreground">
          <p>
            Need help? Contact our support team at{' '}
            <span style={{ color: GOLD }}>support@hackathon.com</span>
          </p>
          <p className="mt-1">Available 24/7 for assistance</p>
        </CardContent>
      </Card>
    </div>
  );
}
