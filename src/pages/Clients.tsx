
import { useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Filter, CalendarClock, Calendar, MoreVertical, UserCheck, UserX, Info, Edit, Trash2, Eye } from "lucide-react";
import { Client } from "@/types/clients";
import ClientModal from "@/components/clients/ClientModal";

// Sample clients data
const initialClients: Client[] = [
  {
    id: "1",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    phone: "(555) 123-4567",
    status: "active",
    imageUrl: "https://i.pravatar.cc/150?img=1",
    totalAppointments: 12,
    lastAppointment: "2025-03-30",
    notes: "Regular client for haircuts and styling.",
    tags: ["vip", "regular"]
  },
  {
    id: "2",
    name: "Wade Warren",
    email: "wade.warren@example.com",
    phone: "(555) 234-5678",
    status: "inactive",
    imageUrl: "https://i.pravatar.cc/150?img=2",
    totalAppointments: 5,
    lastAppointment: "2025-02-15",
    tags: ["new"]
  },
  {
    id: "3",
    name: "Esther Howard",
    email: "esther.howard@example.com",
    phone: "(555) 345-6789",
    status: "active",
    imageUrl: "https://i.pravatar.cc/150?img=3",
    totalAppointments: 8,
    lastAppointment: "2025-04-02",
    notes: "Prefers afternoon appointments.",
    tags: ["regular"]
  },
  {
    id: "4",
    name: "Cameron Williamson",
    email: "cameron.williamson@example.com",
    phone: "(555) 456-7890",
    status: "pending",
    imageUrl: "https://i.pravatar.cc/150?img=4",
    totalAppointments: 1,
    lastAppointment: null,
    tags: ["new"]
  },
  {
    id: "5",
    name: "Brooklyn Simmons",
    email: "brooklyn.simmons@example.com",
    phone: "(555) 567-8901",
    status: "active",
    imageUrl: "https://i.pravatar.cc/150?img=5",
    totalAppointments: 15,
    lastAppointment: "2025-04-05",
    notes: "Prefers early morning appointments. Allergic to certain products.",
    tags: ["vip", "regular"]
  },
];

const Clients = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isAddingNewClient, setIsAddingNewClient] = useState(false);

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.email.toLowerCase().includes(search.toLowerCase()) ||
      client.phone.includes(search);
    
    const matchesStatus = statusFilter ? client.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });

  const handleDeleteClient = (id: string) => {
    setClients(clients.filter((client) => client.id !== id));
    toast({
      title: "Client deleted",
      description: "The client has been successfully deleted.",
    });
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setIsAddingNewClient(false);
    setIsClientModalOpen(true);
  };

  const handleAddNewClient = () => {
    setSelectedClient(null);
    setIsAddingNewClient(true);
    setIsClientModalOpen(true);
  };

  const handleSaveClient = (updatedClient: Client) => {
    if (isAddingNewClient) {
      setClients([...clients, updatedClient]);
      toast({
        title: "Client added",
        description: "The new client has been successfully added.",
      });
    } else {
      setClients(
        clients.map((client) =>
          client.id === updatedClient.id ? updatedClient : client
        )
      );
      toast({
        title: "Client updated",
        description: "The client information has been successfully updated.",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-gray-400";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-300";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case "inactive":
        return <Badge variant="outline" className="text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600">Inactive</Badge>;
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-600">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Clients</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your client information and appointments.
          </p>
        </div>
        <Button 
          className="calendoodle-btn-primary"
          onClick={handleAddNewClient}
        >
          <Plus className="h-4 w-4 mr-1" /> Add Client
        </Button>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search clients..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Toggle
            pressed={statusFilter === "active"}
            onPressedChange={() =>
              setStatusFilter(statusFilter === "active" ? null : "active")
            }
            className="data-[state=on]:bg-green-500 data-[state=on]:text-white transition-all"
            aria-label="Filter by active status"
          >
            <UserCheck className="h-4 w-4 mr-1" /> Active
          </Toggle>
          <Toggle
            pressed={statusFilter === "inactive"}
            onPressedChange={() =>
              setStatusFilter(statusFilter === "inactive" ? null : "inactive")
            }
            className="data-[state=on]:bg-gray-500 data-[state=on]:text-white transition-all"
            aria-label="Filter by inactive status"
          >
            <UserX className="h-4 w-4 mr-1" /> Inactive
          </Toggle>
          <Button variant="outline" size="icon" className="transition-all" aria-label="More filters">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Clients list */}
      <div className="space-y-4">
        {filteredClients.length === 0 ? (
          <Card className="border-2 border-dashed border-gray-200 dark:border-gray-800 bg-transparent">
            <CardContent className="py-8 flex flex-col items-center justify-center">
              <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-3 mb-3">
                <Info className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200 mb-1">No clients found</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-sm mb-4">
                {search || statusFilter
                  ? "No clients match your search criteria. Try adjusting your filters."
                  : "You haven't added any clients yet. Add your first client to get started."}
              </p>
              {!search && !statusFilter && (
                <Button
                  variant="outline"
                  onClick={handleAddNewClient}
                  className="border-calendoodle-blue/50 text-calendoodle-blue hover:bg-calendoodle-blue/10 dark:border-calendoodle-blue/30 dark:hover:bg-calendoodle-blue/20 transition-all"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Your First Client
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Client</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider hidden sm:table-cell">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider hidden lg:table-cell">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider hidden md:table-cell">Appointments</th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredClients.map((client) => (
                  <tr 
                    key={client.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 border border-gray-200 dark:border-gray-700">
                          <AvatarImage src={client.imageUrl} alt={client.name} />
                          <AvatarFallback className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                            {client.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {client.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 sm:hidden">
                            {getStatusBadge(client.status)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="flex items-center">
                        <div className={`h-2.5 w-2.5 rounded-full ${getStatusColor(client.status)} mr-2`}></div>
                        <span className="capitalize text-sm text-gray-600 dark:text-gray-300">
                          {client.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap hidden lg:table-cell">
                      <div className="text-sm text-gray-900 dark:text-gray-300">{client.email}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{client.phone}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                      <div className="text-sm text-gray-900 dark:text-gray-300">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-calendoodle-blue" />
                          <span>{client.totalAppointments} appointments</span>
                        </div>
                      </div>
                      {client.lastAppointment && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <CalendarClock className="h-3.5 w-3.5 mr-1" />
                          <span>Last: {new Date(client.lastAppointment).toLocaleDateString()}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                              <Info className="h-4 w-4 text-gray-500" />
                              <span className="sr-only">View client details</span>
                            </Button>
                          </HoverCardTrigger>
                          <HoverCardContent align="end" className="w-80 p-4 dark:bg-gray-900 dark:border-gray-700">
                            <div className="flex justify-between space-x-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={client.imageUrl} />
                                <AvatarFallback className="bg-gray-200 dark:bg-gray-800">
                                  {client.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className="space-y-1 flex-1">
                                <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">{client.name}</h4>
                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                  {getStatusBadge(client.status)}
                                </div>
                                {client.notes && (
                                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                    {client.notes}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-calendoodle-blue"
                                onClick={() => handleEditClient(client)}
                              >
                                View Full Profile
                              </Button>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full text-amber-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                          onClick={() => handleEditClient(client)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit client</span>
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                          onClick={() => handleDeleteClient(client.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete client</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Client modal for editing/adding */}
      <ClientModal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        client={selectedClient}
        onSave={handleSaveClient}
        isNew={isAddingNewClient}
      />
    </div>
  );
};

export default Clients;
