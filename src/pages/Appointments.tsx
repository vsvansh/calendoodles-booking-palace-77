
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon, Clock, ExternalLink, Plus, Search, User, Video, Check, Trash2, Download } from "lucide-react";
import EventDetailModal from "@/components/calendar/EventDetailModal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number;
  status: "confirmed" | "pending" | "cancelled";
  color: string;
  client: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    title: "Strategy Meeting",
    date: "2025-04-08",
    time: "10:00",
    duration: 60,
    status: "confirmed",
    color: "#3498db",
    client: {
      name: "Alice Johnson",
      email: "alice@example.com",
    },
  },
  {
    id: "2",
    title: "Doctor Appointment",
    date: "2025-04-08",
    time: "14:00",
    duration: 30,
    status: "confirmed",
    color: "#e74c3c",
    client: {
      name: "Bob Smith",
      email: "bob@example.com",
    },
  },
  {
    id: "3",
    title: "Team Lunch",
    date: "2025-04-09",
    time: "12:00",
    duration: 90,
    status: "pending",
    color: "#2ecc71",
    client: {
      name: "Team Alpha",
      email: "team@example.com",
    },
  },
  {
    id: "4",
    title: "Project Review",
    date: "2025-04-10",
    time: "15:00",
    duration: 45,
    status: "confirmed",
    color: "#9b59b6",
    client: {
      name: "Charlie Brown",
      email: "charlie@example.com",
    },
  },
  {
    id: "5",
    title: "Client Call",
    date: "2025-04-11",
    time: "11:00",
    duration: 30,
    status: "cancelled",
    color: "#f39c12",
    client: {
      name: "Diana Evans",
      email: "diana@example.com",
    },
  },
];

const Appointments = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeRange, setTimeRange] = useState("all");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isNewAppointmentModalOpen, setIsNewAppointmentModalOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '10:00',
    clientName: '',
    clientEmail: '',
  });
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      searchQuery === "" ||
      appointment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.client.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      activeTab === "all" ||
      (activeTab === "upcoming" && appointment.status !== "cancelled") ||
      appointment.status === activeTab;

    // Simple time filtering logic
    const now = new Date();
    const appointmentDate = parseISO(appointment.date);
    const isToday = now.toDateString() === appointmentDate.toDateString();
    const isThisWeek = appointmentDate > now && 
      appointmentDate < new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
    const isThisMonth = appointmentDate.getMonth() === now.getMonth() && 
      appointmentDate.getFullYear() === now.getFullYear();

    const matchesTimeRange =
      timeRange === "all" ||
      (timeRange === "today" && isToday) ||
      (timeRange === "week" && isThisWeek) ||
      (timeRange === "month" && isThisMonth);

    return matchesSearch && matchesStatus && matchesTimeRange;
  });

  const handleViewAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== id));
    toast({
      title: "Appointment deleted",
      description: `Appointment has been successfully deleted.`,
    });
    setIsModalOpen(false);
  };
  
  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };
  
  const handleSelectAll = () => {
    if (selectedItems.length === filteredAppointments.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredAppointments.map(appointment => appointment.id));
    }
  };
  
  const handleRemoveSelected = () => {
    setAppointments(prevAppointments => 
      prevAppointments.filter(appointment => !selectedItems.includes(appointment.id))
    );
    toast({
      title: "Appointments removed",
      description: `${selectedItems.length} appointments have been removed.`,
    });
    setSelectedItems([]);
  };
  
  const handleDownloadInvoice = (id: string) => {
    // In a real app, we would generate a PDF here
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent('Invoice for appointment #' + id));
    element.setAttribute('download', `invoice-${id}.pdf`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Invoice downloaded",
      description: `Invoice for appointment #${id} has been downloaded.`,
    });
  };
  
  const handleCreateAppointment = () => {
    if (newAppointment.title.trim() && newAppointment.clientName.trim() && newAppointment.clientEmail.trim()) {
      const newId = String(Date.now());
      const appointment: Appointment = {
        id: newId,
        title: newAppointment.title,
        date: newAppointment.date,
        time: newAppointment.time,
        duration: 60,
        status: "pending",
        color: "#3498db",
        client: {
          name: newAppointment.clientName,
          email: newAppointment.clientEmail,
        },
      };
      
      setAppointments([...appointments, appointment]);
      
      toast({
        title: "Appointment created",
        description: `New appointment "${newAppointment.title}" has been created.`,
      });
      
      setIsNewAppointmentModalOpen(false);
      setNewAppointment({
        title: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        time: '10:00',
        clientName: '',
        clientEmail: '',
      });
    } else {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Appointments</h1>
          <p className="text-gray-500 mt-1">Manage and track your appointments</p>
        </div>
        <Button 
          className="calendoodle-btn calendoodle-btn-primary"
          onClick={() => setIsNewAppointmentModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Appointment
        </Button>
      </div>

      <Card className="calendoodle-card">
        <CardHeader className="pb-2">
          <CardTitle>Appointment List</CardTitle>
          <CardDescription>View and manage all your scheduled appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search appointments..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {selectedItems.length > 0 && (
            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/40 p-2 rounded-md mb-4 transition-all">
              <div className="text-sm">
                {selectedItems.length} {selectedItems.length === 1 ? "item" : "items"} selected
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleSelectAll}>
                  {selectedItems.length === filteredAppointments.length ? "Deselect All" : "Select All"}
                </Button>
                <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30" onClick={handleRemoveSelected}>
                  <Trash2 className="h-4 w-4 mr-1" /> Remove Selected
                </Button>
              </div>
            </div>
          )}

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="mt-6"
          >
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800/50">
                        <th className="py-3 px-2 text-left">
                          <Checkbox 
                            checked={selectedItems.length === filteredAppointments.length && filteredAppointments.length > 0}
                            onCheckedChange={handleSelectAll}
                            className="data-[state=checked]:bg-calendoodle-purple"
                          />
                        </th>
                        <th className="py-3 px-4 text-left font-medium text-gray-500">
                          Appointment
                        </th>
                        <th className="py-3 px-4 text-left font-medium text-gray-500">
                          Client
                        </th>
                        <th className="py-3 px-4 text-left font-medium text-gray-500">
                          Date & Time
                        </th>
                        <th className="py-3 px-4 text-left font-medium text-gray-500">
                          Status
                        </th>
                        <th className="py-3 px-4 text-center font-medium text-gray-500">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAppointments.length > 0 ? (
                        filteredAppointments.map((appointment) => (
                          <tr
                            key={appointment.id}
                            className={`border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/30 ${
                              selectedItems.includes(appointment.id) ? 'bg-gray-50 dark:bg-gray-800/40' : ''
                            }`}
                          >
                            <td className="py-3 px-2">
                              <Checkbox 
                                checked={selectedItems.includes(appointment.id)} 
                                onCheckedChange={() => handleSelectItem(appointment.id)}
                                className="data-[state=checked]:bg-calendoodle-purple"
                              />
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div
                                  className="h-3 w-3 rounded-full"
                                  style={{ backgroundColor: appointment.color }}
                                ></div>
                                <span className="font-medium">{appointment.title}</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {appointment.duration} minutes
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                  {appointment.client.avatar ? (
                                    <img
                                      src={appointment.client.avatar}
                                      alt={appointment.client.name}
                                      className="h-full w-full rounded-full"
                                    />
                                  ) : (
                                    <User className="h-4 w-4 text-gray-500" />
                                  )}
                                </div>
                                <div>
                                  <div className="font-medium">
                                    {appointment.client.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {appointment.client.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-1">
                                <CalendarIcon className="h-3.5 w-3.5 text-gray-500" />
                                <span>
                                  {format(parseISO(appointment.date), "MMM d, yyyy")}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                <Clock className="h-3.5 w-3.5 text-gray-500" />
                                <span>{appointment.time}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge
                                variant={
                                  appointment.status === "confirmed"
                                    ? "default"
                                    : appointment.status === "pending"
                                    ? "outline"
                                    : "destructive"
                                }
                                className="capitalize"
                              >
                                {appointment.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <div className="flex justify-center gap-2">
                                {appointment.status === "confirmed" && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => toast({
                                      title: "Meeting link",
                                      description: "Video meeting link copied to clipboard",
                                    })}
                                  >
                                    <Video className="h-4 w-4 text-calendoodle-blue" />
                                    <span className="sr-only">Join Meeting</span>
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleViewAppointment(appointment)}
                                >
                                  <ExternalLink className="h-4 w-4 text-gray-500" />
                                  <span className="sr-only">View Details</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleDownloadInvoice(appointment.id)}
                                >
                                  <Download className="h-4 w-4 text-gray-500" />
                                  <span className="sr-only">Download Invoice</span>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-gray-500">
                            No appointments found. Try adjusting your filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {selectedAppointment && (
        <EventDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          event={{
            id: selectedAppointment.id,
            title: selectedAppointment.title,
            date: selectedAppointment.date,
            time: selectedAppointment.time,
            duration: selectedAppointment.duration,
            status: selectedAppointment.status,
            color: selectedAppointment.color,
          }}
          onDelete={handleDeleteAppointment}
        />
      )}

      <Dialog open={isNewAppointmentModalOpen} onOpenChange={setIsNewAppointmentModalOpen}>
        <DialogContent className="sm:max-w-[500px] my-8">
          <DialogHeader>
            <DialogTitle>Create New Appointment</DialogTitle>
            <DialogDescription>
              Enter the appointment details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Appointment Title</Label>
              <Input
                id="title"
                value={newAppointment.title}
                onChange={(e) => setNewAppointment({...newAppointment, title: e.target.value})}
                placeholder="Enter appointment title"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                value={newAppointment.clientName}
                onChange={(e) => setNewAppointment({...newAppointment, clientName: e.target.value})}
                placeholder="Enter client name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="clientEmail">Client Email</Label>
              <Input
                id="clientEmail"
                type="email"
                value={newAppointment.clientEmail}
                onChange={(e) => setNewAppointment({...newAppointment, clientEmail: e.target.value})}
                placeholder="Enter client email"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewAppointmentModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateAppointment}>Create Appointment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Appointments;
