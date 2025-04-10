import { useState, useEffect } from 'react';
import { Activity, BarChart3, LineChart as LineChartIcon, ChevronRight, CalendarIcon, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { useToast } from '@/hooks/use-toast';
import AnalyticsChartCard from '@/components/analytics/AnalyticsChartCard';

const revenueData = {
  weekly: [
    { day: 'Mon', revenue: 400 },
    { day: 'Tue', revenue: 300 },
    { day: 'Wed', revenue: 500 },
    { day: 'Thu', revenue: 278 },
    { day: 'Fri', revenue: 189 },
    { day: 'Sat', revenue: 239 },
    { day: 'Sun', revenue: 349 },
  ],
  monthly: [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 5000 },
    { month: 'Apr', revenue: 2780 },
    { month: 'May', revenue: 1890 },
    { month: 'Jun', revenue: 2390 },
    { month: 'Jul', revenue: 3490 },
  ],
  yearly: [
    { year: '2020', revenue: 24000 },
    { year: '2021', revenue: 32000 },
    { year: '2022', revenue: 45000 },
    { year: '2023', revenue: 52780 },
    { year: '2024', revenue: 61890 },
  ],
};

const bookingsData = {
  weekly: [
    { day: 'Mon', completed: 15, cancelled: 3 },
    { day: 'Tue', completed: 12, cancelled: 2 },
    { day: 'Wed', completed: 18, cancelled: 1 },
    { day: 'Thu', completed: 14, cancelled: 4 },
    { day: 'Fri', completed: 10, cancelled: 3 },
    { day: 'Sat', completed: 8, cancelled: 2 },
    { day: 'Sun', completed: 5, cancelled: 1 },
  ],
  monthly: [
    { month: 'Jan', completed: 65, cancelled: 12 },
    { month: 'Feb', completed: 59, cancelled: 15 },
    { month: 'Mar', completed: 80, cancelled: 8 },
    { month: 'Apr', completed: 81, cancelled: 10 },
    { month: 'May', completed: 56, cancelled: 20 },
    { month: 'Jun', completed: 55, cancelled: 18 },
    { month: 'Jul', completed: 40, cancelled: 15 },
  ],
  yearly: [
    { year: '2020', completed: 450, cancelled: 87 },
    { year: '2021', completed: 520, cancelled: 92 },
    { year: '2022', completed: 580, cancelled: 104 },
    { year: '2023', completed: 640, cancelled: 120 },
    { year: '2024', completed: 430, cancelled: 86 },
  ],
};

const activityData = [
  { 
    id: 1, 
    type: 'appointment', 
    title: 'New booking with Sarah Johnson', 
    time: '10 minutes ago',
    icon: Activity
  },
  { 
    id: 2, 
    type: 'client', 
    title: 'New client registration: John Doe', 
    time: '2 hours ago',
    icon: Activity
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
    icon: Activity
  },
  { 
    id: 5, 
    type: 'client', 
    title: 'Updated client profile: Alice Williams', 
    time: 'Yesterday',
    icon: Activity
  },
];

const Analytics = () => {
  const { toast } = useToast();
  const [activityTabValue, setActivityTabValue] = useState('all');
  const [revenueTimeframe, setRevenueTimeframe] = useState('monthly');
  const [bookingsTimeframe, setBookingsTimeframe] = useState('monthly');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredActivity = activityTabValue === 'all' 
    ? activityData 
    : activityData.filter(item => item.type === activityTabValue);

  const handleViewReport = (reportType: string) => {
    toast({
      title: `Viewing ${reportType} Report`,
      description: `The detailed ${reportType.toLowerCase()} report is being prepared.`,
    });
  };

  const handleViewActivityDetails = (activityId: number) => {
    const activity = activityData.find(a => a.id === activityId);
    if (activity) {
      toast({
        title: `${activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} Details`,
        description: `Viewing details for: ${activity.title}`,
      });
    }
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

  const getChartDataKey = (timeframe: string): string => {
    switch (timeframe) {
      case 'weekly':
        return 'day';
      case 'monthly':
        return 'month';
      case 'yearly':
        return 'year';
      default:
        return 'month';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Track your business performance and insights
        </p>
      </div>

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
                <CalendarIcon className="h-5 w-5" />
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <LineChartIcon className="h-5 w-5 text-calendoodle-blue" />
              <span>Revenue</span>
            </h2>
            <ButtonGroup>
              <Button 
                variant={revenueTimeframe === 'weekly' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setRevenueTimeframe('weekly')}
                className="text-xs px-3"
              >
                Weekly
              </Button>
              <Button 
                variant={revenueTimeframe === 'monthly' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setRevenueTimeframe('monthly')}
                className="text-xs px-3"
              >
                Monthly
              </Button>
              <Button 
                variant={revenueTimeframe === 'yearly' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setRevenueTimeframe('yearly')}
                className="text-xs px-3"
              >
                Yearly
              </Button>
            </ButtonGroup>
          </div>
          <AnalyticsChartCard
            chartType="line"
            data={revenueData[revenueTimeframe as keyof typeof revenueData]}
            dataKeys={{
              name: getChartDataKey(revenueTimeframe),
              keys: [
                { key: 'revenue', name: 'Revenue ($)', color: '#3B82F6' }
              ]
            }}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-calendoodle-purple" />
              <span>Bookings</span>
            </h2>
            <ButtonGroup>
              <Button 
                variant={bookingsTimeframe === 'weekly' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setBookingsTimeframe('weekly')}
                className="text-xs px-3"
              >
                Weekly
              </Button>
              <Button 
                variant={bookingsTimeframe === 'monthly' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setBookingsTimeframe('monthly')}
                className="text-xs px-3"
              >
                Monthly
              </Button>
              <Button 
                variant={bookingsTimeframe === 'yearly' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setBookingsTimeframe('yearly')}
                className="text-xs px-3"
              >
                Yearly
              </Button>
            </ButtonGroup>
          </div>
          <AnalyticsChartCard
            chartType="bar"
            data={bookingsData[bookingsTimeframe as keyof typeof bookingsData]}
            dataKeys={{
              name: getChartDataKey(bookingsTimeframe),
              keys: [
                { key: 'completed', name: 'Completed', color: '#10B981' },
                { key: 'cancelled', name: 'Cancelled', color: '#EF4444' }
              ]
            }}
          />
        </div>
      </div>

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
              View all
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
                    onClick={() => handleViewActivityDetails(activity.id)}
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
