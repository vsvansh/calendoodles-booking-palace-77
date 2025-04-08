
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Pencil, Plus, Trash2, DollarSign, Users, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  isActive: boolean;
  color: string;
  capacity: number;
}

const initialServices: Service[] = [
  {
    id: "1",
    name: "Regular Consultation",
    description: "Standard consultation session for general inquiries and checkups",
    duration: 30,
    price: 50,
    isActive: true,
    color: "#3498db",
    capacity: 1,
  },
  {
    id: "2",
    name: "Premium Consultation",
    description: "Extended consultation with detailed analysis and personalized recommendations",
    duration: 60,
    price: 100,
    isActive: true,
    color: "#9b59b6",
    capacity: 1,
  },
  {
    id: "3",
    name: "Group Session",
    description: "Group therapy or workshop session for up to 8 participants",
    duration: 90,
    price: 200,
    isActive: true,
    color: "#2ecc71",
    capacity: 8,
  },
  {
    id: "4",
    name: "Quick Follow-up",
    description: "Brief follow-up session for existing clients",
    duration: 15,
    price: 25,
    isActive: false,
    color: "#f39c12",
    capacity: 1,
  },
];

const Services = () => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  const handleServiceToggle = (id: string, isActive: boolean) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, isActive } : service
      )
    );
    toast({
      title: "Service updated",
      description: `Service has been ${isActive ? "activated" : "deactivated"}.`,
    });
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter((service) => service.id !== id));
    toast({
      title: "Service deleted",
      description: "The service has been successfully deleted.",
    });
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
  };

  const handleSaveService = (updatedService: Service) => {
    if (updatedService.id) {
      // Update existing service
      setServices(
        services.map((service) =>
          service.id === updatedService.id ? updatedService : service
        )
      );
      toast({
        title: "Service updated",
        description: "The service has been successfully updated.",
      });
    } else {
      // Add new service
      const newService = {
        ...updatedService,
        id: Date.now().toString(),
        isActive: true,
      };
      setServices([...services, newService]);
      toast({
        title: "Service created",
        description: "New service has been successfully added.",
      });
    }
    setEditingService(null);
  };

  const filteredServices = activeTab === "all"
    ? services
    : activeTab === "active"
    ? services.filter((service) => service.isActive)
    : services.filter((service) => !service.isActive);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Services</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage your service offerings and appointment types
          </p>
        </div>
        <Button 
          onClick={() => 
            setEditingService({
              id: "",
              name: "",
              description: "",
              duration: 30,
              price: 50,
              isActive: true,
              color: "#3498db",
              capacity: 1,
            })
          }
          className="calendoodle-btn calendoodle-btn-primary"
        >
          <Plus className="h-4 w-4 mr-2" /> Add New Service
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Services</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <ServicesList 
            services={filteredServices} 
            onToggle={handleServiceToggle}
            onDelete={handleDeleteService}
            onEdit={handleEditService}
          />
        </TabsContent>
        <TabsContent value="active" className="mt-6">
          <ServicesList 
            services={filteredServices} 
            onToggle={handleServiceToggle}
            onDelete={handleDeleteService}
            onEdit={handleEditService}
          />
        </TabsContent>
        <TabsContent value="inactive" className="mt-6">
          <ServicesList 
            services={filteredServices} 
            onToggle={handleServiceToggle}
            onDelete={handleDeleteService}
            onEdit={handleEditService}
          />
        </TabsContent>
      </Tabs>

      {editingService && (
        <ServiceEditModal
          service={editingService}
          onSave={handleSaveService}
          onCancel={() => setEditingService(null)}
        />
      )}
    </div>
  );
};

interface ServicesListProps {
  services: Service[];
  onToggle: (id: string, isActive: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (service: Service) => void;
}

const ServicesList: React.FC<ServicesListProps> = ({ services, onToggle, onDelete, onEdit }) => {
  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No services found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <Card key={service.id} className="overflow-hidden border-t-4" style={{ borderTopColor: service.color }}>
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <span>{service.name}</span>
                  {!service.isActive && (
                    <Badge variant="outline" className="text-gray-500 ml-2">
                      Inactive
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="mt-2">{service.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{service.duration} minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className="text-sm">${service.price}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Capacity: {service.capacity}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Bookable</span>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <div className="flex items-center space-x-2">
                <Switch
                  id={`active-${service.id}`}
                  checked={service.isActive}
                  onCheckedChange={(checked) => onToggle(service.id, checked)}
                />
                <Label htmlFor={`active-${service.id}`}>
                  {service.isActive ? "Active" : "Inactive"}
                </Label>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(service)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  onClick={() => onDelete(service.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

interface ServiceEditModalProps {
  service: Service;
  onSave: (service: Service) => void;
  onCancel: () => void;
}

const ServiceEditModal: React.FC<ServiceEditModalProps> = ({ service, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Service>(service);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "duration" || name === "price" || name === "capacity" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const colorOptions = [
    "#3498db", // Blue
    "#9b59b6", // Purple
    "#2ecc71", // Green
    "#e74c3c", // Red
    "#f39c12", // Orange
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-scale-up">
        <CardHeader>
          <CardTitle>{service.id ? "Edit Service" : "Create New Service"}</CardTitle>
          <CardDescription>
            {service.id
              ? "Update your service details and settings"
              : "Fill in the details for your new service offering"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Service Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Regular Consultation"
                required
                className="calendoodle-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of the service"
                className="calendoodle-input"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleChange}
                  min="5"
                  required
                  className="calendoodle-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  className="calendoodle-input"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={handleChange}
                  min="1"
                  required
                  className="calendoodle-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Color</Label>
                <div className="flex gap-2 mt-2">
                  {colorOptions.map((color) => (
                    <div
                      key={color}
                      onClick={() => setFormData({ ...formData, color })}
                      className={`w-8 h-8 rounded-full cursor-pointer transition-all ${
                        formData.color === color
                          ? "ring-2 ring-offset-2 ring-black dark:ring-white transform scale-110"
                          : ""
                      }`}
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 pt-4">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked })
                }
              />
              <Label htmlFor="isActive">Active</Label>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" className="calendoodle-btn calendoodle-btn-primary">
                {service.id ? "Update Service" : "Create Service"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Services;
