
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Mail, Phone, Calendar, Clock, Star, MoreHorizontal, Trash2, Edit, UserPlus, FileText } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  totalAppointments: number;
  lastAppointment: string | null;
  avatar: string;
  notes: string;
  type: "individual" | "corporate";
  rating: 1 | 2 | 3 | 4 | 5;
}

const generateClients = (): Client[] => {
  return [
    {
      id: "1",
      name: "Jane Cooper",
      email: "jane.cooper@example.com",
      phone: "(555) 123-4567",
      status: "active",
      totalAppointments: 8,
      lastAppointment: "2025-03-28",
      avatar: "/placeholder.svg",
      notes: "Prefers afternoon appointments. Has flexible schedule.",
      type: "individual",
      rating: 5
    },
    {
      id: "2",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "(555) 234-5678",
      status: "active",
      totalAppointments: 12,
      lastAppointment: "2025-04-05",
      avatar: "/placeholder.svg",
      notes: "Always punctual. Prefers morning appointments.",
      type: "individual",
      rating: 4
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert.johnson@acme.com",
      phone: "(555) 345-6789",
      status: "inactive",
      totalAppointments: 3,
      lastAppointment: "2025-01-15",
      avatar: "/placeholder.svg",
      notes: "Represents Acme Corp. Needs detailed invoices for corporate accounting.",
      type: "corporate",
      rating: 3
    },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      phone: "(555) 456-7890",
      status: "active",
      totalAppointments: 5,
      lastAppointment: "2025-03-30",
      avatar: "/placeholder.svg",
      notes: "Prefers video calls over in-person meetings when possible.",
      type: "individual",
      rating: 5
    },
    {
      id: "5",
      name: "Tech Solutions Inc.",
      email: "appointments@techsolutions.com",
      phone: "(555) 567-8901",
      status: "active",
      totalAppointments: 17,
      lastAppointment: "2025-04-06",
      avatar: "/placeholder.svg",
      notes: "Corporate client with multiple staff members. Primary contact is Michael Brown.",
      type: "corporate",
      rating: 4
    },
    {
      id: "6",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "(555) 678-9012",
      status: "inactive",
      totalAppointments: 2,
      lastAppointment: "2024-12-10",
      avatar: "/placeholder.svg",
      notes: "New client, recently joined.",
      type: "individual",
      rating: 5
    }
  ];
};

const Clients = () => {
  const [clients, setClients] = useState<Client[]>(generateClients());
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const { toast } = useToast();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddClient = (client: Omit<Client, "id" | "totalAppointments" | "lastAppointment" | "rating">) => {
    const newClient: Client = {
      ...client,
      id: (clients.length + 1).toString(),
      totalAppointments: 0,
      lastAppointment: null,
      rating: 5
    };
    
    setClients([...clients, newClient]);
    setIsCreateModalOpen(false);
    
    toast({
      title: "Client Added",
      description: `${newClient.name} has been added to your clients.`
    });
  };
  
  const handleDeleteClient = (id: string) => {
    setClients(clients.filter(client => client.id !== id));
    
    toast({
      title: "Client Deleted",
      description: "The client has been removed from your list."
    });
  };
  
  const handleViewClient = (client: Client) => {
    setCurrentClient(client);
    setIsViewModalOpen(true);
  };

  const filteredClients = clients
    .filter(client => {
      // Filter based on search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          client.name.toLowerCase().includes(query) ||
          client.email.toLowerCase().includes(query) ||
          client.phone.includes(query)
        );
      }
      return true;
    })
    .filter(client => {
      // Filter based on tab
      if (activeTab === "all") return true;
      if (activeTab === "active") return client.status === "active";
      if (activeTab === "inactive") return client.status === "inactive";
      if (activeTab === "individual") return client.type === "individual";
      if (activeTab === "corporate") return client.type === "corporate";
      return true;
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Clients</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage your client relationships and information
          </p>
        </div>
        <Button 
          onClick={() => setIsCreateModalOpen(true)}
          className="calendoodle-btn calendoodle-btn-primary"
        >
          <UserPlus className="h-4 w-4 mr-2" /> Add New Client
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          <Input
            placeholder="Search clients..."
            className="pl-10 calendoodle-input w-full"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="corporate">Corporate</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredClients.length > 0 ? (
          filteredClients.map((client) => (
            <Card key={client.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage src={client.avatar} />
                      <AvatarFallback className="bg-gray-200 text-gray-600">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {client.name}
                        {client.status === "inactive" && (
                          <Badge variant="outline" className="text-gray-500">
                            Inactive
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>
                        {client.type === "corporate" ? "Corporate Client" : "Individual Client"}
                      </CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewClient(client)}>
                        <FileText className="h-4 w-4 mr-2" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {/* Would open edit modal */}}>
                        <Edit className="h-4 w-4 mr-2" /> Edit Client
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600 focus:text-red-600" 
                        onClick={() => handleDeleteClient(client.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    <a href={`mailto:${client.email}`} className="text-calendoodle-blue hover:underline">
                      {client.email}
                    </a>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    <a href={`tel:${client.phone}`} className="hover:underline">
                      {client.phone}
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-2 mt-2 border-t">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{client.totalAppointments} appointments</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{client.lastAppointment ? new Date(client.lastAppointment).toLocaleDateString() : 'No appointments'}</span>
                    </div>
                  </div>
                  <div className="flex items-center pt-2 mt-2 border-t">
                    <div className="flex">
                      {Array(5).fill(0).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < client.rating 
                              ? "text-yellow-400 fill-yellow-400" 
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No clients found matching your search criteria.</p>
          </div>
        )}
      </div>

      <AddClientModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAdd={handleAddClient}
      />

      {currentClient && (
        <ClientDetailsModal
          client={currentClient}
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
        />
      )}
    </div>
  );
};

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (client: Omit<Client, "id" | "totalAppointments" | "lastAppointment" | "rating">) => void;
}

const AddClientModal: React.FC<AddClientModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "active" as const,
    avatar: "/placeholder.svg",
    notes: "",
    type: "individual" as const
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      name: "",
      email: "",
      phone: "",
      status: "active" as const,
      avatar: "/placeholder.svg",
      notes: "",
      type: "individual" as const
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>
            Enter the client details below. You can add more information later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name / Organization</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name or organization"
              className="calendoodle-input"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className="calendoodle-input"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="calendoodle-input"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Client Type</Label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
              >
                <option value="individual">Individual</option>
                <option value="corporate">Corporate</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Additional notes about the client"
              className="calendoodle-input"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="calendoodle-btn calendoodle-btn-primary">
              Add Client
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

interface ClientDetailsModalProps {
  client: Client;
  isOpen: boolean;
  onClose: () => void;
}

const ClientDetailsModal: React.FC<ClientDetailsModalProps> = ({ client, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={client.avatar} />
              <AvatarFallback className="bg-gray-200 text-gray-600">
                {client.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span>{client.name}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
              <p className="text-sm mt-1">
                <a href={`mailto:${client.email}`} className="text-calendoodle-blue hover:underline">
                  {client.email}
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</h3>
              <p className="text-sm mt-1">
                <a href={`tel:${client.phone}`} className="hover:underline">
                  {client.phone}
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</h3>
              <p className="text-sm mt-1 capitalize">{client.type}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</h3>
              <p className="text-sm mt-1">
                <Badge
                  variant={client.status === "active" ? "default" : "outline"}
                  className={client.status === "active" ? "bg-green-500" : "text-gray-500"}
                >
                  {client.status}
                </Badge>
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Appointment History</h3>
            <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-calendoodle-blue" />
                  <span className="text-sm">Total Appointments: {client.totalAppointments}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-calendoodle-purple" />
                  <span className="text-sm">
                    Last Appointment: {client.lastAppointment ? new Date(client.lastAppointment).toLocaleDateString() : 'None'}
                  </span>
                </div>
              </div>
              
              <div className="mt-2 flex">
                <div className="flex">
                  <span className="text-sm mr-2">Rating:</span>
                  {Array(5).fill(0).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < client.rating 
                          ? "text-yellow-400 fill-yellow-400" 
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Notes</h3>
            <p className="text-sm mt-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              {client.notes || "No notes available."}
            </p>
          </div>
          
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {/* Would handle scheduling appointment */}}
              className="text-calendoodle-blue border-calendoodle-blue hover:bg-calendoodle-blue/10"
            >
              <Calendar className="h-4 w-4 mr-1" /> Schedule Appointment
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Clients;
