import { useState, useEffect } from "react";

interface UseSpeechRecognitionProps {
  onResult: (transcript: string) => void;
  onError: (error: string) => void;
}

export const useSpeechRecognition = ({ onResult, onError }: UseSpeechRecognitionProps) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      setIsSupported(true);
      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = true;
      recognition.interimResults = true;
      setRecognition(recognition);
    }
  }, []);

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join("");
      onResult(transcript);
    };

    recognition.onerror = () => {
      onError("Speech recognition error occurred");
      setIsListening(false);
    };
  }, [recognition, onResult, onError]);

  const startListening = () => {
    if (!recognition) return;
    try {
      recognition.start();
      setIsListening(true);
    } catch (error) {
      console.error("Error starting speech recognition:", error);
    }
  };

  const stopListening = () => {
    if (!recognition) return;
    try {
      recognition.stop();
      setIsListening(false);
    } catch (error) {
      console.error("Error stopping speech recognition:", error);
    }
  };

  return {
    isListening,
    startListening,
    stopListening,
    isSupported,
  };
};