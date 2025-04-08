
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, Clock, Layers, User, Users, X, ArrowRight, CalendarClock } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useToast } from "@/hooks/use-toast";

// Mock data
const upcomingAppointments = [
  {
    id: "1",
    title: "Strategy Meeting",
    date: "2025-04-08",  // Today
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
    date: "2025-04-08", // Today
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
    date: "2025-04-09", // Tomorrow
    time: "12:00",
    duration: 90,
    status: "pending",
    color: "#2ecc71",
    attendeeName: "Team Alpha",
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
  },
  {
    title: "Completed",
    value: "32",
    change: "71% completion rate",
    icon: CheckCircle,
    color: "text-calendoodle-green",
    bgColor: "bg-calendoodle-green/10",
  },
  {
    title: "Cancelled",
    value: "8",
    change: "18% cancellation rate",
    icon: X,
    color: "text-calendoodle-red",
    bgColor: "bg-calendoodle-red/10",
  },
  {
    title: "Pending",
    value: "5",
    change: "11% awaiting confirmation",
    icon: Clock,
    color: "text-calendoodle-orange",
    bgColor: "bg-calendoodle-orange/10",
  },
];

const Index = () => {
  const { toast } = useToast();
  
  const handleActionClick = (action: string, appointmentId: string) => {
    toast({
      title: `Appointment ${action}`,
      description: `Appointment #${appointmentId} has been ${action.toLowerCase()}.`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome to your Calendoodles booking system!</p>
        </div>
        <Link to="/calendar">
          <Button className="calendoodle-btn calendoodle-btn-primary">
            <Calendar className="h-4 w-4 mr-2" />
            Open Calendar
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="h-1 w-full" style={{ backgroundColor: stat.color.replace("text-", "") }}></div>
              <CardContent className="pt-6 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
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

      {/* Appointments Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <Card className="lg:col-span-2 calendoodle-card">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Upcoming Appointments</CardTitle>
              <Link to="/appointments" className="text-sm text-calendoodle-blue hover:underline">
                View all
              </Link>
            </div>
            <CardDescription>Your schedule for the upcoming days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div 
                  key={appointment.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-calendoodle-blue/30 hover:shadow-sm transition-all"
                >
                  <div className="flex gap-3 mb-3 sm:mb-0">
                    <div 
                      className="w-1.5 h-auto rounded-full" 
                      style={{backgroundColor: appointment.color}}
                    ></div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">{appointment.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3.5 w-3.5 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {appointment.time} ({appointment.duration} min)
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <CalendarClock className="h-3.5 w-3.5 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {format(parseISO(appointment.date), "EEE, MMM d")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <User className="h-3.5 w-3.5 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {appointment.attendeeName}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {appointment.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:hover:bg-red-900/20"
                          onClick={() => handleActionClick("Declined", appointment.id)}
                        >
                          <X className="h-3.5 w-3.5 mr-1" />
                          Decline
                        </Button>
                        <Button
                          size="sm"
                          className="bg-calendoodle-green text-white hover:bg-calendoodle-green/90"
                          onClick={() => handleActionClick("Confirmed", appointment.id)}
                        >
                          <CheckCircle className="h-3.5 w-3.5 mr-1" />
                          Confirm
                        </Button>
                      </>
                    )}
                    {appointment.status === "confirmed" && (
                      <Button size="sm" className="calendoodle-btn-primary">
                        Join Meeting
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card className="calendoodle-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your appointment system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link to="/calendar" className="block">
              <div className="group flex items-center justify-between p-4 rounded-lg border hover:border-calendoodle-blue/30 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-calendoodle-blue/10">
                    <Calendar className="h-5 w-5 text-calendoodle-blue" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Schedule Meeting</p>
                    <p className="text-sm text-gray-500">Create a new appointment slot</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-calendoodle-blue transition-colors" />
              </div>
            </Link>
            <Link to="/services" className="block">
              <div className="group flex items-center justify-between p-4 rounded-lg border hover:border-calendoodle-purple/30 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-calendoodle-purple/10">
                    <Layers className="h-5 w-5 text-calendoodle-purple" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Manage Services</p>
                    <p className="text-sm text-gray-500">Update your service offerings</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-calendoodle-purple transition-colors" />
              </div>
            </Link>
            <Link to="/clients" className="block">
              <div className="group flex items-center justify-between p-4 rounded-lg border hover:border-calendoodle-orange/30 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-calendoodle-orange/10">
                    <Users className="h-5 w-5 text-calendoodle-orange" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Manage Clients</p>
                    <p className="text-sm text-gray-500">View and edit client information</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-calendoodle-orange transition-colors" />
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
