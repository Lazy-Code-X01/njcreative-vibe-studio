import React, { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm NJ Bestie, your virtual assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const predefinedResponses: Record<string, string> = {
    hello: "Hello! Welcome to NJ Creative. How can I help you today?",
    hi: "Hi there! I'm here to help with any questions about our services.",
    services:
      "We offer web design, branding, digital marketing, and creative consulting. Which service interests you?",
    pricing:
      "Our pricing varies based on project scope. We'd love to discuss your specific needs - please use our contact form or schedule a consultation!",
    portfolio:
      "You can view our latest work in the Portfolio section above. We've helped brands across various industries.",
    contact:
      "You can reach us through our contact form, email us directly, or call us. We typically respond within 24 hours.",
    time: "Project timelines vary depending on complexity. Most projects take 2-8 weeks. We'll provide a detailed timeline during our consultation.",
    default:
      "Thanks for your question! For detailed information, please feel free to contact us directly through our contact form or schedule a consultation call.",
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simple keyword matching for bot response
    const lowerInput = inputValue.toLowerCase();
    let botResponse = predefinedResponses.default;

    for (const [keyword, response] of Object.entries(predefinedResponses)) {
      if (lowerInput.includes(keyword)) {
        botResponse = response;
        break;
      }
    }

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);

    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full shadow-lg bg-primary hover:bg-primary-glow transition-all duration-300 hover:scale-110"
          style={{
            background: "var(--gradient-luxury)",
            boxShadow: "var(--shadow-glow)",
          }}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-background" />
          ) : (
            <MessageCircle className="w-6 h-6 text-background" />
          )}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 z-40 glass-card animate-scale-in">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div>
              <h3 className="font-semibold text-foreground">NJ Bestie</h3>
              <p className="text-xs text-muted-foreground">Online now</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 h-64 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isBot ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isBot
                      ? "bg-card text-card-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-primary hover:bg-primary-glow text-primary-foreground"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChat;
