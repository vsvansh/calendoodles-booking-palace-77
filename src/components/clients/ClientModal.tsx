
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Client } from "@/types/clients";

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
  onSave: (client: Client) => void;
  isNew?: boolean;
}

const ClientModal = ({
  isOpen,
  onClose,
  client,
  onSave,
  isNew = false,
}: ClientModalProps) => {
  const [formData, setFormData] = useState<Client>(
    client || {
      id: String(Date.now()),
      name: "",
      email: "",
      phone: "",
      status: "active",
      imageUrl: "/placeholder.svg",
      totalAppointments: 0,
      lastAppointment: null,
      notes: "",
      tags: [],
    }
  );
  
  const handleChange = (field: keyof Client, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-6">
        <DialogHeader>
          <DialogTitle>{isNew ? "Add New Client" : "Edit Client"}</DialogTitle>
          <DialogDescription>
            {isNew
              ? "Enter the details for the new client."
              : "Update the client's information."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-5 py-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={formData.imageUrl || "/placeholder.svg"}
                alt={formData.name || "Client"}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
              />
              <Button
                size="sm"
                variant="outline"
                className="absolute bottom-0 right-0 h-6 w-6 p-0 rounded-full border-2 dark:bg-gray-800 dark:border-gray-700"
                onClick={() => {
                  // In a real app, this would open an image upload dialog
                  const imageUrls = [
                    "/placeholder.svg",
                    "https://i.pravatar.cc/150?img=1",
                    "https://i.pravatar.cc/150?img=2",
                    "https://i.pravatar.cc/150?img=3",
                    "https://i.pravatar.cc/150?img=4",
                    "https://i.pravatar.cc/150?img=5",
                  ];
                  const currentIndex = imageUrls.indexOf(formData.imageUrl || "/placeholder.svg");
                  const nextIndex = (currentIndex + 1) % imageUrls.length;
                  handleChange("imageUrl", imageUrls[nextIndex]);
                }}
              >
                +
              </Button>
            </div>
            <div className="flex-1">
              <Label className="text-muted-foreground text-sm">Basic Information</Label>
              <Input 
                value={formData.name} 
                placeholder="Full name"
                onChange={(e) => handleChange("name", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="client@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes || ""}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Add any notes about this client..."
              rows={3}
            />
          </div>
        </div>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} className="calendoodle-btn-primary">
            {isNew ? "Add Client" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClientModal;
