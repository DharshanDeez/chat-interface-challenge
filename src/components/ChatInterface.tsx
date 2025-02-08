// src/components/ChatInterface.tsx

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageBubble } from "./MessageBubble";
import { VoiceInput } from "./VoiceInput";
import { QuickReplies } from "./QuickReplies";
import { ChatHeader } from "./ChatHeader";
import { cn } from "@/lib/utils";
import { sendMessage } from "@/services/mockApi"; // Import the mock API service

interface Message {
  id: string;
  text: string;
  isAI: boolean;
  timestamp?: string;
}

const QUICK_REPLIES = [
  "Tell me about hooks",
  "Performance tips",
  "State management",
];

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! How can I assist you today?",
      isAI: true,
      timestamp: "10:30 AM",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      isAI: false,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await sendMessage({ content: input, source: "text" });

      const aiMessage = {
        id: response.id,
        text: response.content,
        isAI: true,
        timestamp: new Date(response.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: message,
      isAI: false,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await sendMessage({ content: message, source: "text" });

      const aiMessage = {
        id: response.id,
        text: response.content,
        isAI: true,
        timestamp: new Date(response.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-background">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message.text}
            isAI={message.isAI}
            timestamp={message.timestamp}
          />
        ))}
        {isLoading && (
          <div className="flex space-x-2 ml-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex flex-col gap-2 p-4 max-w-4xl mx-auto">
          <QuickReplies
            suggestions={QUICK_REPLIES}
            onSelect={(suggestion) => handleSendMessage(suggestion)}
          />

          <div className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1"
            />

            <VoiceInput
              onSend={async (message) => {
                const userMessage = {
                  id: Date.now().toString(),
                  text: message,
                  isAI: false,
                  timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                };

                setMessages((prev) => [...prev, userMessage]);
                setIsLoading(true);

                try {
                  const response = await sendMessage({
                    content: message,
                    source: "speech",
                  });

                  const aiMessage = {
                    id: response.id,
                    text: response.content,
                    isAI: true,
                    timestamp: new Date(response.timestamp).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    ),
                  };

                  setMessages((prev) => [...prev, aiMessage]);
                } catch (error) {
                  console.error("Failed to send voice message:", error);
                } finally {
                  setIsLoading(false);
                }
              }}
            />

            <Button
              onClick={handleSend}
              disabled={!input.trim()}
              className={cn(
                "rounded-full",
                !input.trim() && "opacity-50 cursor-not-allowed"
              )}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
