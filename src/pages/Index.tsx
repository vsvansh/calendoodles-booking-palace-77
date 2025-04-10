
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, CheckCircle, Clock, Layers, User, Users, X, 
  ArrowRight, CalendarClock, ArrowUpRight, Star, Bell,
  BarChart3, Settings, Video
} from "lucide-react";
import { format, parseISO, isToday, isTomorrow, addDays } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

// Mock data
const upcomingAppointments = [
  {
    id: "1",
    title: "Strategy Meeting",
    date: "2025-04-08",
    time: "10:00",
    duration: 60,
    status: "confirmed",
    color: "#3498db",
    attendeeName: "Alice Johnson",
    attendeeAvatar: "/placeholder.svg",
  },
  {
    id: "2",
    title: "Doctor Appointment",
    date: "2025-04-08",
    time: "14:00",
    duration: 30,
    status: "confirmed",
    color: "#e74c3c",
    attendeeName: "Bob Smith",
    attendeeAvatar: "/placeholder.svg",
  },
  {
    id: "3",
    title: "Team Lunch",
    date: "2025-04-09",
    time: "12:00",
    duration: 90,
    status: "pending",
    color: "#2ecc71",
    attendeeName: "Team Alpha",
    attendeeAvatar: "/placeholder.svg",
  },
  {
    id: "4",
    title: "Client Consultation",
    date: format(addDays(new Date(), 2), "yyyy-MM-dd"),
    time: "16:00",
    duration: 45,
    status: "pending",
    color: "#9b59b6",
    attendeeName: "John Williams",
    attendeeAvatar: "/placeholder.svg",
  },
  {
    id: "5",
    title: "Project Review",
    date: format(addDays(new Date(), 3), "yyyy-MM-dd"),
    time: "09:30",
    duration: 60,
    status: "confirmed",
    color: "#f39c12",
    attendeeName: "Product Team",
    attendeeAvatar: "/placeholder.svg",
  },
];

// Quick stats
const quickStats = [
  {
    title: "Total Appointments",
    value: "45",
    change: "+12% from last month",
    icon: Calendar,
    color: "text-calendoodle-blue",
    bgColor: "bg-calendoodle-blue/10",
    borderColor: "border-calendoodle-blue/20",
    glowClass: "dark:shadow-glow-blue"
  },
  {
    title: "Completed",
    value: "32",
    change: "71% completion rate",
    icon: CheckCircle,
    color: "text-calendoodle-green",
    bgColor: "bg-calendoodle-green/10",
    borderColor: "border-calendoodle-green/20",
    glowClass: "dark:shadow-glow-green"
  },
  {
    title: "Cancelled",
    value: "8",
    change: "18% cancellation rate",
    icon: X,
    color: "text-calendoodle-red",
    bgColor: "bg-calendoodle-red/10",
    borderColor: "border-calendoodle-red/20",
    glowClass: "dark:shadow-[0_0_15px_rgba(231,76,60,0.3)]"
  },
  {
    title: "Pending",
    value: "5",
    change: "11% awaiting confirmation",
    icon: Clock,
    color: "text-calendoodle-orange",
    bgColor: "bg-calendoodle-orange/10",
    borderColor: "border-calendoodle-orange/20",
    glowClass: "dark:shadow-glow-orange"
  },
];

const quickActions = [
  {
    title: "Schedule Meeting",
    description: "Create a new appointment slot",
    icon: Calendar,
    color: "text-calendoodle-blue",
    bgColor: "bg-calendoodle-blue/10",
    href: "/calendar",
    hoverColor: "calendoodle-blue"
  },
  {
    title: "Manage Services",
    description: "Update your service offerings",
    icon: Layers,
    color: "text-calendoodle-purple",
    bgColor: "bg-calendoodle-purple/10",
    href: "/services",
    hoverColor: "calendoodle-purple"
  },
  {
    title: "Manage Clients",
    description: "View and edit client information",
    icon: Users,
    color: "text-calendoodle-orange",
    bgColor: "bg-calendoodle-orange/10",
    href: "/clients",
    hoverColor: "calendoodle-orange"
  },
  {
    title: "View Analytics",
    description: "Monitor your business performance",
    icon: BarChart3,
    color: "text-calendoodle-green",
    bgColor: "bg-calendoodle-green/10",
    href: "/analytics",
    hoverColor: "calendoodle-green"
  },
];

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleActionClick = (action: string, appointmentId: string) => {
    toast({
      title: `Appointment ${action}`,
      description: `Appointment #${appointmentId} has been ${action.toLowerCase()}.`,
    });
  };

  const handleJoinMeeting = (appointmentId: string) => {
    // In real app, this would initiate a video call
    toast({
      title: "Joining meeting",
      description: `Connecting to meeting #${appointmentId}...`,
    });
  };

  const getDateLabel = (dateString: string) => {
    const date = parseISO(dateString);
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "EEE, MMM d");
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    window.scrollTo(0, 0);
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-calendoodle-blue/10 to-calendoodle-purple/10 dark:from-calendoodle-blue/20 dark:to-calendoodle-purple/20 rounded-xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/40 dark:bg-black/20 backdrop-blur-sm z-0"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-3">Welcome to Calendoodles</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-6">
            Your modern booking system for managing appointments effortlessly. Create, schedule, and manage your calendar with ease.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/calendar">
              <Button className="calendoodle-btn calendoodle-btn-primary group transform hover:scale-105 transition-transform duration-300">
                <Calendar className="h-4 w-4 mr-2 group-hover:animate-spin-slow" />
                Open Calendar
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="border-2 rounded-full px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
              onClick={handleSettingsClick}
            >
              <Settings className="h-4 w-4 mr-2" /> Settings
            </Button>
          </div>
        </div>
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-calendoodle-blue opacity-10 rounded-full filter blur-3xl animate-pulse-subtle"></div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={index} 
              className={`overflow-hidden border-2 ${stat.borderColor} shadow-md hover:shadow-xl transition-all duration-300 ${stat.glowClass} bg-white/80 backdrop-blur-sm dark:bg-gray-800/60 transform hover:scale-105 hover:-translate-y-1`}
            >
              <div className="h-1 w-full" style={{ backgroundColor: stat.color.replace("text-", "") }}></div>
              <CardContent className="pt-6 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                    <p className="text-3xl font-bold mt-1 text-gray-800 dark:text-gray-100">{stat.value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor} animate-float`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Appointments Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <Card className="lg:col-span-2 calendoodle-card glow-card overflow-visible">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-calendoodle-purple" />
                <span>Upcoming Appointments</span>
              </CardTitle>
              <Link to="/appointments" className="text-sm text-calendoodle-blue hover:underline flex items-center gap-1">
                View all <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <CardDescription>Your schedule for the upcoming days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => {
                const dateLabel = getDateLabel(appointment.date);
                
                return (
                  <div 
                    key={appointment.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border-2 border-gray-100 dark:border-gray-700 hover:border-calendoodle-blue/30 dark:hover:border-calendoodle-blue/30 hover:shadow-md dark:hover:shadow-[0_0_10px_rgba(52,152,219,0.15)] transition-all group transform hover:-translate-y-1"
                  >
                    <div className="flex gap-3 mb-3 sm:mb-0">
                      <div className="relative">
                        <div 
                          className="w-1.5 h-full rounded-full absolute left-0 top-0" 
                          style={{backgroundColor: appointment.color}}
                        ></div>
                        <div className="w-[3px] h-full bg-transparent group-hover:bg-white/50 dark:group-hover:bg-white/10 absolute left-0 top-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-full animate-pulse"></div>
                      </div>
                      <div className="pl-3">
                        <div className="flex items-center">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">{appointment.title}</h4>
                          <Badge 
                            variant={
                              appointment.status === "confirmed"
                                ? "default"
                                : appointment.status === "pending"
                                ? "outline"
                                : "destructive"
                            }
                            className="capitalize ml-2 text-xs py-0 h-5"
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                        <div className="flex gap-4 mt-1">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {appointment.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CalendarClock className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {dateLabel}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {appointment.attendeeName}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      {appointment.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:hover:bg-red-900/20 transition-all transform hover:scale-105"
                            onClick={() => handleActionClick("Declined", appointment.id)}
                          >
                            <X className="h-3.5 w-3.5 mr-1" />
                            Decline
                          </Button>
                          <Button
                            size="sm"
                            className="bg-calendoodle-green text-white hover:bg-calendoodle-green/90 transition-all transform hover:scale-105"
                            onClick={() => handleActionClick("Confirmed", appointment.id)}
                          >
                            <CheckCircle className="h-3.5 w-3.5 mr-1" />
                            Confirm
                          </Button>
                        </>
                      )}
                      {appointment.status === "confirmed" && (
                        <Button 
                          size="sm" 
                          className="calendoodle-btn-primary py-1 px-4 transition-transform hover:scale-105"
                          onClick={() => handleJoinMeeting(appointment.id)}
                        >
                          <Video className="h-3.5 w-3.5 mr-1" /> Join Meeting
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card className="calendoodle-card glow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-calendoodle-orange" />
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>Manage your appointment system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link to={action.href} key={index} className="block">
                  <div className={`group flex items-center justify-between p-4 rounded-lg border-2 border-gray-100 dark:border-gray-700 hover:border-${action.hoverColor}/30 hover:shadow-sm transition-all duration-300 transform hover:-translate-y-1`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-md ${action.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`h-5 w-5 ${action.color}`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{action.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{action.description}</p>
                      </div>
                    </div>
                    <ArrowRight className={`h-5 w-5 text-gray-400 group-hover:${action.color} transition-colors group-hover:translate-x-1 duration-300`} />
                  </div>
                </Link>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
