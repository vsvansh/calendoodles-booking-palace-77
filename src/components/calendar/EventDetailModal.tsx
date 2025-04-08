
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, parseISO } from "date-fns";
import { 
  Clock, Calendar, MapPin, Users, Video, AlertTriangle, Edit, 
  Trash2, Check, Copy, X, Save, ChevronDown 
} from "lucide-react";
import { CalendarEvent } from "@/types/calendar";
import { useToast } from "@/hooks/use-toast";

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: CalendarEvent;
  onDelete: (id: string) => void;
  onEdit?: (event: CalendarEvent) => void;
}

const EventDetailModal = ({ 
  isOpen, 
  onClose, 
  event, 
  onDelete, 
  onEdit 
}: EventDetailModalProps) => {
  const { toast } = useToast();
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState<CalendarEvent>({...event});
  
  const colorOptions = [
    { value: "#3498db", label: "Blue" },
    { value: "#9b59b6", label: "Purple" },
    { value: "#2ecc71", label: "Green" },
    { value: "#e74c3c", label: "Red" },
    { value: "#f39c12", label: "Orange" },
  ];
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://calendoodle.app/event/${event.id}`);
    toast({
      title: "Link copied",
      description: "Event link copied to clipboard",
    });
  };

  const handleDelete = () => {
    if (isConfirmingDelete) {
      onDelete(event.id);
      setIsConfirmingDelete(false);
    } else {
      setIsConfirmingDelete(true);
    }
  };
  
  const handleEdit = () => {
    setIsEditing(true);
    setEditedEvent({...event});
  };
  
  const handleSaveEdit = () => {
    if (onEdit) {
      onEdit(editedEvent);
      setIsEditing(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedEvent(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setEditedEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: "confirmed" | "pending" | "cancelled") => {
    setEditedEvent(prev => ({ ...prev, status: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        setIsConfirmingDelete(false);
        setIsEditing(false);
        onClose();
      }
    }}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] my-4 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <div
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: event.color }}
            ></div>
            {isEditing ? (
              <Input 
                name="title" 
                value={editedEvent.title} 
                onChange={handleInputChange}
                className="calendoodle-input"
              />
            ) : (
              event.title
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 overflow-y-auto max-h-[calc(80vh-100px)]">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Calendar className="h-5 w-5 text-calendoodle-blue" />
                <span>{format(parseISO(event.date), "EEEE, MMMM d, yyyy")}</span>
              </div>
              {isEditing ? (
                <Select 
                  value={editedEvent.status}
                  onValueChange={(value: "confirmed" | "pending" | "cancelled") => handleStatusChange(value)}
                >
                  <SelectTrigger className="w-32 calendoodle-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
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
              )}
            </div>
            
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Clock className="h-5 w-5 text-calendoodle-purple" />
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <Input 
                    name="time" 
                    type="time"
                    value={editedEvent.time} 
                    onChange={handleInputChange}
                    className="w-24 calendoodle-input"
                  />
                  <span>Duration:</span>
                  <Input 
                    name="duration" 
                    type="number"
                    value={editedEvent.duration} 
                    onChange={handleInputChange}
                    className="w-20 calendoodle-input"
                  />
                  <span>min</span>
                </div>
              ) : (
                <span>
                  {event.time} ({event.duration} minutes)
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <MapPin className="h-5 w-5 text-calendoodle-orange" />
              {isEditing ? (
                <Input 
                  name="location" 
                  value={editedEvent.location || ''} 
                  placeholder="Enter location"
                  onChange={handleInputChange}
                  className="calendoodle-input"
                />
              ) : (
                <span>{event.location || "Online Meeting"}</span>
              )}
            </div>
            
            {!isEditing && (
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Video className="h-5 w-5 text-calendoodle-green" />
                <a href="#" className="text-blue-500 underline">
                  Join Video Call
                </a>
              </div>
            )}
            
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Users className="h-5 w-5 text-calendoodle-blue" />
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <Input 
                    name="attendees" 
                    type="number"
                    value={editedEvent.attendees || 0} 
                    onChange={handleInputChange}
                    className="w-20 calendoodle-input"
                  />
                  <span>Attendees</span>
                </div>
              ) : (
                <span>{event.attendees || 2} Attendees</span>
              )}
            </div>
            
            {isEditing && (
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <div className="h-5 w-5 rounded-full" style={{ backgroundColor: editedEvent.color }}></div>
                <Select 
                  value={editedEvent.color}
                  onValueChange={(value) => handleSelectChange('color', value)}
                >
                  <SelectTrigger className="w-32 calendoodle-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: option.value }}
                          ></div>
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {!isEditing && (
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={handleCopyLink} className="gap-1 text-gray-500">
                  <Copy className="h-3.5 w-3.5" /> Share
                </Button>
              </div>
            )}
          </div>

          <div className="mt-6">
            <h3 className="font-medium text-gray-800 dark:text-gray-100">Description</h3>
            {isEditing ? (
              <Textarea
                name="notes"
                value={editedEvent.notes || ''}
                placeholder="Add event description"
                onChange={handleInputChange}
                className="mt-2 calendoodle-input h-24"
              />
            ) : (
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {event.notes || `${event.title} discussion and planning session. Please come prepared with your ideas and updates.`}
              </p>
            )}
          </div>

          {!isEditing && event.status === "pending" && (
            <div className="mt-6 flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                This event is waiting for confirmation. You'll receive a notification once it's confirmed.
              </p>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <div>
              {isEditing ? (
                <Button 
                  variant="outline" 
                  className="text-gray-500 border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
                  onClick={() => setIsEditing(false)}
                >
                  <X className="h-4 w-4 mr-2" /> Cancel
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  className={`${isConfirmingDelete 
                    ? "bg-red-50 dark:bg-red-950 text-red-600 border-red-300 dark:border-red-800 hover:bg-red-100" 
                    : "text-red-500 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950"}`}
                  onClick={handleDelete}
                >
                  {isConfirmingDelete ? (
                    <>
                      <X className="h-4 w-4 mr-2" /> Cancel
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                    </>
                  )}
                </Button>
              )}
            </div>
            <div className="space-x-2">
              {isEditing ? (
                <Button 
                  className="calendoodle-btn calendoodle-btn-primary"
                  onClick={handleSaveEdit}
                >
                  <Save className="h-4 w-4 mr-2" /> Save Changes
                </Button>
              ) : (
                !isConfirmingDelete ? (
                  <>
                    <Button
                      variant="outline"
                      className="border-calendoodle-blue text-calendoodle-blue hover:bg-calendoodle-blue/10"
                      onClick={handleEdit}
                    >
                      <Edit className="h-4 w-4 mr-2" /> Edit
                    </Button>
                    {event.status !== "confirmed" && (
                      <Button className="calendoodle-btn calendoodle-btn-primary">
                        <Check className="h-4 w-4 mr-2" /> Confirm
                      </Button>
                    )}
                  </>
                ) : (
                  <Button 
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => onDelete(event.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Confirm Delete
                  </Button>
                )
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailModal;
