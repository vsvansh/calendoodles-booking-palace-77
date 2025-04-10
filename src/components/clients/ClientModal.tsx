
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Client } from "@/types/clients";
import { X, Upload } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
  onSave: (client: Client) => void;
  isNew?: boolean;
}

const ClientModal = ({ isOpen, onClose, client, onSave, isNew = false }: ClientModalProps) => {
  const [clientData, setClientData] = useState<Client>({
    id: "",
    name: "",
    email: "",
    phone: "",
    status: "active",
    imageUrl: "",
    totalAppointments: 0,
    lastAppointment: null,
    tags: [],
  });
  const [newTag, setNewTag] = useState("");

  // Initialize form data when client changes
  useEffect(() => {
    if (client) {
      setClientData(client);
    } else {
      // Initialize new client
      setClientData({
        id: String(Date.now()),
        name: "",
        email: "",
        phone: "",
        status: "active",
        imageUrl: "https://i.pravatar.cc/150?img=" + Math.floor(Math.random() * 70),
        totalAppointments: 0,
        lastAppointment: null,
        tags: [],
      });
    }
  }, [client, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClientData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: string) => {
    setClientData((prev) => ({ ...prev, status: value as "active" | "inactive" | "pending" }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !clientData.tags.includes(newTag.trim())) {
      setClientData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setClientData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = () => {
    onSave(clientData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] my-4">
        <ScrollArea className="max-h-[80vh] pr-4">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {isNew ? "Add New Client" : "Edit Client"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col gap-6 py-6">
            {/* Profile Image */}
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24 border-2 border-gray-200 dark:border-gray-700 shadow-md">
                <AvatarImage src={clientData.imageUrl} />
                <AvatarFallback className="bg-gray-200 dark:bg-gray-800 text-xl">
                  {clientData.name
                    ? clientData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : "?"}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                <span>Change Photo</span>
              </Button>
            </div>

            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-md font-medium border-b pb-2">Basic Information</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={clientData.name}
                    onChange={handleChange}
                    placeholder="Enter client name"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={clientData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={clientData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="space-y-4">
              <h3 className="text-md font-medium border-b pb-2">Status</h3>
              <div className="space-y-2">
                <Label htmlFor="status">Client Status</Label>
                <Select
                  value={clientData.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-md font-medium border-b pb-2">Additional Information</h3>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={clientData.notes || ""}
                  onChange={handleChange}
                  placeholder="Enter any notes about this client"
                  rows={3}
                />
              </div>
            </div>

            {/* Tags Section */}
            <div className="space-y-4">
              <h3 className="text-md font-medium border-b pb-2">Tags</h3>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2 mb-3">
                  {clientData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="flex items-center gap-1 px-2 py-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {clientData.tags.length === 0 && (
                    <span className="text-sm text-gray-500">No tags added yet.</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddTag}>
                    Add
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Press Enter or click Add to create a tag.
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
        
        <DialogFooter className="pt-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {isNew ? "Create Client" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClientModal;
