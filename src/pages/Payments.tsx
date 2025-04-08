
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Download, 
  DollarSign, 
  ChevronRight, 
  Filter, 
  PlusCircle, 
  Calendar as CalendarIcon, 
  Wallet, 
  Search,
  Clock
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Sample payment data
const paymentHistory = [
  {
    id: "INV-001",
    date: new Date("2025-04-01"),
    client: "John Smith",
    service: "Regular Consultation",
    amount: 75.00,
    status: "paid",
  },
  {
    id: "INV-002",
    date: new Date("2025-04-03"),
    client: "Emma Wilson",
    service: "Premium Consultation",
    amount: 125.00,
    status: "paid",
  },
  {
    id: "INV-003",
    date: new Date("2025-04-05"),
    client: "Michael Brown",
    service: "Group Session",
    amount: 50.00,
    status: "pending",
  },
  {
    id: "INV-004",
    date: new Date("2025-04-07"),
    client: "Sarah Davis",
    service: "Premium Consultation",
    amount: 125.00,
    status: "paid",
  },
  {
    id: "INV-005",
    date: new Date("2025-04-10"),
    client: "Alex Johnson",
    service: "Quick Follow-up",
    amount: 40.00,
    status: "failed",
  },
  {
    id: "INV-006",
    date: new Date("2025-04-12"),
    client: "Lisa Anderson",
    service: "Regular Consultation",
    amount: 75.00,
    status: "refunded",
  },
  {
    id: "INV-007",
    date: new Date("2025-04-15"),
    client: "Robert Miller",
    service: "Premium Consultation",
    amount: 125.00,
    status: "paid",
  },
];

// Sample upcoming payments
const upcomingPayments = [
  {
    id: "UP-001",
    date: new Date("2025-04-18"),
    client: "Jennifer Taylor",
    service: "Regular Consultation",
    amount: 75.00,
  },
  {
    id: "UP-002",
    date: new Date("2025-04-20"),
    client: "Thomas White",
    service: "Premium Consultation",
    amount: 125.00,
  },
  {
    id: "UP-003",
    date: new Date("2025-04-22"),
    client: "Olivia Martin",
    service: "Group Session",
    amount: 50.00,
  },
];

// Sample payment methods
const paymentMethods = [
  {
    id: "pm-1",
    type: "card",
    brand: "Visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2026,
    isDefault: true,
  },
  {
    id: "pm-2",
    type: "card",
    brand: "Mastercard",
    last4: "8888",
    expMonth: 8,
    expYear: 2025,
    isDefault: false,
  },
];

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  
  // Filter payments based on search term and status
  const filteredPayments = paymentHistory.filter((payment) => {
    // Check if payment matches search term
    const matchesSearch =
      payment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Check if payment matches status filter
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    
    // Check if payment is within date range
    let matchesDateRange = true;
    if (dateRange.from) {
      matchesDateRange = matchesDateRange && payment.date >= dateRange.from;
    }
    if (dateRange.to) {
      matchesDateRange = matchesDateRange && payment.date <= dateRange.to;
    }
    
    return matchesSearch && matchesStatus && matchesDateRange;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="default" className="bg-green-500">Paid</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "refunded":
        return <Badge variant="secondary">Refunded</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Payments</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track your payments and manage invoices
          </p>
        </div>
        <Button className="calendoodle-btn calendoodle-btn-primary">
          <PlusCircle className="h-4 w-4 mr-2" /> Create Invoice
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="calendoodle-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="p-2 bg-calendoodle-blue/10 rounded-full">
                <DollarSign className="h-6 w-6 text-calendoodle-blue" />
              </div>
              <div className="ml-4">
                <div className="text-3xl font-bold">$1,240.00</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  This month
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="calendoodle-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                <Clock className="h-6 w-6 text-amber-500" />
              </div>
              <div className="ml-4">
                <div className="text-3xl font-bold">$50.00</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  1 invoice pending
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="calendoodle-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upcoming Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <CalendarIcon className="h-6 w-6 text-calendoodle-purple" />
              </div>
              <div className="ml-4">
                <div className="text-3xl font-bold">$250.00</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  3 scheduled payments
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="history">
        <TabsList>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
        </TabsList>
        
        <TabsContent value="history" className="space-y-4 mt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search invoices, clients or services..."
                className="pl-10 calendoodle-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4">
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[160px] calendoodle-input">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Status: </span>
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[160px] justify-start text-left font-normal calendoodle-input",
                      !dateRange.from && !dateRange.to && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd")} -{" "}
                          {format(dateRange.to, "LLL dd")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd")
                      )
                    ) : (
                      <span>Date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange as any}
                    numberOfMonths={1}
                    initialFocus
                  />
                  
                  <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setDateRange({ from: undefined, to: undefined })}
                    >
                      Clear
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <Card className="calendoodle-card">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.length > 0 ? (
                    filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>{format(payment.date, "MMM dd, yyyy")}</TableCell>
                        <TableCell>{payment.client}</TableCell>
                        <TableCell>{payment.service}</TableCell>
                        <TableCell>${payment.amount.toFixed(2)}</TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="icon" variant="ghost">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No payments found matching your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-6">
          <Card className="calendoodle-card">
            <CardHeader>
              <CardTitle>Upcoming Payments</CardTitle>
              <CardDescription>
                These are payments expected in the near future
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingPayments.map((payment) => (
                  <div 
                    key={payment.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-calendoodle-purple/10 rounded-full flex items-center justify-center">
                        <CalendarIcon className="h-5 w-5 text-calendoodle-purple" />
                      </div>
                      <div>
                        <h4 className="font-medium">{payment.client}</h4>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {payment.service} • {format(payment.date, "MMM dd, yyyy")}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${payment.amount.toFixed(2)}</div>
                      <Button variant="ghost" size="sm" className="text-calendoodle-blue">
                        Remind Client
                      </Button>
                    </div>
                  </div>
                ))}
                
                {upcomingPayments.length === 0 && (
                  <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                    No upcoming payments scheduled.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="methods" className="space-y-6 mt-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Your Payment Methods</h2>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" /> Add Method
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <Card key={method.id} className={`calendoodle-card ${method.isDefault ? 'border-calendoodle-blue' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <CreditCard className={method.brand === 'Visa' ? "text-blue-600" : "text-red-600"} />
                      </div>
                      <div>
                        <h4 className="font-medium">
                          {method.brand} •••• {method.last4}
                          {method.isDefault && (
                            <Badge variant="outline" className="ml-2 border-calendoodle-blue text-calendoodle-blue">
                              Default
                            </Badge>
                          )}
                        </h4>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Expires {method.expMonth}/{method.expYear}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {!method.isDefault && (
                        <Button variant="outline" size="sm">
                          Set Default
                        </Button>
                      )}
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card className="calendoodle-card !border-dashed border-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <div className="h-10 w-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-2">
                  <PlusCircle className="h-5 w-5 text-gray-500" />
                </div>
                <h4 className="font-medium">Add New Payment Method</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">
                  Add a credit card, bank account or other payment method
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="calendoodle-card">
            <CardHeader>
              <CardTitle>Payout Settings</CardTitle>
              <CardDescription>
                Configure when and how you receive your payments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-calendoodle-green/10 rounded-full flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-calendoodle-green" />
                  </div>
                  <div>
                    <h4 className="font-medium">Bank Account (Default)</h4>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Wells Fargo •••• 1234
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Change
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="payout-frequency">Payout Frequency</Label>
                <Select defaultValue="monthly">
                  <SelectTrigger id="payout-frequency" className="calendoodle-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly (Every Monday)</SelectItem>
                    <SelectItem value="biweekly">Bi-Weekly (Every other Monday)</SelectItem>
                    <SelectItem value="monthly">Monthly (1st of month)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-4">
                <Button className="w-full">Save Payout Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Payments;
