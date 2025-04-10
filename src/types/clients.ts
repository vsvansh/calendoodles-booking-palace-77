
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  imageUrl: string;
  totalAppointments: number;
  lastAppointment: string | null;
  notes?: string;
  tags: string[];
}
