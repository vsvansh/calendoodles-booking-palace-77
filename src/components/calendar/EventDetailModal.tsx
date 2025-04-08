
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { Clock, Calendar, MapPin, Users, Video, AlertTriangle, Edit, Trash2, Check } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number;
  status: "confirmed" | "pending" | "cancelled";
  color: string;
}

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
  onDelete: (id: string) => void;
}

const EventDetailModal = ({ isOpen, onClose, event, onDelete }: EventDetailModalProps) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      onDelete(event.id);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <div
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: event.color }}
            ></div>
            {event.title}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Calendar className="h-5 w-5 text-calendoodle-blue" />
                <span>{format(parseISO(event.date), "EEEE, MMMM d, yyyy")}</span>
              </div>
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
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Clock className="h-5 w-5 text-calendoodle-purple" />
              <span>
                {event.time} ({event.duration} minutes)
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <MapPin className="h-5 w-5 text-calendoodle-orange" />
              <span>Online Meeting</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Video className="h-5 w-5 text-calendoodle-green" />
              <a href="#" className="text-blue-500 underline">
                Join Video Call
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Users className="h-5 w-5 text-calendoodle-blue" />
              <span>2 Attendees</span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium text-gray-800 dark:text-gray-100">Description</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {event.title} discussion and planning session. Please come prepared with your ideas and updates.
            </p>
          </div>

          {event.status === "pending" && (
            <div className="mt-6 flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                This event is waiting for confirmation. You'll receive a notification once it's confirmed.
              </p>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <div>
              <Button 
                variant="outline" 
                className="text-red-500 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </Button>
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                className="border-calendoodle-blue text-calendoodle-blue hover:bg-calendoodle-blue/10"
              >
                <Edit className="h-4 w-4 mr-2" /> Edit
              </Button>
              <Button className="calendoodle-btn calendoodle-btn-primary">
                <Check className="h-4 w-4 mr-2" /> Confirm
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailModal;
