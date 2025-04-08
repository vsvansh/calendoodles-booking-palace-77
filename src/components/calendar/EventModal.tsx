
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format, parseISO } from "date-fns";
import { Clock, Calendar as CalendarIcon, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CalendarEvent } from "@/types/calendar";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

const EventModal = ({ isOpen, onClose, date, events, onEventClick }: EventModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] my-4">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-calendoodle-purple" />
            <span>{format(date, "MMMM d, yyyy")}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">
              {events.length} {events.length === 1 ? "Event" : "Events"}
            </h3>
            <Button 
              variant="outline" 
              onClick={() => {
                console.log("Would create new event for", format(date, "yyyy-MM-dd"));
                onClose();
              }}
              className="calendoodle-btn calendoodle-btn-primary"
            >
              Create New
            </Button>
          </div>
          <ScrollArea className="max-h-[50vh]">
            <div className="space-y-4">
              {events.length > 0 ? (
                events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => {
                      onEventClick(event);
                      onClose();
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-lg">{event.title}</h4>
                      <Badge
                        variant={
                          event.status === "confirmed"
                            ? "default"
                            : event.status === "pending"
                            ? "outline"
                            : "destructive"
                        }
                        className="capitalize"
                      >
                        {event.status}
                      </Badge>
                    </div>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>
                          {event.time} ({event.duration} min)
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.location || "Online Meeting"}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{event.attendees || 2} Attendees</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">
                    No events scheduled for this time
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
