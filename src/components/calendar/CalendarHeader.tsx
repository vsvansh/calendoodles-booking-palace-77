
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths } from "date-fns";

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

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div className="flex items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {getHeaderText()}
        </h2>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={goToToday}
          className="border-2 hover:bg-calendoodle-blue/10 hover:text-calendoodle-blue hover:border-calendoodle-blue/30"
        >
          Today
        </Button>
        <div className="flex items-center rounded-md border">
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
          <SelectTrigger className="w-[110px]">
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
