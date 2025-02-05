import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: string;
  isAI?: boolean;
  className?: string;
  timestamp?: string;
}

export const MessageBubble = ({
  message,
  isAI = false,
  className,
  timestamp,
}: MessageBubbleProps) => {
  return (
    <div
      className={cn(
        "flex flex-col",
        isAI ? "items-start" : "items-end",
        className
      )}
    >
      <div
        className={cn("message-bubble", isAI ? "ai-message" : "user-message")}
      >
        {message}
      </div>
      {timestamp && (
        <span className="text-xs text-muted-foreground mt-1 mx-2">
          {timestamp}
        </span>
      )}
    </div>
  );
};
