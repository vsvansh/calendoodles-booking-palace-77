
export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number;
  status: "confirmed" | "pending" | "cancelled";
  color: string;
  location?: string;
  attendees?: number;
  notes?: string;
}
