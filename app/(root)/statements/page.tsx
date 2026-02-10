'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  FileText,
  Download,
  Mail,
  Calendar,
  Filter,
  FileSpreadsheet,
  File,
  CreditCard,
  Receipt,
  TrendingUp,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const GOLD = 'rgb(212, 175, 55)';

interface Statement {
  id: number;
  type: 'account' | 'card' | 'tax';
  title: string;
  period: string;
  date: Date;
  size: string;
  transactions: number;
}

const mockStatements: Statement[] = [
  {
    id: 1,
    type: 'account',
    title: 'Account Statement',
    period: 'January 2026',
    date: new Date('2026-02-01'),
    size: '245 KB',
    transactions: 42,
  },
  {
    id: 2,
    type: 'card',
    title: 'Credit Card Statement',
    period: 'January 2026',
    date: new Date('2026-02-01'),
    size: '189 KB',
    transactions: 28,
  },
  {
    id: 3,
    type: 'account',
    title: 'Account Statement',
    period: 'December 2025',
    date: new Date('2026-01-01'),
    size: '312 KB',
    transactions: 56,
  },
  {
    id: 4,
    type: 'tax',
    title: 'Tax Statement',
    period: 'FY 2025-26 Q3',
    date: new Date('2026-01-15'),
    size: '156 KB',
    transactions: 15,
  },
  {
    id: 5,
    type: 'card',
    title: 'Credit Card Statement',
    period: 'December 2025',
    date: new Date('2026-01-01'),
    size: '203 KB',
    transactions: 31,
  },
  {
    id: 6,
    type: 'account',
    title: 'Account Statement',
    period: 'November 2025',
    date: new Date('2025-12-01'),
    size: '278 KB',
    transactions: 48,
  },
];

const statementTypeIcons = {
  account: Receipt,
  card: CreditCard,
  tax: TrendingUp,
};

export default function StatementsPage() {
  const [statements] = useState<Statement[]>(mockStatements);
  const [filterType, setFilterType] = useState<string>('all');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [selectedStatements, setSelectedStatements] = useState<number[]>([]);

  const filteredStatements = statements.filter((statement) => {
    const typeMatch = filterType === 'all' || statement.type === filterType;
    
    let dateMatch = true;
    if (startDate && endDate) {
      const statementDate = statement.date.getTime();
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();
      dateMatch = statementDate >= start && statementDate <= end;
    }
    
    return typeMatch && dateMatch;
  });

  const handleDownloadPDF = (id: number) => {
    console.log(`Downloading PDF for statement ${id}`);
  };

  const handleDownloadCSV = (id: number) => {
    console.log(`Downloading CSV for statement ${id}`);
  };

  const handleEmailStatement = (id: number) => {
    console.log(`Emailing statement ${id}`);
  };

  const toggleStatementSelection = (id: number) => {
    setSelectedStatements((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleBulkDownload = (format: 'pdf' | 'csv') => {
    console.log(`Bulk downloading ${selectedStatements.length} statements as ${format.toUpperCase()}`);
  };

  const handleBulkEmail = () => {
    console.log(`Emailing ${selectedStatements.length} statements`);
  };

  return (
    <div className="w-full space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${GOLD}1a`, border: `1px solid ${GOLD}33` }}>
            <FileText className="h-5 w-5 md:h-6 md:w-6" style={{ color: GOLD }} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold" style={{ color: GOLD }}>
              Statements & Reports
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground">
              Download and manage your financial statements
            </p>
          </div>
        </div>
        {selectedStatements.length > 0 && (
          <Badge style={{ backgroundColor: GOLD }} className="text-black">
            {selectedStatements.length} selected
          </Badge>
        )}
      </div>

      {/* Filters */}
      <Card style={{ borderColor: `${GOLD}33` }}>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" style={{ color: GOLD }} />
            Filters
          </CardTitle>
          <CardDescription>Filter statements by type and date range</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Statement Type Filter */}
            <div className="space-y-2">
              <Label htmlFor="type-filter">Statement Type</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger id="type-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="account">Account Statements</SelectItem>
                  <SelectItem value="card">Card Statements</SelectItem>
                  <SelectItem value="tax">Tax Statements</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          {(startDate || endDate || filterType !== 'all') && (
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setStartDate('');
                  setEndDate('');
                  setFilterType('all');
                }}
                style={{ borderColor: `${GOLD}80` }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedStatements.length > 0 && (
        <Card style={{ borderColor: `${GOLD}33`, backgroundColor: `${GOLD}0d` }}>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium mr-2">Bulk Actions:</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleBulkDownload('pdf')}
                style={{ borderColor: `${GOLD}80` }}
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleBulkDownload('csv')}
                style={{ borderColor: `${GOLD}80` }}
              >
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Download CSV
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleBulkEmail}
                style={{ borderColor: `${GOLD}80` }}
              >
                <Mail className="mr-2 h-4 w-4" />
                Email All
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedStatements([])}
              >
                Clear Selection
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statements List */}
      <div className="space-y-3">
        {filteredStatements.length === 0 ? (
          <Card style={{ borderColor: `${GOLD}33` }}>
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">No statements found</p>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
            </CardContent>
          </Card>
        ) : (
          filteredStatements.map((statement) => {
            const Icon = statementTypeIcons[statement.type];
            const isSelected = selectedStatements.includes(statement.id);

            return (
              <Card
                key={statement.id}
                className={cn(
                  'transition-all hover:shadow-md cursor-pointer',
                  isSelected && 'border-2'
                )}
                style={
                  isSelected
                    ? { borderColor: GOLD, backgroundColor: `${GOLD}0d` }
                    : { borderColor: `${GOLD}33` }
                }
                onClick={() => toggleStatementSelection(statement.id)}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Icon & Info */}
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${GOLD}1a`, border: `1px solid ${GOLD}33` }}
                      >
                        <Icon className="h-6 w-6" style={{ color: GOLD }} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-semibold">{statement.title}</h3>
                          <Badge
                            variant="outline"
                            className="text-xs"
                            style={{ borderColor: `${GOLD}33`, color: GOLD }}
                          >
                            {statement.type.charAt(0).toUpperCase() + statement.type.slice(1)}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {statement.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <File className="h-3.5 w-3.5" />
                            {statement.size}
                          </span>
                          <span>{statement.transactions} transactions</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 md:flex-shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadPDF(statement.id);
                        }}
                        style={{ borderColor: `${GOLD}80` }}
                      >
                        <Download className="mr-1.5 h-3.5 w-3.5" />
                        PDF
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadCSV(statement.id);
                        }}
                        style={{ borderColor: `${GOLD}80` }}
                      >
                        <FileSpreadsheet className="mr-1.5 h-3.5 w-3.5" />
                        CSV
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEmailStatement(statement.id);
                        }}
                        style={{ borderColor: `${GOLD}80` }}
                      >
                        <Mail className="mr-1.5 h-3.5 w-3.5" />
                        Email
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Summary */}
      {filteredStatements.length > 0 && (
        <Card style={{ borderColor: `${GOLD}33` }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Showing {filteredStatements.length} statement{filteredStatements.length !== 1 ? 's' : ''}</span>
              <span>Total size: {filteredStatements.reduce((acc, s) => acc + parseInt(s.size), 0)} KB</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help Card */}
      <Card style={{ borderColor: `${GOLD}33` }}>
        <CardHeader>
          <CardTitle className="text-lg">Need Help?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Statements are generated monthly and available for download within 3 business days.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              size="sm"
              className="justify-start"
              style={{ borderColor: `${GOLD}33` }}
            >
              <FileText className="mr-2 h-4 w-4" style={{ color: GOLD }} />
              Statement FAQs
              <ChevronRight className="ml-auto h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="justify-start"
              style={{ borderColor: `${GOLD}33` }}
            >
              <Mail className="mr-2 h-4 w-4" style={{ color: GOLD }} />
              Contact Support
              <ChevronRight className="ml-auto h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
