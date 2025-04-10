
import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Eye, ArrowUpRight, ChevronRight, BarChart3, LineChart as LineChartIcon, PieChart, Users, Calendar, Activity } from 'lucide-react';

// Sample data for analytics
const revenueData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 2780 },
  { month: 'May', revenue: 1890 },
  { month: 'Jun', revenue: 2390 },
  { month: 'Jul', revenue: 3490 },
];

const bookingsData = [
  { month: 'Jan', completed: 65, cancelled: 12 },
  { month: 'Feb', completed: 59, cancelled: 15 },
  { month: 'Mar', completed: 80, cancelled: 8 },
  { month: 'Apr', completed: 81, cancelled: 10 },
  { month: 'May', completed: 56, cancelled: 20 },
  { month: 'Jun', completed: 55, cancelled: 18 },
  { month: 'Jul', completed: 40, cancelled: 15 },
];

const activityData = [
  { 
    id: 1, 
    type: 'appointment', 
    title: 'New booking with Sarah Johnson', 
    time: '10 minutes ago',
    icon: Calendar
  },
  { 
    id: 2, 
    type: 'client', 
    title: 'New client registration: John Doe', 
    time: '2 hours ago',
    icon: Users
  },
  { 
    id: 3, 
    type: 'payment', 
    title: 'Payment received: $75.00 from Emily Clark', 
    time: '3 hours ago',
    icon: Activity
  },
  { 
    id: 4, 
    type: 'appointment', 
    title: 'Appointment cancelled by Michael Brown', 
    time: '5 hours ago',
    icon: Calendar
  },
  { 
    id: 5, 
    type: 'client', 
    title: 'Updated client profile: Alice Williams', 
    time: 'Yesterday',
    icon: Users
  },
];

const Analytics = () => {
  const { toast } = useToast();
  const [chartTimePeriod, setChartTimePeriod] = useState('week');
  const [activityTabValue, setActivityTabValue] = useState('all');

  const filteredActivity = activityTabValue === 'all' 
    ? activityData 
    : activityData.filter(item => item.type === activityTabValue);

  const handleViewReport = (reportType: string) => {
    toast({
      title: `Viewing ${reportType} Report`,
      description: `The detailed ${reportType.toLowerCase()} report is being prepared.`,
    });
  };

  const getActivityIcon = (activity: typeof activityData[0]) => {
    const Icon = activity.icon;
    switch (activity.type) {
      case 'appointment':
        return <Icon className="h-5 w-5 text-calendoodle-blue" />;
      case 'client':
        return <Icon className="h-5 w-5 text-calendoodle-purple" />;
      case 'payment':
        return <Icon className="h-5 w-5 text-calendoodle-green" />;
      default:
        return <Activity className="h-5 w-5 text-calendoodle-orange" />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Track your business performance and insights
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-2 border-calendoodle-blue/20 shadow-md hover:shadow-lg transition-all duration-300 dark:shadow-glow-blue bg-white/80 backdrop-blur-sm dark:bg-gray-800/60 transform hover:translate-y-[-4px]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
                <p className="text-3xl font-bold mt-1 text-gray-800 dark:text-gray-100">$12,628</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">+8.2% from last month</p>
              </div>
              <div className="p-3 rounded-full bg-calendoodle-blue/10 text-calendoodle-blue">
                <BarChart3 className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-calendoodle-purple/20 shadow-md hover:shadow-lg transition-all duration-300 dark:shadow-glow-purple bg-white/80 backdrop-blur-sm dark:bg-gray-800/60 transform hover:translate-y-[-4px]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Bookings</p>
                <p className="text-3xl font-bold mt-1 text-gray-800 dark:text-gray-100">243</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">+12.5% from last month</p>
              </div>
              <div className="p-3 rounded-full bg-calendoodle-purple/10 text-calendoodle-purple">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-calendoodle-green/20 shadow-md hover:shadow-lg transition-all duration-300 dark:shadow-glow-green bg-white/80 backdrop-blur-sm dark:bg-gray-800/60 transform hover:translate-y-[-4px]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">New Clients</p>
                <p className="text-3xl font-bold mt-1 text-gray-800 dark:text-gray-100">48</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">+3.8% from last month</p>
              </div>
              <div className="p-3 rounded-full bg-calendoodle-green/10 text-calendoodle-green">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-calendoodle-orange/20 shadow-md hover:shadow-lg transition-all duration-300 dark:shadow-glow-orange bg-white/80 backdrop-blur-sm dark:bg-gray-800/60 transform hover:translate-y-[-4px]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Completion Rate</p>
                <p className="text-3xl font-bold mt-1 text-gray-800 dark:text-gray-100">87%</p>
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">-2.1% from last month</p>
              </div>
              <div className="p-3 rounded-full bg-calendoodle-orange/10 text-calendoodle-orange">
                <Activity className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <LineChartIcon className="h-5 w-5 text-calendoodle-blue" />
                  <span>Revenue</span>
                </CardTitle>
                <CardDescription>Monthly revenue breakdown</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleViewReport('Revenue')}
                className="text-calendoodle-blue hover:text-calendoodle-blue/90 hover:bg-calendoodle-blue/10 transition-colors"
              >
                <Eye className="h-4 w-4 mr-1" /> View Report
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueData}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(17, 24, 39, 0.8)', 
                      border: 'none',
                      borderRadius: '4px',
                      color: '#F9FAFB' 
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    name="Revenue ($)"
                    stroke="#3B82F6" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-calendoodle-purple" />
                  <span>Bookings</span>
                </CardTitle>
                <CardDescription>Completed vs. cancelled appointments</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleViewReport('Bookings')}
                className="text-calendoodle-purple hover:text-calendoodle-purple/90 hover:bg-calendoodle-purple/10 transition-colors"
              >
                <Eye className="h-4 w-4 mr-1" /> View Report
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={bookingsData}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(17, 24, 39, 0.8)', 
                      border: 'none',
                      borderRadius: '4px',
                      color: '#F9FAFB' 
                    }}
                  />
                  <Legend />
                  <Bar dataKey="completed" name="Completed" fill="#10B981" />
                  <Bar dataKey="cancelled" name="Cancelled" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-calendoodle-orange" />
              <span>Recent Activity</span>
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-calendoodle-blue hover:text-blue-700"
              onClick={() => handleViewReport('Activity')}
            >
              View all <ArrowUpRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
          <Tabs value={activityTabValue} onValueChange={setActivityTabValue} className="w-full">
            <TabsList className="grid grid-cols-3 max-w-[400px]">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="appointment">Appointments</TabsTrigger>
              <TabsTrigger value="client">Clients</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredActivity.length === 0 ? (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                No recent activity found
              </div>
            ) : (
              filteredActivity.map((activity) => (
                <div 
                  key={activity.id}
                  className="flex items-start p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 mr-3">
                    {getActivityIcon(activity)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{activity.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    onClick={() => handleViewReport(`${activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} Details`)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
