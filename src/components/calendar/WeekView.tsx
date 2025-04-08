
import { startOfWeek, addDays, format, isSameDay, parseISO } from "date-fns";
import { useState } from "react";
import EventModal from "./EventModal";
import { CalendarEvent } from "@/types/calendar";

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

const WeekView = ({ currentDate, events, onEventClick }: WeekViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const start = startOfWeek(currentDate);
  const days = Array.from({ length: 7 }).map((_, i) => addDays(start, i));

  const hours = Array.from({ length: 24 }).map((_, i) => i);

  const handleTimeSlotClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  const getEventsForDateAndHour = (date: Date, hour: number) => {
    return events.filter((event) => {
      const eventDate = parseISO(event.date);
      const eventHour = parseInt(event.time.split(":")[0], 10);
      return isSameDay(eventDate, date) && eventHour === hour;
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden animate-slide-up">
      <div className="grid grid-cols-8 border-b dark:border-gray-700">
        <div className="p-2 text-center border-r dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60"></div>
        {days.map((day, index) => (
          <div
            key={index}
            className={`p-2 text-center border-r dark:border-gray-700 
            ${
              isSameDay(day, new Date())
                ? "bg-calendoodle-blue/10 dark:bg-calendoodle-blue/5"
                : "bg-gray-50 dark:bg-gray-900/60"
            }`}
          >
            <div className="font-medium">{format(day, "EEE")}</div>
            <div
              className={`text-sm ${
                isSameDay(day, new Date()) ? "text-calendoodle-blue font-bold" : ""
              }`}
            >
              {format(day, "d")}
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-y-auto" style={{ maxHeight: "70vh" }}>
        {hours.map((hour) => (
          <div key={hour} className="grid grid-cols-8 border-b dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
            <div className="p-1 text-center border-r dark:border-gray-700 text-sm font-medium bg-gray-50/50 dark:bg-gray-900/30">
              {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
            </div>
            {days.map((day, dayIndex) => {
              const dayEvents = getEventsForDateAndHour(day, hour);
              const isToday = isSameDay(day, new Date());
              return (
                <div
                  key={dayIndex}
                  className={`border-r dark:border-gray-700 p-1 relative min-h-[60px] cursor-pointer
                    ${isToday ? "bg-calendoodle-blue/5" : ""}`
                  }
                  onClick={() => {
                    const dateWithTime = new Date(day);
                    dateWithTime.setHours(hour);
                    handleTimeSlotClick(dateWithTime);
                  }}
                >
                  {dayEvents.map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className="text-xs p-1 mb-1 rounded cursor-pointer truncate transition-transform hover:translate-y-[-2px]"
                      style={{
                        backgroundColor: event.color + "33", // Adding transparency
                        borderLeft: `3px solid ${event.color}`,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="text-gray-600 dark:text-gray-400 truncate">{event.time}</div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {selectedDate && (
        <EventModal
          isOpen={isModalOpen}
          onClose={closeModal}
          date={selectedDate}
          events={events.filter(
            (event) =>
              isSameDay(parseISO(event.date), selectedDate) &&
              parseInt(event.time.split(":")[0], 10) === selectedDate.getHours()
          )}
          onEventClick={onEventClick}
        />
      )}
    </div>
  );
};

export default WeekView;
