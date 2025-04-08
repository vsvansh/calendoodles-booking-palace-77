
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths, addDays, subDays, isSameDay } from "date-fns";

interface CalendarHeaderProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  view: "month" | "week" | "day";
  setView: (view: "month" | "week" | "day") => void;
}

const CalendarHeader = ({
  currentDate,
  setCurrentDate,
  view,
  setView,
}: CalendarHeaderProps) => {
  const today = new Date();

  const goToPrevious = () => {
    if (view === "month") {
      setCurrentDate(subMonths(currentDate, 1));
    } else if (view === "week") {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 7);
      setCurrentDate(newDate);
    } else {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 1);
      setCurrentDate(newDate);
    }
  };

  const goToNext = () => {
    if (view === "month") {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (view === "week") {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 7);
      setCurrentDate(newDate);
    } else {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 1);
      setCurrentDate(newDate);
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getHeaderText = () => {
    if (view === "month") {
      return format(currentDate, "MMMM yyyy");
    } else if (view === "week") {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      const startMonth = format(startOfWeek, "MMM");
      const endMonth = format(endOfWeek, "MMM");
      const startDay = format(startOfWeek, "d");
      const endDay = format(endOfWeek, "d");
      const year = format(endOfWeek, "yyyy");
      
      if (startMonth === endMonth) {
        return `${startMonth} ${startDay} - ${endDay}, ${year}`;
      } 
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
    } else {
      return format(currentDate, "MMMM d, yyyy");
    }
  };

  const isTodaySelected = isSameDay(currentDate, today);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div className="flex items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 group">
          {getHeaderText()}
          <span className="block h-1 bg-calendoodle-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-1"></span>
        </h2>
      </div>
      <div className="flex items-center space-x-2 bg-white dark:bg-gray-800/50 p-2 rounded-xl shadow-sm">
        <Button
          variant="outline"
          size="sm"
          onClick={goToToday}
          disabled={isTodaySelected}
          className={`border-2 transition-all duration-300 ${
            isTodaySelected 
              ? "bg-calendoodle-blue text-white border-calendoodle-blue" 
              : "hover:bg-calendoodle-blue/10 hover:text-calendoodle-blue hover:border-calendoodle-blue/30"
          }`}
        >
          Today
        </Button>
        <div className="flex items-center rounded-md border dark:border-gray-700">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="rounded-r-none"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="rounded-l-none"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Select value={view} onValueChange={(v: "month" | "week" | "day") => setView(v)}>
          <SelectTrigger className="w-[110px] bg-white dark:bg-gray-800">
            <SelectValue placeholder="View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="day">Day</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CalendarHeader;
