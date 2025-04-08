
import { useState, useRef, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Send, Sparkles, ChevronDown, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Sample responses for the chatbot
const sampleResponses = [
  "I've scheduled that meeting for you.",
  "Your calendar has been updated with the new appointment.",
  "I've added that task to your to-do list.",
  "Let me help you manage your schedule more efficiently.",
  "Is there anything specific you'd like me to help with regarding your calendar?",
  "I've sent the invitation to all participants.",
  "Your appointment with Dr. Smith has been confirmed for tomorrow at 2 PM.",
  "I've found 3 available slots for your team meeting next week.",
  "Would you like me to reschedule that conflicting appointment?",
  "I've updated your service offerings as requested.",
];

export function ChatbotDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi, I'm your Calendoodle assistant. How can I help you manage your appointments today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    
    // Simulate bot thinking
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      
      // Show toast notification for the new message
      if (!isOpen) {
        toast({
          title: "New message from Calendoodle Assistant",
          description: randomResponse,
        });
      }
    }, 1500);
  };

  return (
    <>
      {!isOpen && (
        <Button 
          onClick={() => setIsOpen(true)} 
          className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg z-50 bg-calendoodle-purple hover:bg-calendoodle-purple/90 text-white"
          size="icon"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
      
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-[90vw] sm:max-w-[400px] h-[600px] p-0 flex flex-col">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="flex items-center gap-2 text-calendoodle-purple">
              <Bot className="h-5 w-5" />
              <span>Calendoodle Assistant</span>
            </SheetTitle>
          </SheetHeader>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-calendoodle-purple text-white"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    {message.sender === "bot" && (
                      <div className="flex items-center gap-2 mb-1">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback className="bg-calendoodle-blue text-white text-xs">
                            <Sparkles className="h-3 w-3" />
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium text-calendoodle-purple dark:text-calendoodle-blue">
                          Calendoodle Assistant
                        </span>
                      </div>
                    )}
                    <p>{message.content}</p>
                    <div
                      className={`text-xs mt-1 ${
                        message.sender === "user"
                          ? "text-white/70"
                          : "text-gray-500"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 dark:bg-gray-800">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t mt-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 calendoodle-input"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputValue.trim()}
                className="bg-calendoodle-purple hover:bg-calendoodle-purple/90 text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default ChatbotDrawer;
