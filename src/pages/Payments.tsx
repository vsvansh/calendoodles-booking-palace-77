
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { File, Download, Search, FilterX, Filter, Plus, CreditCard, Receipt } from 'lucide-react';

// Sample payment data
const paymentData = [
  { 
    id: 'INV-001',
    client: 'John Smith',
    service: 'Haircut',
    date: '2025-04-08',
    amount: 45.00,
    status: 'completed',
  },
  { 
    id: 'INV-002',
    client: 'Sarah Johnson',
    service: 'Color Treatment',
    date: '2025-04-07',
    amount: 120.00,
    status: 'completed',
  },
  { 
    id: 'INV-003',
    client: 'Michael Brown',
    service: 'Hair Styling',
    date: '2025-04-06',
    amount: 65.00,
    status: 'pending',
  },
  { 
    id: 'INV-004',
    client: 'Jessica Davis',
    service: 'Haircut & Styling',
    date: '2025-04-05',
    amount: 85.00,
    status: 'completed',
  },
  { 
    id: 'INV-005',
    client: 'Robert Wilson',
    service: 'Beard Trim',
    date: '2025-04-04',
    amount: 25.00,
    status: 'refunded',
  },
  { 
    id: 'INV-006',
    client: 'Emma Martinez',
    service: 'Full Treatment',
    date: '2025-04-03',
    amount: 150.00,
    status: 'completed',
  },
];

const Payments = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [isViewInvoiceOpen, setIsViewInvoiceOpen] = useState(false);
  
  const filteredPayments = paymentData.filter(payment => {
    const matchesSearch = payment.client.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          payment.service.toLowerCase().includes(searchQuery.toLowerCase());
                          
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleCreateInvoice = () => {
    setIsCreateInvoiceOpen(false);
    toast({
      title: 'Invoice created',
      description: 'New invoice has been created successfully.',
    });
  };
  
  const handleViewInvoice = (payment: any) => {
    setSelectedPayment(payment);
    setIsViewInvoiceOpen(true);
  };
  
  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">
            Manage invoices and track payments
          </p>
        </div>
        <Dialog open={isCreateInvoiceOpen} onOpenChange={setIsCreateInvoiceOpen}>
          <DialogTrigger asChild>
            <Button className="calendoodle-btn-primary">
              <Plus className="mr-1 h-4 w-4" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
              <DialogDescription>
                Create a new invoice for your client
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="client" className="col-span-1">Client</Label>
                <Select defaultValue="client-1">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client-1">John Smith</SelectItem>
                    <SelectItem value="client-2">Sarah Johnson</SelectItem>
                    <SelectItem value="client-3">Michael Brown</SelectItem>
                    <SelectItem value="client-4">Jessica Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="service" className="col-span-1">Service</Label>
                <Select defaultValue="service-1">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="service-1">Haircut</SelectItem>
                    <SelectItem value="service-2">Color Treatment</SelectItem>
                    <SelectItem value="service-3">Hair Styling</SelectItem>
                    <SelectItem value="service-4">Full Treatment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="col-span-1">Amount</Label>
                <div className="col-span-3 flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">$</span>
                  <Input type="number" id="amount" defaultValue="45.00" className="rounded-l-none" />
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="col-span-1">Date</Label>
                <Input type="date" id="date" className="col-span-3" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="col-span-1">Notes</Label>
                <textarea
                  id="notes"
                  className="col-span-3 min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Optional notes about this invoice"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCreateInvoiceOpen(false)}>Cancel</Button>
              <Button type="button" onClick={handleCreateInvoice}>Create Invoice</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <TabsList>
            <TabsTrigger value="all">All Payments</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="refunded">Refunded</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search invoices..."
                className="pl-8 w-[200px] sm:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select 
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={resetFilters}>
              <FilterX className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <TabsContent value="all">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>All Payments</CardTitle>
              <CardDescription>
                View all payment records for your services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.length > 0 ? (
                    filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.id}</TableCell>
                        <TableCell>{payment.client}</TableCell>
                        <TableCell>{payment.service}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                            ${payment.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                              payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : 
                              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleViewInvoice(payment)}>
                            <File className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No payments found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Completed Payments</CardTitle>
              <CardDescription>
                View all completed payment records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.filter(p => p.status === 'completed').length > 0 ? (
                    filteredPayments.filter(p => p.status === 'completed').map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.id}</TableCell>
                        <TableCell>{payment.client}</TableCell>
                        <TableCell>{payment.service}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            Completed
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleViewInvoice(payment)}>
                            <File className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No completed payments found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Pending Payments</CardTitle>
              <CardDescription>
                View all pending payment records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.filter(p => p.status === 'pending').length > 0 ? (
                    filteredPayments.filter(p => p.status === 'pending').map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.id}</TableCell>
                        <TableCell>{payment.client}</TableCell>
                        <TableCell>{payment.service}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                            Pending
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleViewInvoice(payment)}>
                            <File className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No pending payments found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="refunded">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Refunded Payments</CardTitle>
              <CardDescription>
                View all refunded payment records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.filter(p => p.status === 'refunded').length > 0 ? (
                    filteredPayments.filter(p => p.status === 'refunded').map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.id}</TableCell>
                        <TableCell>{payment.client}</TableCell>
                        <TableCell>{payment.service}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                            Refunded
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleViewInvoice(payment)}>
                            <File className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No refunded payments found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={isViewInvoiceOpen} onOpenChange={setIsViewInvoiceOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Invoice {selectedPayment?.id}</DialogTitle>
            <DialogDescription>
              Invoice details for {selectedPayment?.client}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPayment && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg mb-1">Calendoodles</h3>
                  <p className="text-sm text-muted-foreground">123 Main Street</p>
                  <p className="text-sm text-muted-foreground">New York, NY 10001</p>
                  <p className="text-sm text-muted-foreground">contact@calendoodles.com</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Invoice #{selectedPayment.id}</p>
                  <p className="text-sm text-muted-foreground">Date: {selectedPayment.date}</p>
                  <div className={`mt-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                    ${selectedPayment.status === 'completed' ? 'bg-green-100 text-green-800' : 
                      selectedPayment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Client</h3>
                <p className="font-medium">{selectedPayment.client}</p>
                <p className="text-sm text-muted-foreground">client@example.com</p>
                <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>{selectedPayment.service}</TableCell>
                      <TableCell className="text-right">${selectedPayment.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                  <tfoot>
                    <tr className="border-t">
                      <td className="py-2 px-4 text-right font-medium">Total:</td>
                      <td className="py-2 px-4 text-right font-bold">${selectedPayment.amount.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </Table>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Payment Information</h3>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Visa ending in 4242</span>
                </div>
                {selectedPayment.status === 'completed' && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Paid on {selectedPayment.date}
                  </p>
                )}
              </div>
              
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setIsViewInvoiceOpen(false)}>Close</Button>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payments;
