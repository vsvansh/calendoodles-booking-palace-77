
import { format, isSameHour, parseISO } from "date-fns";
import { CalendarEvent } from "@/types/calendar";

interface DayViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onTimeSlotClick: (date: Date) => void;
}

const DayView = ({ currentDate, events, onEventClick, onTimeSlotClick }: DayViewProps) => {
  const hours = Array.from({ length: 24 }).map((_, i) => i);

  const getEventsForHour = (hour: number) => {
    return events.filter((event) => {
      const eventDate = parseISO(event.date);
      const eventHour = parseInt(event.time.split(":")[0], 10);
      return isSameHour(new Date(eventDate.setHours(eventHour)), new Date(currentDate).setHours(hour));
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden animate-slide-up">
      <div className="text-center p-4 bg-gray-50 dark:bg-gray-900/60 border-b dark:border-gray-700">
        <h3 className="text-lg font-medium">
          {format(currentDate, "EEEE, MMMM d, yyyy")}
        </h3>
      </div>

      <div className="overflow-y-auto" style={{ maxHeight: "70vh" }}>
        {hours.map((hour) => {
          const hourEvents = getEventsForHour(hour);
          return (
            <div
              key={hour}
              className="grid grid-cols-12 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/30"
            >
              <div className="col-span-1 p-3 text-right border-r dark:border-gray-700 text-sm font-medium">
                {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
              </div>
              <div
                className="col-span-11 p-2 min-h-[80px] relative cursor-pointer"
                onClick={() => {
                  const dateWithTime = new Date(currentDate);
                  dateWithTime.setHours(hour, 0, 0, 0);
                  onTimeSlotClick(dateWithTime);
                }}
              >
                {hourEvents.length === 0 ? (
                  <div className="h-full w-full"></div>
                ) : (
                  hourEvents.map((event, index) => (
                    <div
                      key={event.id}
                      className="p-2 mb-1 rounded cursor-pointer transition-transform hover:translate-y-[-2px]"
                      style={{
                        backgroundColor: event.color + "33", // Adding transparency
                        borderLeft: `4px solid ${event.color}`,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                    >
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {event.time} • {event.duration} minutes
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayView;
