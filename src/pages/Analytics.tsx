
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { CalendarClock, CreditCard, Users, Clock, TrendingUp, Calendar, CheckCircle, XCircle } from "lucide-react";

// Sample data
const appointmentData = [
  { month: 'Jan', appointments: 45 },
  { month: 'Feb', appointments: 52 },
  { month: 'Mar', appointments: 48 },
  { month: 'Apr', appointments: 61 },
  { month: 'May', appointments: 55 },
  { month: 'Jun', appointments: 67 },
  { month: 'Jul', appointments: 70 },
  { month: 'Aug', appointments: 62 },
  { month: 'Sep', appointments: 75 },
  { month: 'Oct', appointments: 68 },
  { month: 'Nov', appointments: 56 },
  { month: 'Dec', appointments: 72 }
];

const revenueData = [
  { month: 'Jan', revenue: 2400 },
  { month: 'Feb', revenue: 2800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 3100 },
  { month: 'May', revenue: 2900 },
  { month: 'Jun', revenue: 3300 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3200 },
  { month: 'Sep', revenue: 3800 },
  { month: 'Oct', revenue: 3400 },
  { month: 'Nov', revenue: 2800 },
  { month: 'Dec', revenue: 3600 }
];

const statusData = [
  { name: 'Completed', value: 67, color: '#2ecc71' },
  { name: 'Cancelled', value: 18, color: '#e74c3c' },
  { name: 'Rescheduled', value: 15, color: '#f39c12' }
];

const serviceData = [
  { name: 'Regular Consultation', value: 35, color: '#3498db' },
  { name: 'Premium Consultation', value: 25, color: '#9b59b6' },
  { name: 'Group Session', value: 20, color: '#2ecc71' },
  { name: 'Quick Follow-up', value: 15, color: '#f39c12' },
  { name: 'Other Services', value: 5, color: '#e74c3c' }
];

const clientData = [
  { month: 'Jan', newClients: 4, returningClients: 12 },
  { month: 'Feb', newClients: 5, returningClients: 14 },
  { month: 'Mar', newClients: 6, returningClients: 13 },
  { month: 'Apr', newClients: 8, returningClients: 16 },
  { month: 'May', newClients: 7, returningClients: 15 },
  { month: 'Jun', newClients: 9, returningClients: 17 },
  { month: 'Jul', newClients: 10, returningClients: 19 },
  { month: 'Aug', newClients: 8, returningClients: 18 },
  { month: 'Sep', newClients: 11, returningClients: 21 },
  { month: 'Oct', newClients: 9, returningClients: 20 },
  { month: 'Nov', newClients: 7, returningClients: 16 },
  { month: 'Dec', newClients: 10, returningClients: 22 }
];

const quickStats = [
  {
    title: "Total Appointments",
    value: "845",
    change: "+12% from last year",
    icon: CalendarClock,
    color: "text-calendoodle-blue",
    bgColor: "bg-calendoodle-blue/10",
    borderColor: "border-calendoodle-blue/20"
  },
  {
    title: "Total Revenue",
    value: "$42,580",
    change: "+8% from last year",
    icon: CreditCard,
    color: "text-calendoodle-green",
    bgColor: "bg-calendoodle-green/10",
    borderColor: "border-calendoodle-green/20"
  },
  {
    title: "Total Clients",
    value: "124",
    change: "+15% from last year",
    icon: Users,
    color: "text-calendoodle-purple",
    bgColor: "bg-calendoodle-purple/10",
    borderColor: "border-calendoodle-purple/20"
  },
  {
    title: "Avg. Session",
    value: "45 min",
    change: "5 min more than last year",
    icon: Clock,
    color: "text-calendoodle-orange",
    bgColor: "bg-calendoodle-orange/10",
    borderColor: "border-calendoodle-orange/20"
  }
];

const Analytics = () => {
  const [timeframe, setTimeframe] = useState("yearly");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Track your business performance and appointment metrics
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select
            defaultValue={timeframe}
            onValueChange={setTimeframe}
          >
            <SelectTrigger className="w-[180px] calendoodle-input">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button className="calendoodle-btn calendoodle-btn-primary">
            <TrendingUp className="h-4 w-4 mr-2" /> Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className={`border-2 ${stat.borderColor} shadow-md hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm dark:bg-gray-800/60`}>
              <div className="h-1 w-full" style={{ backgroundColor: stat.color.replace("text-", "") }}></div>
              <CardContent className="pt-6 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                    <p className="text-3xl font-bold mt-1 text-gray-800 dark:text-gray-100">{stat.value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="appointments">
        <TabsList>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
        </TabsList>
        
        <TabsContent value="appointments" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2 calendoodle-card">
              <CardHeader>
                <CardTitle>Appointment Trends</CardTitle>
                <CardDescription>Monthly appointment counts for the past year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={appointmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        formatter={(value) => [`${value} appointments`, 'Total']}
                      />
                      <Bar dataKey="appointments" fill="#3498db" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="calendoodle-card">
              <CardHeader>
                <CardTitle>Appointment Status</CardTitle>
                <CardDescription>Distribution by appointment outcome</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value} appointments`, 'Count']}
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center space-x-4 mt-4">
                  {statusData.map((entry) => (
                    <div key={entry.name} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <span className="text-sm">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="calendoodle-card">
            <CardHeader>
              <CardTitle>Services Breakdown</CardTitle>
              <CardDescription>Distribution of appointments by service type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={serviceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {serviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Percentage']}
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-4">
                {serviceData.map((entry) => (
                  <div key={entry.name} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-sm truncate">{entry.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revenue" className="space-y-4">
          <Card className="calendoodle-card">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue for the past year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, 'Revenue']}
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#2ecc71" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="calendoodle-card">
              <CardHeader>
                <CardTitle>Revenue by Service</CardTitle>
                <CardDescription>Distribution of revenue by service type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={serviceData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={120} />
                      <Tooltip 
                        formatter={(value) => [`$${value * 100}`, 'Revenue']}
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {serviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="calendoodle-card">
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Distribution of payments by method</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Credit Card', value: 65, color: '#3498db' },
                          { name: 'PayPal', value: 20, color: '#2ecc71' },
                          { name: 'Cash', value: 10, color: '#f39c12' },
                          { name: 'Other', value: 5, color: '#9b59b6' }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {serviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Percentage']}
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center space-x-4 mt-4">
                  {[
                    { name: 'Credit Card', color: '#3498db' },
                    { name: 'PayPal', color: '#2ecc71' },
                    { name: 'Cash', color: '#f39c12' },
                    { name: 'Other', color: '#9b59b6' }
                  ].map((entry) => (
                    <div key={entry.name} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <span className="text-sm">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="clients" className="space-y-4">
          <Card className="calendoodle-card">
            <CardHeader>
              <CardTitle>Client Growth</CardTitle>
              <CardDescription>New vs. returning clients by month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={clientData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="newClients" name="New Clients" fill="#3498db" stackId="a" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="returningClients" name="Returning Clients" fill="#9b59b6" stackId="a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-8 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2 bg-[#3498db]"></div>
                  <span className="text-sm">New Clients</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2 bg-[#9b59b6]"></div>
                  <span className="text-sm">Returning Clients</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="calendoodle-card">
              <CardHeader>
                <CardTitle>Client Retention</CardTitle>
                <CardDescription>Client retention rate by quarter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { quarter: 'Q1', rate: 76 },
                      { quarter: 'Q2', rate: 78 },
                      { quarter: 'Q3', rate: 82 },
                      { quarter: 'Q4', rate: 85 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quarter" />
                      <YAxis domain={[70, 90]} />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Retention Rate']}
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="rate" 
                        stroke="#f39c12" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="calendoodle-card">
              <CardHeader>
                <CardTitle>Client Satisfaction</CardTitle>
                <CardDescription>Client satisfaction metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-4xl font-bold text-green-500 flex items-center">
                      <CheckCircle className="h-8 w-8 mr-2" />
                      92%
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                      Clients Satisfied
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-4xl font-bold text-red-500 flex items-center">
                      <XCircle className="h-8 w-8 mr-2" />
                      8%
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                      Clients Unsatisfied
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="text-sm font-medium mb-3">Average Ratings by Service</h4>
                  <div className="space-y-3">
                    {serviceData.slice(0, 4).map((service) => (
                      <div key={service.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{service.name}</span>
                          <span>{4 + Math.random().toFixed(1)}/5</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full bg-calendoodle-blue" 
                            style={{ width: `${80 + Math.random() * 15}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
