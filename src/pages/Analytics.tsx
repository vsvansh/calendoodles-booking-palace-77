
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpRight, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, Download } from "lucide-react";

// Sample data
const monthlyRevenue = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 7000 },
  { name: 'Aug', value: 8000 },
  { name: 'Sep', value: 7500 },
  { name: 'Oct', value: 9000 },
  { name: 'Nov', value: 8500 },
  { name: 'Dec', value: 10000 },
];

const serviceData = [
  { name: 'Haircut', value: 35 },
  { name: 'Coloring', value: 25 },
  { name: 'Styling', value: 15 },
  { name: 'Treatment', value: 10 },
  { name: 'Products', value: 15 },
];

const COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#10B981'];

const clientActivityData = [
  { name: 'Jan', new: 45, returning: 35 },
  { name: 'Feb', new: 50, returning: 40 },
  { name: 'Mar', new: 55, returning: 45 },
  { name: 'Apr', new: 60, returning: 50 },
  { name: 'May', new: 65, returning: 55 },
  { name: 'Jun', new: 70, returning: 60 },
  { name: 'Jul', new: 75, returning: 65 },
  { name: 'Aug', new: 80, returning: 70 },
  { name: 'Sep', new: 85, returning: 75 },
  { name: 'Oct', new: 90, returning: 80 },
  { name: 'Nov', new: 95, returning: 85 },
  { name: 'Dec', new: 100, returning: 90 },
];

const Analytics = () => {
  const [timeFrame, setTimeFrame] = useState("year");
  const [chartType, setChartType] = useState("revenue");
  
  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2)}`;
  };
  
  const totalRevenue = monthlyRevenue.reduce((sum, item) => sum + item.value, 0);
  const averageRevenue = totalRevenue / monthlyRevenue.length;
  
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Track your business performance and client activity
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last {timeFrame}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Average Revenue
            </CardTitle>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(averageRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              +10.5% from last {timeFrame}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Appointments
            </CardTitle>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">524</div>
            <p className="text-xs text-muted-foreground">
              +12.2% from last {timeFrame}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-2 lg:col-span-5">
          <CardHeader className="flex flex-row items-center">
            <div className="flex-1">
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>
                Monthly revenue for current year
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Select defaultValue="year" onValueChange={setTimeFrame}>
                <SelectTrigger className="h-8 w-[120px]">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={chartType} onValueChange={setChartType} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="revenue" className="gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Revenue
                </TabsTrigger>
                <TabsTrigger value="clients" className="gap-2">
                  <LineChartIcon className="h-4 w-4" />
                  Clients
                </TabsTrigger>
              </TabsList>
              <TabsContent value="revenue" className="w-full">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={monthlyRevenue} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    <Legend />
                    <Bar dataKey="value" name="Revenue" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="clients" className="w-full">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={clientActivityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="new" name="New Clients" stroke="#8B5CF6" strokeWidth={2} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="returning" name="Returning Clients" stroke="#F97316" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Service Distribution</CardTitle>
            <CardDescription>
              Breakdown by service type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your business activity for the past month</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-4 rounded-md border p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <PieChartIcon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Revenue increased by 12%</p>
              <p className="text-xs text-muted-foreground">Compared to last month</p>
            </div>
            <Button variant="ghost" size="sm">View</Button>
          </div>
          <div className="flex items-center gap-4 rounded-md border p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <LineChartIcon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">15 new clients this month</p>
              <p className="text-xs text-muted-foreground">5 more than last month</p>
            </div>
            <Button variant="ghost" size="sm">View</Button>
          </div>
          <div className="flex items-center gap-4 rounded-md border p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Appointment bookings up 8%</p>
              <p className="text-xs text-muted-foreground">More clients scheduling online</p>
            </div>
            <Button variant="ghost" size="sm">View</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
