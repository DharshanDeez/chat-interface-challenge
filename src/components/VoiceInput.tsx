import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface VoiceInputProps {
  onSend: (message: string) => void;
}

export const VoiceInput = ({ onSend }: VoiceInputProps) => {
  const { toast } = useToast();
  const [tempTranscript, setTempTranscript] = useState("");
  const { isListening, startListening, stopListening, isSupported } =
    useSpeechRecognition({
      onResult: (transcript) => {
        setTempTranscript(transcript);
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: `Speech recognition error: ${error}`,
          variant: "destructive",
        });
      },
    });

  const handleStopListening = () => {
    stopListening();
    if (tempTranscript.trim()) {
      onSend(tempTranscript);
      setTempTranscript("");
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "rounded-full hover:bg-blue-100 transition-all",
        isListening && "bg-red-500 hover:bg-red-500 text-white animate-pulse"
      )}
      onClick={isListening ? handleStopListening : startListening}
    >
      <Mic className="h-6 w-6" />
    </Button>
  );
};
