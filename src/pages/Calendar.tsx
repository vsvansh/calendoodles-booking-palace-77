
import { useState } from "react";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import MonthView from "@/components/calendar/MonthView";
import WeekView from "@/components/calendar/WeekView";
import DayView from "@/components/calendar/DayView";
import EventDetailModal from "@/components/calendar/EventDetailModal";
import CreateEventModal from "@/components/calendar/CreateEventModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CalendarEvent } from "@/types/calendar";

// Mock events data
const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Strategy Meeting",
    date: "2025-04-08",  // Today
    time: "10:00",
    duration: 60,
    status: "confirmed",
    color: "#3498db",
    location: "Conference Room A",
    attendees: 4,
    notes: "Quarterly strategy planning session with the executive team."
  },
  {
    id: "2",
    title: "Doctor Appointment",
    date: "2025-04-08", // Today
    time: "14:00",
    duration: 30,
    status: "confirmed",
    color: "#e74c3c",
    location: "Medical Center",
    attendees: 1
  },
  {
    id: "3",
    title: "Team Lunch",
    date: "2025-04-09", // Tomorrow
    time: "12:00",
    duration: 90,
    status: "pending",
    color: "#2ecc71",
    location: "Downtown Bistro",
    attendees: 6,
    notes: "Monthly team lunch to discuss progress and celebrate achievements."
  },
  {
    id: "4",
    title: "Project Review",
    date: "2025-04-10",
    time: "15:00",
    duration: 45,
    status: "confirmed",
    color: "#9b59b6",
    location: "Online Meeting"
  },
  {
    id: "5",
    title: "Client Call",
    date: "2025-04-11",
    time: "11:00",
    duration: 30,
    status: "cancelled",
    color: "#f39c12",
    location: "Phone Conference"
  },
];

const Calendar = () => {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isEventDetailModalOpen, setIsEventDetailModalOpen] = useState(false);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<Date | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  const [isDragging, setIsDragging] = useState(false);

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsEventDetailModalOpen(true);
  };

  const handleCreateEvent = (newEvent: CalendarEvent) => {
    setEvents((prevEvents) => [...prevEvents, { ...newEvent, id: String(Date.now()) }]);
    setIsCreateEventModalOpen(false);
    toast({
      title: "Event created",
      description: "Your event has been successfully created.",
    });
  };

  const handleTimeSlotClick = (date: Date) => {
    setSelectedTimeSlot(date);
    setIsCreateEventModalOpen(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId));
    setIsEventDetailModalOpen(false);
    toast({
      title: "Event deleted",
      description: "Your event has been successfully deleted.",
    });
  };

  // This would be implemented in a real app
  const handleEventDrop = (eventId: string, newDate: Date, newTime: string) => {
    setEvents(prevEvents => 
      prevEvents.map(event => {
        if (event.id === eventId) {
          const updatedEvent = {
            ...event,
            date: format(newDate, "yyyy-MM-dd"),
            time: newTime
          };
          
          toast({
            title: "Event moved",
            description: `${event.title} moved to ${format(newDate, "MMM d")} at ${newTime}`,
          });
          
          return updatedEvent;
        }
        return event;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Calendar</h1>
        <Button 
          onClick={() => {
            setSelectedTimeSlot(new Date());
            setIsCreateEventModalOpen(true);
          }}
          className="calendoodle-btn calendoodle-btn-primary"
        >
          <Plus className="h-4 w-4 mr-1" /> New Event
        </Button>
      </div>

      <div>
        <CalendarHeader
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          view={view}
          setView={setView}
        />

        {view === "month" && (
          <MonthView
            currentDate={currentDate}
            events={events}
            onEventClick={handleEventClick}
          />
        )}

        {view === "week" && (
          <WeekView
            currentDate={currentDate}
            events={events}
            onEventClick={handleEventClick}
          />
        )}

        {view === "day" && (
          <DayView
            currentDate={currentDate}
            events={events}
            onEventClick={handleEventClick}
            onTimeSlotClick={handleTimeSlotClick}
          />
        )}
      </div>

      {selectedEvent && (
        <EventDetailModal
          isOpen={isEventDetailModalOpen}
          onClose={() => setIsEventDetailModalOpen(false)}
          event={selectedEvent}
          onDelete={handleDeleteEvent}
        />
      )}

      <CreateEventModal
        isOpen={isCreateEventModalOpen}
        onClose={() => setIsCreateEventModalOpen(false)}
        initialDate={selectedTimeSlot}
        onCreate={handleCreateEvent}
      />
    </div>
  );
};

export default Calendar;
